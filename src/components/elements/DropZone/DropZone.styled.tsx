import styled, { css } from "styled-components";
import { theme } from "../../../utils/theme";

interface DropZoneProps {
  fullWidth?: boolean;
  isDragReject: boolean;
  isDragAccept: boolean;
}

export const DropZoneWrapper = styled.div<DropZoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${theme.primary} 1px dashed;
  padding: 0.75em 2em 2em 2em;
  cursor: pointer;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: calc(100% - 4em);
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
