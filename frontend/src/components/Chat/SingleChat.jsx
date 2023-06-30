import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../config/utils";
import { useGetMessagesQuery } from "../../redux/api/chatApi";
import { setSelectedChat } from "../../redux/features/chatSlice";
import ProfileModal from "../Modal/ProfileModal";
import UpdateGroupChatModal from "../Modal/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";

const SingleChat = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery(
    selectedChat._id
  );
  console.log(messages);
  const handleBack = () => {
    dispatch(setSelectedChat({}));
  };

  const sendMessage = (e) => {
    if (e.key !== "Enter") return;
    console.log("input", e.target.value);
  };
  return (
    <>
      {selectedChat?._id ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<i className="fa-solid fa-arrow-left"></i>}
              onClick={handleBack}
            />
            {selectedChat?.is_group_chat ? (
              <>
                {selectedChat?.chat_name?.toUpperCase()}
                <UpdateGroupChatModal />
              </>
            ) : (
              <>
                {getSender(user, selectedChat?.users).name}
                <ProfileModal user={getSender(user, selectedChat?.users)} />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#e8e8e8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {isMessagesLoading ? (
              <Spinner size="xl" h={20} w={20} alignSelf="center" m="auto" />
            ) : (
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}
              >
                <ScrollableChat messages={messages} />
                <FormControl onKeyDown={sendMessage}>
                  <Input
                    variant="filled"
                    bg="#e0e0e0"
                    placeholder="Enter a message..."
                  />
                </FormControl>
              </div>
            )}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
          fontFamily="work sans"
          fontSize="30px"
        >
          <Text>Click on a user to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
