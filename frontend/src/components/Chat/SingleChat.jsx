import { Box, IconButton, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../config/utils";
import { setSelectedChat } from "../../redux/features/chatSlice";
import ProfileModal from "../Modal/ProfileModal";
import UpdateGroupChatModal from "../Modal/UpdateGroupChatModal";

const SingleChat = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const handleBack = () => {
    dispatch(setSelectedChat({}));
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
          ></Box>
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
