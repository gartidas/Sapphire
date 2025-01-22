import styled, { css } from "styled-components";
import { theme } from "../../../utils/theme";

interface IDropZoneProps {
  fullWidth?: boolean;
  isDragReject: boolean;
  isDragAccept: boolean;
}

export const DropZoneWrapper = styled.div<IDropZoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${theme.primary} 1px dashed;
  padding: 0.75rem 2rem 2rem 2rem;
  cursor: pointer;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: calc(100% - 4rem);
    `};
  ${({ isDragReject, isDragAccept }) =>
    (isDragReject || isDragAccept) &&
    css`
      filter: brightness(80%);
    `};

  :hover {
    filter: brightness(80%);
  }
`;
