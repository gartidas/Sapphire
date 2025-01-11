import styled from "styled-components";
import { LG, SM } from "../../../utils/theme";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

export const ThankYouPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
`;

export const ThankYouContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

export const ThankYouTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  @media screen and (max-width: ${LG}px) {
    font-size: 1.75rem;
  }
`;

export const InfoText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  @media screen and (max-width: ${LG}px) {
    font-size: 1rem;
  }

  span {
    font-weight: bold;
    cursor: pointer;
  }
`;

export const ShareButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;

  button {
    transition: transform 0.5s ease;
    padding: 0;

    :hover {
      transform: scale(1.5);
    }

    svg {
      font-size: 2.5rem;
    }

    @media screen and (max-width: ${SM}px) {
      svg {
        font-size: 2rem;
      }
    }
  }
`;

export const SocialIcon = styled.a`
  transition: transform 0.5s ease;
  padding: 0;
  cursor: pointer;

  :hover {
    transform: scale(1.5);
  }

  svg {
    font-size: 2.5rem;
  }

  @media screen and (max-width: ${SM}px) {
    svg {
      font-size: 2rem;
    }
  }
`;
