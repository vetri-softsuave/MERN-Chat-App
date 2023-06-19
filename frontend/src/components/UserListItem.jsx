import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeToastConfig } from "../config/utils";
import { useAccessChatMutation } from "../redux/api/chatApi";
import { setSelectedChat } from "../redux/features/chatSlice";

const UserListItem = ({ user, onClose }) => {
  console.log("user: ", user);
  const [accessChat, { data: chatData, isSuccess, isError, error }] =
    useAccessChatMutation();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    console.log("current chat", chatData?.chat);
    if (isSuccess) {
      dispatch(setSelectedChat(chatData?.chat));
      onClose();
    }
    if (isError)
      toast(
        makeToastConfig(error?.data?.message || "couldn't access chat", "error")
      );
  }, [isSuccess, isError]);

  return (
    <Box
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      color="black"
      onClick={() => accessChat({ receiverUserId: user._id })}
    >
      <Avatar mr={2} size="sm" src={user?.picture} name={user?.name} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
