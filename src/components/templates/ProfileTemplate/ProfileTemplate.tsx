import {
  BannerPlaceholder,
  StyledImage,
  Wrapper,
} from "./ProfileTemplate.styled";
import { useState } from "react";
import BannerUploadTemplate from "./BannerUploadTemplate/BannerUploadTemplate";
import Modal from "../../elements/Modal";
import { useUser } from "../../../contextProviders/UserProvider";

const ProfileTemplate = () => {
  const [file, setFile] = useState<File>();
  const { family } = useUser();
  const [openedBannerModal, setOpenedBannerModal] = useState(false);

  return (
    <Wrapper>
      {family?.bannerUrl ? (
        <StyledImage
          src={family.bannerUrl}
          onClick={() => setOpenedBannerModal(true)}
        />
      ) : (
        <BannerPlaceholder onClick={() => setOpenedBannerModal(true)}>
          No image available
        </BannerPlaceholder>
      )}
      {openedBannerModal && (
        <Modal
          open
          onClose={() => {
            setOpenedBannerModal(false);
            setFile(undefined);
          }}
        >
          <BannerUploadTemplate
            file={file}
            setFile={setFile}
            onClose={() => setOpenedBannerModal(false)}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default ProfileTemplate;
