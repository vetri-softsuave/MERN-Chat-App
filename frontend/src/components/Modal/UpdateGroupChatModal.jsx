import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserBadgeItem from "../User/UserBadgeItem";

const UpdateGroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const [groupChatName, setGroupChatName] = useState("");

  const handleRemoveUser = (user) => {
    console.log("user: ", user);
  };

  const handleRename = () => {
    const payload = { groupChatName };
    console.log("payload: ", payload);
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<i className="fa-solid fa-eye"></i>}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat?.chat_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexWrap="wrap" pb={3} w="100%">
              {selectedChat?.users?.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  onRemove={handleRemoveUser}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={() => {}}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleRemoveUser(user)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
