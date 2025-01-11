import { Button } from "@material-ui/core";
import styled from "styled-components";
import { LG, MD, SM } from "../../../../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  gap: 3em;

  @media screen and (max-width: ${MD}px) {
    gap: 1.5em;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7em;

  @media screen and (max-width: ${MD}px) {
    gap: 3em;
  }

  @media screen and (max-width: ${SM}px) {
    gap: 1.7em;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  @media screen and (max-width: ${LG}px) {
    font-size: 1.5rem;
  }
`;

export const StyledButton = styled(Button)`
  padding: 0 5em;

  @media screen and (max-width: ${MD}px) {
    padding: 0 3em;
  }

  @media screen and (max-width: ${SM}px) {
    padding: 0 1.3em;
  }
`;
