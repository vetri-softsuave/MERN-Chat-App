import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender, makeToastConfig } from "../../config/utils";
import { SocketContext } from "../../context/socketContext";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../redux/api/chatApi";
import { addNewMessage, setSelectedChat } from "../../redux/features/chatSlice";
import ProfileModal from "../Modal/ProfileModal";
import UpdateGroupChatModal from "../Modal/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";

const SingleChat = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { selectedChat } = useSelector((state) => state.chat);
  const toast = useToast();
  const {
    user,
    chat: { messages },
  } = useSelector((state) => state);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const lastMessage = messages[messages.length - 1];
  const { isLoading: isMessagesLoading, refetch: refetchMessages } =
    useGetMessagesQuery(selectedChat._id);
  const [
    sendMessage,
    {
      data: newMessage,
      isSuccess: isSendMessageSuccess,
      isError: isSendMessageHasError,
      sendMessageError,
    },
  ] = useSendMessageMutation();

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("socket connected");
      setSocketConnected(true);
    });
    socket.on("typing", (senderId) => {
      console.log("typing....");
      setIsTyping(senderId !== user?.userId);
    });
    socket.on("stop_typing", () => setIsTyping(false));

    return () => {
      socket.removeAllListeners("connected");
      socket.removeAllListeners("typing");
      socket.removeAllListeners("stop_typing");
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("stop_typing", selectedChat._id);
    }, 2000);
    return () => clearTimeout(timer);
  }, [messageContent]);

  useEffect(() => {
    if (!selectedChat._id) return;
    refetchMessages();
    socket.emit("join_chat", selectedChat._id);
  }, [selectedChat?._id]);

  useEffect(() => {
    socket.on("receive_message", (newMessageReceived) => {
      console.log(
        "new message received",
        lastMessage,
        newMessageReceived,
        selectedChat
      );
      if (newMessageReceived?.chat?._id !== selectedChat?._id) {
        //do notification
      } else {
        dispatch(addNewMessage(newMessageReceived));
      }
    });

    return () => {
      socket.removeAllListeners("receive_message");
    };
  }, [lastMessage, selectedChat?.id]);

  useEffect(() => {
    if (isSendMessageSuccess) {
      console.log(newMessage);
      console.log("newMessage", messages);
      socket.emit("new_message", newMessage?.message);
      dispatch(addNewMessage(newMessage?.message));
    }
    if (isSendMessageHasError)
      toast(
        makeToastConfig(
          sendMessageError?.data?.message || "couldn't send message",
          "error"
        )
      );
  }, [isSendMessageHasError, isSendMessageSuccess]);

  const handleBack = () => {
    dispatch(setSelectedChat({}));
  };

  const handleTyping = (e) => {
    if (!socketConnected) return;
    socket.emit("typing", { chatId: selectedChat._id, senderId: user.userId });
    setMessageContent(e.target.value);
    // setTimeout(() => {
    //   socket.emit("stop_typing", selectedChat._id);
    // }, 3000);
  };

  const sendMessageHandler = (e) => {
    if (e.key !== "Enter") return;
    socket.emit("stop_typing", selectedChat._id);
    sendMessage({ chatId: selectedChat._id, content: e.target.value });
    e.target.value = "";
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
                style={{
                  display: "flex",
                  gap: 10,
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <ScrollableChat messages={messages} isTyping={isTyping} />
                <FormControl onKeyDown={sendMessageHandler}>
                  <InputGroup>
                    <Input
                      variant="filled"
                      bg="#e0e0e0"
                      placeholder="Enter a message..."
                      onChange={handleTyping}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        _hover="none"
                        icon={
                          <i
                            className="fa-solid fa-paper-plane"
                            style={{ color: "#38b2ac" }}
                          ></i>
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
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
