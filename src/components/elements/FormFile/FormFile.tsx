import {
  FormFileExtension,
  FormFileIcon,
  FormFileName,
  FormFileWrapper,
} from "./FormFile.styled";
import { theme } from "../../../utils/theme";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";

interface FormFileProps {
  fileName: string;
  fullWidth?: boolean;
}

const FormFile = ({ fileName, fullWidth }: FormFileProps) => {
  const fileExtension = `.${fileName.split(".").pop()}`;
  const name =
    fileExtension && fileName.substring(0, fileName.lastIndexOf(fileExtension));

  return (
    <FormFileWrapper fullWidth={fullWidth}>
      <FormFileIcon>
        <FileIcon
          extension={fileExtension}
          {...(fileExtension &&
            defaultStyles[fileExtension.toLowerCase() as DefaultExtensionType])}
          color={theme.primary}
        />
      </FormFileIcon>
      <FormFileName>{name}</FormFileName>
      <FormFileExtension>{fileExtension}</FormFileExtension>
    </FormFileWrapper>
  );
};

export default FormFile;
