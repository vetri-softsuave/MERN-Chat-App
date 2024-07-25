import { Box, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import typingAnimation from "../../assets/animations/typing.json";
import { calculateMarginLeft, isLastMessage } from "../../config/utils";
import Message from "./Message";

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
      {messages && messages?.length > 0 ? (
        messages?.map((message, index) => {
          const isCurrentUser = message.sender._id === user.userId;
          return (
            <Message
              key={message?._id}
              isCurrentUser={isCurrentUser}
              message={message}
              isLastMessage={isLastMessage(messages, index)}
              marginLeft={calculateMarginLeft(messages, index, user.userId)}
            />
          );
        })
      ) : (
        <Box
          position="absolute"
          top={{ base: "50%" }}
          left={{ base: "50%", md: "50%" }}
          transform="translate(-50%,-50%)"
          fontFamily="work sans"
          fontSize={{ base: "1.2rem", md: "2rem" }}
        >
          <Text> No messages yet</Text>
        </Box>
      )}
      {isTyping ? (
        <div>
          <Lottie
            options={lottieOptions}
            width={70}
            style={{ margin: "15px 0px 15px 0px" }}
          />
        </div>
      ) : null}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
