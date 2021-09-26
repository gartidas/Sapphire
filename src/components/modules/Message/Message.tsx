import moment from "moment";
import { CSSProperties, Key } from "react";
import ReactLinkify from "react-linkify";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { IMessage } from "../../../utils/types";

import { Content, Info, Wrapper } from "./Message.styled";

interface IMessageProps {
  message: IMessage;
}

const componentDecorator = (href: string, text: string, key: Key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

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
      <ReactLinkify componentDecorator={componentDecorator}>
        <Content>{message.content}</Content>
      </ReactLinkify>
    </Wrapper>
  );
};

export default Message;
