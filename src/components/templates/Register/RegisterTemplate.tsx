import { Email, Link, Share, WhatsApp } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { projectAuth } from "../../../firebase/config";
import useWindowSize from "../../../hooks/useWindowSize";
import { errorToast, infoToast } from "../../../services/toastService";
import { firebaseErrorToFieldError } from "../../../utils/firebase-error";
import { MD } from "../../../utils/theme";
import { IUserData } from "../../../utils/types";
import AccountForm from "../../modules/AccountForm/AccountForm";
import {
  ShareButtons,
  InfoText,
  SocialIcon,
  ThankYouPageWrapper,
  ThankYouTitle,
  ThankYouContent,
} from "./RegisterTemplate.styled";
import commonConfig from "../../../config";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../contextProviders/UserProvider";
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie/cjs/Cookies";
import { FacebookMessengerIcon } from "../../elements/FacebookMessengerIcon/FacebookMessengerIcon";

const RegisterTemplate = () => {
  const appDomain = commonConfig.appDomain!;
  const isDesktop = useWindowSize().width > MD;
  const methods = useForm<IUserData & { repeatPassword: string }>();
  const { setError } = methods;
  const router = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isExternalLink, setIsExternalLink] = useState(false);
  const { createUser, user, createFamily, doesFamilyIdExist } = useUser();
  const shareUrl = `${appDomain}register`;
  const randomId = uuidv4();
  const cookies = new Cookies();

  const onSubmit = async (data: IUserData & { repeatPassword: string }) => {
    try {
      const { repeatPassword, ...rest } = data;
      const emailTag = data.email.trim().split("@")[0];
      const sessionId = cookies.get("sessionId");
      const finalId = sessionId || `${emailTag}-${randomId}`;
      const isExternalLink = sessionId !== undefined;
      setIsExternalLink(isExternalLink);

      if (isExternalLink && !(await doesFamilyIdExist(finalId))) {
        errorToast("Provided invitation URL was corrupted.");
        return;
      }

      if (data.password !== repeatPassword) {
        setError("repeatPassword", { message: "Should be same as password" });
        return;
      }

      setIsLoading(true);
      const { user } = await projectAuth.createUserWithEmailAndPassword(
        data.email.trim(),
        data.password
      );
      const { password, ...additionalData } = rest;

      if (user) {
        createUser({ ...additionalData, familyId: finalId });

        if (!isExternalLink) createFamily({ familyId: finalId });
      }
      cookies.remove("sessionId");
    } catch (err: any) {
      var error = firebaseErrorToFieldError(err);
      setError(error.field, error.error);
    }
    setIsLoading(false);
  };

  return user ? (
    <ThankYouPageWrapper>
      <ThankYouTitle>Thank you for joining us!</ThankYouTitle>
      {isExternalLink ? (
        <InfoText>
          Now you can{" "}
          <span onClick={() => router.push("/home")}>enter the app.</span>
        </InfoText>
      ) : (
        <ThankYouContent>
          <InfoText>Would you like to invite your family also?</InfoText>
          {isDesktop ? (
            <ShareButtons>
              <SocialIcon href={`mailto:?body=${shareUrl}/${user.familyId}`}>
                <Email />
              </SocialIcon>
              <SocialIcon
                href={`http://www.facebook.com/dialog/send?app_id=${commonConfig.facebookAppId!}&link=${`${shareUrl}/${user.familyId}`}&redirect_uri=${`${shareUrl}/${user.familyId}`}`}
                target="_blank"
              >
                <FacebookMessengerIcon />
              </SocialIcon>
              <SocialIcon
                href={`https://wa.me/?text=${`${shareUrl}/${user.familyId}`}`}
                target="_blank"
              >
                <WhatsApp />
              </SocialIcon>
              <SocialIcon
                onClick={() => {
                  navigator.clipboard.writeText(`${shareUrl}/${user.familyId}`);
                  infoToast("Copied to clipboard!");
                }}
              >
                <Link />
              </SocialIcon>
            </ShareButtons>
          ) : (
            <ShareButtons>
              <SocialIcon
                onClick={() => {
                  navigator.share({
                    url: `${shareUrl}/${user.familyId}`,
                    text: "Come and join my family in Sapphire app!",
                  });
                }}
              >
                <Share />
              </SocialIcon>
              <SocialIcon
                onClick={() => {
                  navigator.clipboard.writeText(`${shareUrl}/${user.familyId}`);
                  infoToast("Copied to clipboard!");
                }}
              >
                <Link />
              </SocialIcon>
            </ShareButtons>
          )}
          <InfoText>
            Or <span onClick={() => router.push("/home")}>enter the app.</span>
          </InfoText>
        </ThankYouContent>
      )}
    </ThankYouPageWrapper>
  ) : (
    <AccountForm methods={methods} onSubmit={onSubmit} isLoading={isLoading} />
  );
};

export default RegisterTemplate;
