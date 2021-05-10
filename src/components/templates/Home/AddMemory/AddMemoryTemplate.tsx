import { ChangeEvent, useCallback, useRef, useState } from "react";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import { AddAPhoto, Publish } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { projectFirestore } from "../../../../firebase/config";
import {
  CloudinaryCloudUrl,
  CloudinaryUploadPreset,
} from "../../../../utils/CloudinaryUtils";
import { IMemoryData } from "../../../../utils/types";
import TextBox from "../../../elements/TextBox";
import DatePicker from "../../../elements/DatePicker";

import {
  Button,
  FormContent,
  StyledFileName,
  StyledInput,
} from "./AddMemoryTemplate.styled";
import { errorToast, successToast } from "../../../../services/toastService";

interface ICloudinaryResponse {
  secure_url: string;
}

interface AddMemoryProps {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  setModalOpen: (open: boolean) => void;
}

const AddMemoryTemplate = ({ file, setFile, setModalOpen }: AddMemoryProps) => {
  const { register, handleSubmit, errors, setError } = useForm<IMemoryData>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    moment()
  );
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleUploadImageClicked = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const onSubmit = async (data: IMemoryData) => {
    try {
      if (!file) return;
      setIsLoading(true);
      const cloudinaryResponse = await uploadImage(data.date.toString(), file);

      if (!cloudinaryResponse) return;

      const memory: Omit<IMemoryData, "id"> = {
        ...data,
        imageUrl: cloudinaryResponse.secure_url,
      };
      //TODO: read response
      await projectFirestore
        .collection("/memories")
        .add(memory)
        .catch(errorToast);

      successToast("Memory added!");
      setFile(undefined);
      setModalOpen(false);
    } catch (err) {
      setError(err.field, err.error);
    }
    setIsLoading(false);
  };

  const uploadImage = useCallback(async (fileName: string, file: File): Promise<
    ICloudinaryResponse | undefined
  > => {
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("upload_preset", CloudinaryUploadPreset);
      formData.append("public_id", fileName);

      const response = await fetch(CloudinaryCloudUrl, {
        method: "post",
        body: formData,
      });
      const data: ICloudinaryResponse = await response.json();
      return data;
    } catch (err) {
      errorToast(err);
      return undefined;
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleUploadImageClicked}
          color="secondary"
        >
          {file ? (
            <StyledFileName>{file?.name}</StyledFileName>
          ) : (
            <>
              <AddAPhoto /> Upload image
            </>
          )}
        </Button>
        <DatePicker
          name="date"
          label="Date"
          views={["year", "month"]}
          format="YYYY-MM"
          inputRef={register({ required: "Is required" })}
          error={!!errors.date?.message}
          helperText={errors.date?.message}
          minDate={moment("2020-05").toDate()}
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          fullWidth
        />

        <TextBox
          name="description"
          label="Description"
          inputRef={register}
          error={!!errors.description?.message}
          helperText={errors.description?.message}
          multiline
          rows={5}
          fullWidth
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" fullWidth variant="outlined" color="secondary">
            <Publish />
            Submit
          </Button>
        )}

        <StyledInput
          name="image"
          value=""
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleInputChanged}
        />
      </FormContent>
    </form>
  );
};

export default AddMemoryTemplate;
