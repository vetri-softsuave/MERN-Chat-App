import { Avatar, Tooltip } from "@chakra-ui/react";

const Message = ({ message, isCurrentUser, isLastMessage, marginLeft }) => {
  let avatar = null;
  if (!isCurrentUser && isLastMessage)
    avatar = (
      <Tooltip label={message?.sender.name} hasArrow placement="bottom-start">
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
    <div style={{ display: "flex" }}>
      {avatar}
      <div
        style={{
          backgroundColor: isCurrentUser ? "#BEE3F8" : "#B9F5D0",
          borderRadius: "8px",
          maxWidth: "50%",
          padding: "5px 15px",
          marginLeft: marginLeft,
          marginTop: "10px",
        }}
      >
        {message?.content}
      </div>
    </div>
  );
};

export default Message;
