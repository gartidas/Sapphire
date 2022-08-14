import { ChangeEvent, useRef } from "react";
import { CircularProgress } from "@material-ui/core";
import { AddAPhoto, Publish } from "@material-ui/icons";
import moment from "moment";
import { Controller, FormProvider, UseFormMethods } from "react-hook-form";

import TextBox from "../../elements/TextBox";
import DatePicker from "../../elements/DatePicker";
import { IMemoryData } from "../../../utils/types";

import {
  Button,
  FormContent,
  StyledFileName,
  StyledInput,
} from "./MemoryForm.styled";

interface IMemoryFormProps {
  methods: UseFormMethods<IMemoryData>;
  onSubmit: (data: IMemoryData) => Promise<void>;
  file: File | undefined;
  setFile: (file?: File) => void;
  isLoading: boolean;
  openedMemory: Partial<IMemoryData>;
}

const MemoryForm = ({
  methods,
  setFile,
  file,
  isLoading,
  onSubmit,
}: IMemoryFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { register, handleSubmit, errors } = methods;

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
    <FormProvider {...methods}>
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

          <Controller
            name="date"
            rules={{ required: "Is required" }}
            render={({ onChange, ref, ...rest }) => (
              <DatePicker
                {...rest}
                label="Date"
                views={["year", "month"]}
                format="YYYY-MM"
                error={!!errors.date?.message}
                helperText={errors.date?.message}
                minDate={moment("2020-05").toDate()}
                fullWidth
                onChange={(date) => onChange(date?.format("YYYY-MM"))}
              />
            )}
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
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
            >
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
    </FormProvider>
  );
};

export default MemoryForm;
