import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeToastConfig } from "../../config/utils";
import { useAccessChatMutation } from "../../redux/api/chatApi";
import { setSelectedChat } from "../../redux/features/chatSlice";
import ChatLoading from "../miscellaneous/ChatLoading";
import UserListItem from "./UserListItem";

const UserList = ({ isLoading, users = [], onClose }) => {
  const [accessChat, { data: chatData, isSuccess, isError, error }] =
    useAccessChatMutation();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSelectedChat(chatData?.chat));
      onClose();
    }
    if (isError)
      toast(
        makeToastConfig(error?.data?.message || "couldn't access chat", "error")
      );
  }, [isSuccess, isError]);

  const handleAccessChat = (data) => {
    accessChat({ receiverUserId: data._id });
  };

  return (
    <>
      {isLoading ? (
        <ChatLoading />
      ) : (
        users.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            onClose={onClose}
            handleFunction={handleAccessChat}
          />
        ))
      )}
    </>
  );
};

export default UserList;
