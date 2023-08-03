import { Avatar, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { calculateMarginLeft, isLastMessage } from "../../config/utils";
import Lottie from 'react-lottie';
import typingAnimation from "../../assets/animations/typing.json";

const lottieOptions = {
  loop: true,
  autoPlay: true,
  animationData: typingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ScrollableChat = ({ messages, isTyping }) => {
  const user = useSelector((state) => state.user);

  return (
    <ScrollableFeed forceScroll={true}>
      {messages &&
        messages?.length > 0 &&
        messages?.map((message, index) => {
          let avatar = null;
          const isCurrentUser = message.sender._id === user.userId;
          if (
            message.sender._id !== user.userId &&
            isLastMessage(messages, index)
          )
            avatar = (
              <Tooltip
                label={message?.sender.name}
                hasArrow
                placement="bottom-start"
              >
                <Avatar
                  src={message?.sender?.picture}
                  name={message?.sender.name}
                  mr={1}
                  mt="7px"
                  size="sm"
                  cursor="pointer"
                />
              </Tooltip>
            );
          return (
            <div key={message._id} style={{ display: "flex" }}>
              {avatar}
              <span
                style={{
                  backgroundColor: isCurrentUser ? "#BEE3F8" : "#B9F5D0",
                  borderRadius: "20px",
                  maxWidth: "75%",
                  padding: "5px 15px",
                  marginLeft: calculateMarginLeft(messages, index, user.userId),
                  marginTop: "10px",
                }}
              >
                {message.content}
              </span>
            </div>
          );
        })}
        {isTyping ? (
                    <div>
                      <Lottie
                        options={lottieOptions}
                        width={70}
                        style={{ margin:"15px 0px 15px 0px" }}
                      />
                    </div>
                  ) : null}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
