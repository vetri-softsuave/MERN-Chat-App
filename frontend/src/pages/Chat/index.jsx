import { Box } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";
import SideDrawer from "./SideDrawer";

const Chat = () => {
  return (
    <Box w="100%">
      <SideDrawer />
      <Box
        display="flex"
        w="100%"
        justifyContent="space-between"
        h="91.5vh"
        p="10px"
      >
        <MyChats />
        <ChatBox />
      </Box>
    </Box>
  );
};

export default Chat;
