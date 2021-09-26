import styled from "styled-components";
import { theme } from "../../../utils/theme";

export const Content = styled.div`
  border-radius: 5px;
  border: 1px solid ${theme.primary};
  padding: 5px;
  word-wrap: break-word;
`;

export const Info = styled.p`
  font-size: 0.8rem;
  margin: 0 0 0 5px;

  .date {
    :first-letter {
      text-transform: uppercase;
    }

    display: inline-block;
    font-weight: 600;
  }
`;

export const Wrapper = styled.div`
  max-width: 40%;
  height: fit-content;
  margin: 10px;
`;
