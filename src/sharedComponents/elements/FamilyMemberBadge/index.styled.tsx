import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { Button as MuiButton } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
  height: 100%;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const StatusBubble = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2.5rem;
  width: max-content;
  max-width: calc(100% - 1rem);
  min-width: 2.5rem;
  text-align: center;
  transform: translateX(-50%);
  background: ${theme.primary};
  color: ${theme.secondary};
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  z-index: 2;
`;

export const SmallBubble = styled.div`
  position: absolute;
  left: 45%;
  bottom: 2.5rem;
  transform: translate(-75%, 50%);
  background: ${theme.primary};
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  z-index: 3;
`;

export const SmallerBubble = styled.div`
  position: absolute;
  left: 47%;
  bottom: 2.5rem;
  transform: translate(-50%, 200%);
  background: ${theme.primary};
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  z-index: 4;
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`;

export const CredentialWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

export const DeleteButton = styled(MuiButton)`
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
  padding: 0;
  min-width: fit-content;
`;
