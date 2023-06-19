import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ChatLoading from "../../components/ChatLoading";
import { getSender } from "../../config/utils";
import { useFetchChatsQuery } from "../../redux/api/chatApi";
import { setSelectedChat } from "../../redux/features/chatSlice";

const MyChats = () => {
  const dispatch = useDispatch();
  const { data: chats, isLoading: chatsLoading } = useFetchChatsQuery();
  const user = useSelector((state) => state.user);
  const { selectedChat } = useSelector((state) => state.chat);
  console.log('selectedChat: ', selectedChat);
  console.log("chats", chats);

  const handleSelectedChat = (chat) => {
    console.log("chat", chat)
    dispatch(setSelectedChat(chat));
  };
  return (
    <Box
      display={{ base: true ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="work sans"
        display="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<i className="fa-solid fa-plus"></i>}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chatsLoading ? (
          <ChatLoading />
        ) : (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                key={chat._id}
                cursor="pointer"
                bg={selectedChat?._id === chat?._id ? "#38b2ac" : "#e8e8e8"}
                color={selectedChat?._id === chat?._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                onClick={() => handleSelectedChat(chat)}
              >
                <Text>
                  {chat?.is_group_chat
                    ? chat?.chat_name
                    : getSender(user, chat.users).name}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
