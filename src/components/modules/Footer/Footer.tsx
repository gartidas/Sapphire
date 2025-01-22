import { GitHub, Instagram } from "@material-ui/icons";
import {
  DevelopedBy,
  SocialIcon,
  SocialsWrapper,
  StyledFooter,
  Version,
} from "./Footer.styled";
import socialsConfig from "../../../socials/config";
import commonConfig from "../../../config";

const Footer = () => {
  return (
    <StyledFooter>
      <Version>{commonConfig.version}</Version>
      <DevelopedBy>Developed by Gartidas™</DevelopedBy>
      <SocialsWrapper>
        <SocialIcon
          href={socialsConfig.instagram}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Instagram />
        </SocialIcon>
        <SocialIcon
          href={socialsConfig.github}
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHub />
        </SocialIcon>
      </SocialsWrapper>
    </StyledFooter>
  );
};

export default Footer;
