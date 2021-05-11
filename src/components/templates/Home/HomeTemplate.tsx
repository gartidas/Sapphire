import { useCallback, useEffect, useState } from "react";
import { Add } from "@material-ui/icons";
import firebase from "firebase/app";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

import Modal from "../../elements/Modal";
import AddMemoryTemplate from "./AddMemory/AddMemoryTemplate";
import { IMemoryData, ModalType } from "../../../utils/types";
import { projectFirestore } from "../../../firebase/config";

import { AddButton, TimelineWrapper, Wrapper } from "./HomeTemplate.styled";
import MemoryDetail from "./MemoryDetail/MemoryDetail";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [memories, setMemories] = useState<IMemoryData[]>([]);
  const [modalType, setModalType] = useState<ModalType>();

  const fetchData = useCallback(() => {
    projectFirestore
      .collection("memories")
      .orderBy("date")
      .onSnapshot(mapDocs, (err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mapDocs = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: any = [];
    snap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    setMemories(documents);
  };

  const openModal = (modalType: ModalType) => {
    setModalType(modalType);
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <AddButton onClick={() => openModal(ModalType.Add)}>
        <Add />
      </AddButton>
      <TimelineWrapper>
        <Timeline align="alternate">
          {memories.map((x) => (
            <TimelineItem key={x.id}>
              <TimelineSeparator>
                <div
                  onClick={() => openModal(ModalType.Detail)}
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
      </TimelineWrapper>
      {modalOpen && (
        <Modal
          open
          onClose={() => {
            setModalOpen(false);
            setModalType(undefined);
            setFile(undefined);
          }}
        >
          <>
            {modalType === ModalType.Add && (
              <AddMemoryTemplate
                file={file}
                setFile={setFile}
                setModalOpen={setModalOpen}
                memories={memories}
              />
            )}

            {modalType === ModalType.Detail && <MemoryDetail />}
          </>
        </Modal>
      )}
    </Wrapper>
  );
};

export default HomeTemplate;
