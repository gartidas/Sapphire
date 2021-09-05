import { CircularProgress, IconButton as MuiButton } from "@material-ui/core";
import { Timeline } from "@material-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import firebase from "firebase/app";

import { IMessage } from "../../../utils/types";
import Message from "../../modules/Message/Message";
import { useAuth } from "../../../contextProviders/AuthProvider";
import { projectFirestore } from "../../../firebase/config";
import { errorToast } from "../../../services/toastService";
import useObserver from "../../../hooks/useObserver";

import {
  Wrapper,
  ButtonsWrapper,
  ChatWrapper,
  ActionsWrapper,
  MessagesWrapper,
  StyledTextBox,
  DummySpan,
} from "./ChatTemplate.styled";

const ChatTemplate = () => {
  const auth = useAuth();
  const [hasMore, setHasMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const pageSize = 13;
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEl = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(() => {
    setMessagesLoading(true);
    projectFirestore
      .collection("messages")
      .orderBy("date", "desc")
      .limit(pageSize)
      .onSnapshot(mapDocs, (err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mapDocs = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: any[] = [];
    snap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    setLastVisible(documents[documents.length - 1]);
    setMessages(documents);
    setHasMore(documents.length === pageSize);
    setMessagesLoading(false);
  };

  const nextPage = () => {
    if (!hasMore) return;
    setMessagesLoading(true);

    projectFirestore
      .collection("messages")
      .orderBy("date", "desc")
      .startAfter(lastVisible)
      .limit(pageSize)
      .onSnapshot(mapDocs, (err) => console.log(err));
  };

  const observe = useObserver<HTMLDivElement>(
    nextPage,
    hasMore && !messagesLoading
  );

  const enterPressed = async () => {
    if (messageText !== "") {
      const message: IMessage = {
        date: moment().toLocaleString(),
        content: messageText,
        from: auth.user?.email!,
      };

      try {
        await projectFirestore
          .collection("/messages")
          .doc(message.date)
          .set(message);
      } catch (err: any) {
        errorToast(err.code);
      }
      setMessageText("");
    }
  };

  return (
    <Wrapper>
      <ButtonsWrapper>
        <Link to="/">
          <MuiButton>
            <Timeline />
          </MuiButton>
        </Link>
      </ButtonsWrapper>
      <ChatWrapper>
        <MessagesWrapper ref={messagesEl}>
          {messages.map((x) => (
            <Message key={x.id} message={x} />
          ))}
          {/* {messagesLoading && <CircularProgress color="secondary" />} */}
          <DummySpan ref={observe} />
        </MessagesWrapper>
        <ActionsWrapper>
          <StyledTextBox
            id="message"
            name="message"
            placeholder="Aa"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            multiline
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                enterPressed();
                event.preventDefault();
              }
            }}
          />
        </ActionsWrapper>
      </ChatWrapper>
    </Wrapper>
  );
};

export default ChatTemplate;
