import { DropzoneState } from "react-dropzone";
import { DropZoneWrapper } from "./index.styled";
import uploadImageIcon from "./UploadImage.gif";
import wrongActionIcon from "./WrongAction.gif";

interface IDropZoneProps {
  state: DropzoneState;
  fullWidth?: boolean;
}

const DropZone = ({ state, fullWidth }: IDropZoneProps) => {
  const { getRootProps, getInputProps, isDragReject, isDragAccept } = state;

  // NOTE: Upload image doesn't have the same context as the image tag
  /* eslint-disable jsx-a11y/img-redundant-alt */

  return isDragReject ? (
    <DropZoneWrapper
      {...getRootProps()}
      fullWidth={fullWidth}
      isDragReject={isDragReject}
      isDragAccept={isDragAccept}
    >
      <input {...getInputProps()} />
      <img src={wrongActionIcon} alt="Wrong action" width={60} />
      This file format is not accepted
    </DropZoneWrapper>
  ) : (
    <DropZoneWrapper
      {...getRootProps()}
      fullWidth={fullWidth}
      isDragReject={isDragReject}
      isDragAccept={isDragAccept}
    >
      <input {...getInputProps()} />
      <img src={uploadImageIcon} alt="Upload image" width={60} />
      Drag and drop your image here or click
    </DropZoneWrapper>
  );
};

export default DropZone;
