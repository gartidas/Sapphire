import { useState } from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

import AddMemoryTemplate from "./components/AddMemoryTemplate";
import MemoryDetail from "./components/MemoryDetailTemplate";
import EditMemoryTemplate from "./components/EditMemoryTemplate";

import {
  ButtonsWrapper,
  DummymSpan,
  FamilyNickname,
  IndicatingButton,
  StyledSpinner,
  TimelineWrapper,
  Wrapper,
} from "./index.styled";
import { ModalType } from "../../../model";
import useObserver from "../../../hooks/useObserver";
import FullPageSpinner from "../../modules/FullPageSpinner";
import NoData from "../../elements/NoData";
import { useUser } from "../../../contextProviders/UserProvider";
import Modal from "../../elements/Modal";
import { useMemory } from "../../../contextProviders/MemoryProvider";
import { useModal } from "../../../contextProviders/ModalProvider";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";
import ConfirmationForm from "../../modules/ConfirmationForm";
import { successToast } from "../../../services/toastService";

const useStyles = makeStyles((theme) => ({
  timelineDot: {
    margin: 0,
    minWidth: "10px",
    minHeight: "10px",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
  },

  timelineContent: {
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.secondary.main,
  },

  timelineConnector: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const HomeTemplate = () => {
  const classes = useStyles();
  const [file, setFile] = useState<File>();
  const {
    memories,
    deleteMemory,
    changeLoadingState,
    isLoading,
    loadNextBatch,
    hasMore,
  } = useMemory();
  const { openedModal, changeOpenedModalState } = useModal();
  const { user, family } = useUser();
  const observe = useObserver<HTMLDivElement>(
    () => loadNextBatch(user!.familyId),
    hasMore && !isLoading
  );

  return (
    <Wrapper>
      <ButtonsWrapper>
        <IndicatingButton
          isIndicating={!memories || memories.length === 0}
          onClick={() => changeOpenedModalState({ type: ModalType.Add })}
        >
          <Icon icon={EIcon.Add} alt="Add" width={40} />
        </IndicatingButton>
      </ButtonsWrapper>
      {family?.nickname && (
        <FamilyNickname>
          <span>{family?.nickname}</span>'s timeline
        </FamilyNickname>
      )}
      {memories && memories.length > 0 ? (
        <TimelineWrapper>
          <Timeline align="alternate">
            {memories.map((x) => (
              <TimelineItem key={x.id}>
                <TimelineSeparator>
                  <div
                    onClick={() => {
                      changeOpenedModalState({
                        type: ModalType.Detail,
                        memory: x,
                      });
                    }}
                    style={{ borderRadius: "50%" }}
                  >
                    <TimelineDot className={classes.timelineDot} />
                  </div>
                  <TimelineConnector className={classes.timelineConnector} />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent}>
                  {x.date}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          {isLoading && <StyledSpinner size={{ desktop: 60, mobile: 40 }} />}

          <DummymSpan ref={observe} />
        </TimelineWrapper>
      ) : (
        <>{isLoading ? <FullPageSpinner hasNavbar /> : <NoData />}</>
      )}

      {openedModal && (
        <Modal
          open
          onClose={() => {
            changeOpenedModalState(undefined);
            setFile(undefined);
          }}
        >
          <>
            {openedModal.type === ModalType.Add && (
              <AddMemoryTemplate
                file={file}
                setFile={setFile}
                onClose={() => changeOpenedModalState(undefined)}
              />
            )}

            {openedModal.type === ModalType.Detail && (
              <MemoryDetail openedMemory={openedModal.memory} />
            )}

            {openedModal.type === ModalType.Edit && (
              <EditMemoryTemplate
                file={file}
                setFile={setFile}
                onClose={() => changeOpenedModalState(undefined)}
                openedMemory={openedModal.memory}
              />
            )}

            {openedModal.type === ModalType.Confirmation && (
              <ConfirmationForm
                title="Are you sure you want to delete this memory?"
                onDelete={async () => {
                  changeLoadingState(true);
                  await deleteMemory(openedModal.memory, user!.familyId);
                  successToast("Memory deleted!");
                  changeOpenedModalState(undefined);
                }}
                onClose={() =>
                  changeOpenedModalState({
                    type: ModalType.Detail,
                    memory: openedModal.memory,
                  })
                }
                isLoading={isLoading}
              />
            )}
          </>
        </Modal>
      )}
    </Wrapper>
  );
};

export default HomeTemplate;
