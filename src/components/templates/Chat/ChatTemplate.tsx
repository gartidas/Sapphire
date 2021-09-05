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
  LoadingSpinner,
} from "./ChatTemplate.styled";

const ChatTemplate = () => {
  const auth = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] =
    useState<
      firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    >();
  const [messagesLoading, setMessagesLoading] = useState(false);
  const pageSize = 13;
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEl = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    setMessagesLoading(true);
    let request = projectFirestore
      .collection("messages")
      .orderBy("date", "desc");

    if (lastVisible) {
      request = request.startAfter(lastVisible);
    }

    mapDocs(await request.limit(pageSize).get());
  }, [lastVisible]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    projectFirestore.collection("messages").onSnapshot(
      (snap) => {
        const changes = snap.docChanges();

        if (changes.length === 1) {
          setMessages((prev) => [
            { ...(changes[0].doc.data() as IMessage), id: changes[0].doc.id },
            ...prev,
          ]);
        }
      },
      (err) => console.log(err)
    );
  }, []);

  const mapDocs = (
    snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    let documents: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] =
      [];
    snap.forEach((doc) => {
      documents.push(doc);
    });
    setLastVisible(documents[documents.length - 1]);

    const mappedDocuments: IMessage[] = documents.map((x) => ({
      ...(x.data() as any),
      id: x.id,
    }));

    setMessages((prev) => [...prev, ...mappedDocuments]);
    setHasMore(documents.length === pageSize);
    setMessagesLoading(false);
  };

  const observe = useObserver<HTMLDivElement>(
    fetchData,
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
          <DummySpan ref={observe} />
          {messagesLoading && (
            <LoadingSpinner>
              <CircularProgress color="secondary" />
            </LoadingSpinner>
          )}
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
