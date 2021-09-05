import moment from "moment";
import { CSSProperties } from "react";
import ReactLinkify from "react-linkify";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { IMessage } from "../../../utils/types";

import { Content, Info, Wrapper } from "./Message.styled";

interface IMessageProps {
  message: IMessage;
}

const Message = ({ message }: IMessageProps) => {
  const auth = useAuth();
  const wrapperStyle: CSSProperties = {
    alignSelf: auth.user?.email === message.from ? "flex-end" : "flex-start",
  };

  return (
    <Wrapper style={wrapperStyle}>
      <Info>
        <span className="date">{moment(message.date).fromNow()}</span>{" "}
      </Info>
      <ReactLinkify>
        <Content>{message.content}</Content>
      </ReactLinkify>
    </Wrapper>
  );
};

export default Message;
