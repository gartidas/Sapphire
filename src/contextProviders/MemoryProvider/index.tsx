import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/app";
import { IMemoryData } from "../../model";
import { useUser } from "../UserProvider";
import { projectFirestore } from "../../firebase/config";
import { deleteImage } from "../../helpers/imageStorageHandlers";
import { errorToast } from "../../services/toastService";

interface IMemoryContextValue {
  isLoading: boolean;
  changeLoadingState: (isLoading: boolean) => void;
  hasMore: boolean;
  loadNextBatch: (familyId: string) => void;
  memories: IMemoryData[];
  addMemory: (data: IMemoryData, familyId: string) => Promise<void>;
  editMemory: (data: IMemoryData, familyId: string) => Promise<void>;
  deleteMemory: (
    openedMemory: IMemoryData,
    familyId: string
  ) => Promise<boolean>;
}

const MemoryContext = createContext<IMemoryContextValue>(null!);

export const useMemory = () => useContext(MemoryContext);

const MemoryProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [memories, setMemories] = useState<IMemoryData[]>([]);
  const { user } = useUser();
  const lastVisible = memories && memories[memories.length - 1];

  const changeLoadingState = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const fetchMemories = useCallback((familyId: string) => {
    setMemories([]);
    projectFirestore
      .collection("familyAssets")
      .doc("memories")
      .collection(familyId)
      .orderBy("date", "desc")
      .limit(20)
      .onSnapshot(mapDocs, (err) => console.log(err));

    // NOTE: Map docs would cause endless refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextBatch = useCallback(
    (familyId: string) => {
      if (lastVisible) {
        projectFirestore
          .collection("familyAssets")
          .doc("memories")
          .collection(familyId)
          .orderBy("date", "desc")
          .limit(20)
          .startAfter(lastVisible.date)
          .onSnapshot(mapDocs, (err) => console.log(err));
      }
    },
    // NOTE: Map docs would cause endless refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastVisible]
  );

  const mapDocs = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: any = [];
    snap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    setHasMore(documents.length === 20);
    setMemories((prev) => (lastVisible ? [...prev, ...documents] : documents));
  };

  const addMemory = useCallback(
    async (data: IMemoryData, familyId: string) => {
      await uploadMemoryData(data, familyId, true);
      fetchMemories(familyId);
    },
    [fetchMemories]
  );

  const editMemory = useCallback(
    async (data: IMemoryData, familyId: string) => {
      await uploadMemoryData(data, familyId, false);
      fetchMemories(familyId);
    },
    [fetchMemories]
  );

  const uploadMemoryData = async (
    data: Omit<IMemoryData, "id">,
    familyId: string,
    revertOnError: boolean
  ) => {
    try {
      await projectFirestore
        .collection("familyAssets")
        .doc("memories")
        .collection(familyId)
        .doc(data.date.toString())
        .set(data);
    } catch (err: any) {
      revertOnError &&
        (await deleteImage(`${familyId}/${data.date.toString()}`));

      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
      setIsLoading(false);
      return;
    }
  };

  const deleteMemory = async (
    openedMemory: IMemoryData,
    familyId: string
  ): Promise<boolean> => {
    try {
      const isDeleted = await deleteImage(`${familyId}/${openedMemory.id}`);
      if (!isDeleted) {
        setIsLoading(false);
        return false;
      }

      await projectFirestore
        .collection("familyAssets")
        .doc("memories")
        .collection(familyId)
        .doc(openedMemory.id)
        .delete();

      setIsLoading(false);
      fetchMemories(familyId);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  useEffect(() => {
    if (user) fetchMemories(user.familyId);
  }, [fetchMemories, user]);

  return (
    <MemoryContext.Provider
      value={{
        isLoading,
        changeLoadingState,
        addMemory,
        editMemory,
        deleteMemory,
        loadNextBatch,
        memories,
        hasMore,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;
