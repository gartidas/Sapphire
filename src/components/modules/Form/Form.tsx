import { ChangeEvent, useRef, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { AddAPhoto, Publish } from "@material-ui/icons";
import moment from "moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useForm } from "react-hook-form";

import TextBox from "../../elements/TextBox";
import DatePicker from "../../elements/DatePicker";
import { IMemoryData, SetError } from "../../../utils/types";

import {
  Button,
  FormContent,
  StyledFileName,
  StyledInput,
} from "./Form.styled";

interface ISubmitFormProps {
  createSubmitHandler: (setError: SetError) => (data: IMemoryData) => void;
  file: File | undefined;
  setFile: (file?: File) => void;
  isLoading: boolean;
  openedMemory?: IMemoryData;
}

const SubmitForm = ({
  createSubmitHandler,
  setFile,
  file,
  isLoading,
  openedMemory,
}: ISubmitFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    moment()
  );
  const { register, handleSubmit, errors, setError } = useForm<IMemoryData>({
    defaultValues: openedMemory,
  });

  const handleUploadImageClicked = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  return (
    <form onSubmit={handleSubmit(createSubmitHandler(setError))}>
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

export default SubmitForm;
