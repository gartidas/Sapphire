import { projectStorage } from "../firebase/config";
import { errorToast } from "../services/toastService";
import { IMemoryData, SetError } from "./types";

export const uploadImage = async (
  fileName: string,
  file: File
): Promise<string | undefined> => {
  try {
    const uploadResponse = await projectStorage
      .ref(`images/${fileName}`)
      .put(file);

    if (uploadResponse.state !== "success") {
      errorToast("Oops... something went wrong!");
      return undefined;
    }

    const url = await projectStorage.ref(`images/${fileName}`).getDownloadURL();
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

export const deleteImage = async (fileName: string): Promise<boolean> => {
  try {
    await projectStorage.ref(`images/${fileName}`).delete();
    return true;
  } catch (err: any) {
    errorToast(
      err.code === "storage/unauthorized"
        ? "Permission denied!"
        : `${err.name}:${err.code}`
    );
    return false;
  }
};

export const getImage = async (
  fileName: string,
  callback: (file: File, data: IMemoryData, setError: SetError) => void,
  data: IMemoryData,
  setError: SetError
): Promise<void> => {
  try {
    await projectStorage
      .ref(`images/${fileName}`)
      .getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
          var blob = xhr.response;
          blob.lastModified = new Date();
          callback(new File([blob], fileName), data, setError);
        };
        xhr.open("GET", url);
        xhr.send();
      });
  } catch (err: any) {
    errorToast(err.code);
  }
};
