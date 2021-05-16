import { projectStorage } from "../firebase/config";
import { errorToast } from "../services/toastService";

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
  } catch (err) {
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
  } catch (err) {
    errorToast(
      err.code === "storage/unauthorized"
        ? "Permission denied!"
        : `${err.name}:${err.code}`
    );
    return false;
  }
};
