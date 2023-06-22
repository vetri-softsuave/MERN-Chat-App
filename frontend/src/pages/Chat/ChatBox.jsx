import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SingleChat from "../../components/Chat/SingleChat";

const ChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  return (
    <Box
      display={{ base: selectedChat?._id ? "flex" : "none", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
