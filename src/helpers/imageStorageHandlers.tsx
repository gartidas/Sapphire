import { projectStorage } from "../firebase/config";
import { errorToast } from "../services/toastService";
import { IMemoryData, SetError } from "../model";

export const uploadImage = async (
  filePath: string,
  file: File,
  customPrefix?: string
): Promise<string | undefined> => {
  try {
    const uploadResponse = await projectStorage
      .ref(`${customPrefix ?? "images"}/${filePath}`)
      .put(file);

    if (uploadResponse.state !== "success") {
      errorToast("Oops... something went wrong!");
      return undefined;
    }
    const url = await projectStorage
      .ref(`${customPrefix ?? "images"}/${filePath}`)
      .getDownloadURL();
    return url;
  } catch (err: any) {
    errorToast(
      err.code === "storage/unauthorized"
        ? "Permission denied!"
        : `${err.name}:${err.code}`
    );
    return undefined;
  }
};

export const deleteImage = async (
  filePath: string,
  customPrefix?: string
): Promise<boolean> => {
  try {
    await projectStorage
      .ref(`${customPrefix ?? "images"}/${filePath}`)
      .delete();
    return true;
  } catch (err: any) {
    if (err.code !== "storage/object-not-found") {
      errorToast(
        err.code === "storage/unauthorized"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
    }
    return false;
  }
};

export const deleteFolder = async (
  folderPath: string,
  customPrefix?: string
): Promise<boolean> => {
  try {
    const fullPath = `${customPrefix ?? "images"}/${folderPath}`;
    const folderRef = projectStorage.ref(fullPath);
    const listResult = await folderRef.listAll();

    const deletePromises = listResult.items.map((item) => item.delete());
    await Promise.all(deletePromises);

    return true;
  } catch (err: any) {
    if (err.code !== "storage/object-not-found") {
      errorToast(
        err.code === "storage/unauthorized"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
    }
    return false;
  }
};

export const getImage = async (
  filePath: string,
  callback: (file: File, data: IMemoryData, setError: SetError) => void,
  data: IMemoryData,
  setError: SetError,
  customPrefix?: string
): Promise<void> => {
  try {
    await projectStorage
      .ref(`${customPrefix ?? "images"}/${filePath}`)
      .getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
          var blob = xhr.response;
          blob.lastModified = new Date();
          callback(new File([blob], filePath), data, setError);
        };
        xhr.open("GET", url);
        xhr.send();
      });
  } catch (err: any) {
    errorToast(err.code);
  }
};
