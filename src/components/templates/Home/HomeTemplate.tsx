import { useState } from "react";
import { Add } from "@material-ui/icons";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import { makeStyles, IconButton as MuiButton } from "@material-ui/core";

import Modal from "../../elements/Modal";
import AddMemoryTemplate from "./AddMemory/AddMemoryTemplate";
import MemoryDetail from "./MemoryDetail/MemoryDetailTemplate";
import EditMemoryTemplate from "./EditMemory/EditMemoryTemplate";

import {
  ButtonsWrapper,
  DummymSpan,
  Spinner,
  TimelineWrapper,
  Wrapper,
} from "./HomeTemplate.styled";
import { useModal } from "../../../contextProviders/ModalProvider";
import { useMemory } from "../../../contextProviders/MemoryProvider";
import { ModalType } from "../../../utils/types";
import useObserver from "../../../hooks/useObserver";

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
  const { memories, isLoading, loadNextBatch, hasMore } = useMemory();
  const { openedModal, changeOpenedModalState } = useModal();
  const observe = useObserver<HTMLDivElement>(
    loadNextBatch,
    hasMore && !isLoading
  );

  return (
    <Wrapper>
      <ButtonsWrapper>
        <MuiButton
          onClick={() => changeOpenedModalState({ type: ModalType.Add })}
        >
          <Add />
        </MuiButton>
      </ButtonsWrapper>
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

        {isLoading && <Spinner />}

        <DummymSpan ref={observe} />
      </TimelineWrapper>
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
          </>
        </Modal>
      )}
    </Wrapper>
  );
};

export default HomeTemplate;
