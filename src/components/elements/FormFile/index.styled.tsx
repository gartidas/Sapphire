import styled, { css } from "styled-components";
import { MD, theme } from "../../../utils/theme";

interface IFormFileProps {
  fullWidth?: boolean;
}

export const FormFileWrapper = styled.div<IFormFileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${theme.primary} 1px dashed;
  padding: calc(2rem + 0.28125rem) 2rem;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: calc(100% - 4rem);
    `};
`;

export const FormFileName = styled.p`
  font-weight: bold;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: ${MD}px) {
    font-size: 0.75rem;
  }
`;

export const FormFileExtension = styled.p`
  font-weight: bold;
  padding: 0;
  margin: 0;

  @media screen and (max-width: ${MD}px) {
    font-size: 0.75rem;
  }
`;

export const FormFileIcon = styled.div`
  width: 3.75rem;
  margin-right: 1rem;

  @media screen and (max-width: ${MD}px) {
    width: 2.5rem;
  }
`;
