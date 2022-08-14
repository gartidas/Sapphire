import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { projectFirestore } from "../firebase/config";
import { errorToast } from "../services/toastService";
import { deleteImage } from "../utils/FirebaseStorageUtils";
import { IMemoryData } from "../utils/types";
import firebase from "firebase/app";
import { useAuth } from "./AuthProvider";

interface IMemoryContextValue {
  isLoading: boolean;
  changeLoadingState: (isLoading: boolean) => void;
  hasMore: boolean;
  loadNextBatch: () => void;
  memories: IMemoryData[];
  addMemory: (data: IMemoryData) => Promise<void>;
  editMemory: (data: IMemoryData) => Promise<void>;
  deleteMemory: (data: IMemoryData) => Promise<boolean>;
}

const MemoryContext = createContext<IMemoryContextValue>(null!);

export const useMemory = () => useContext(MemoryContext);

const MemoryProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [memories, setMemories] = useState<IMemoryData[]>([]);
  const { user } = useAuth();
  const lastVisible = memories && memories[memories.length - 1];

  const changeLoadingState = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const fetchMemories = useCallback(() => {
    setMemories([]);
    projectFirestore
      .collection("memories")
      .orderBy("date", "desc")
      .limit(20)
      .onSnapshot(mapDocs, (err) => console.log(err));

    // NOTE: Map docs would cause endless refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextBatch = useCallback(() => {
    if (lastVisible) {
      projectFirestore
        .collection("memories")
        .orderBy("date", "desc")
        .limit(20)
        .startAfter(lastVisible.date)
        .onSnapshot(mapDocs, (err) => console.log(err));
    }

    // NOTE: Map docs would cause endless refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisible]);

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
    async (data: IMemoryData) => {
      await uploadMemoryData(data, true);
      fetchMemories();
    },
    [fetchMemories]
  );

  const editMemory = useCallback(
    async (data: IMemoryData) => {
      await uploadMemoryData(data, false);
      fetchMemories();
    },
    [fetchMemories]
  );

  const uploadMemoryData = async (
    data: Omit<IMemoryData, "id">,
    revertOnError: boolean
  ) => {
    try {
      await projectFirestore
        .collection("/memories")
        .doc(data.date.toString())
        .set(data);
    } catch (err: any) {
      revertOnError && (await deleteImage(data.date.toString()));

      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
      setIsLoading(false);
      return;
    }
  };

  const deleteMemory = async (openedMemory: IMemoryData): Promise<boolean> => {
    try {
      const isDeleted = await deleteImage(openedMemory.id);
      if (!isDeleted) {
        setIsLoading(false);
        return false;
      }

      await projectFirestore
        .collection("/memories")
        .doc(openedMemory.id)
        .delete();

      setIsLoading(false);
      fetchMemories();
      return true;
    } catch (err: any) {
      setIsLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  useEffect(() => {
    if (user) fetchMemories();
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
