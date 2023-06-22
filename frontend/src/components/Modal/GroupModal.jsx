import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { makeToastConfig } from "../../config/utils";
import useSearchUsers from "../../hooks/useSearchUsers";
import { useCreateGroupMutation } from "../../redux/api/chatApi";
import UserBadgeItem from "../User/UserBadgeItem";
import UserListItem from "../User/UserListItem";

const GroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {
    users: searchUsers,
    usersLoading: searchUsersLoading,
    onSearchInputChange,
  } = useSearchUsers();
  const [createGroup, { isSuccess, isError }] = useCreateGroupMutation();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast(makeToastConfig("Group created", "success"));
      onClose();
    }
    if (isError) toast(makeToastConfig("couldn't create Group", "error"));
  }, [isSuccess, isError]);

  const handleGroup = (user) => {
    if (selectedUsers.includes(user))
      toast(makeToastConfig("user already added", "warning"));
    else setSelectedUsers((pre) => [...pre, user]);
  };

  const handleRemoveSelectedUsers = (user) => {
    setSelectedUsers((pre) => pre.filter((i) => i._id !== user._id));
  };

  const handleSubmit = () => {
    const paylaod = {
      groupName: chatName,
      users: selectedUsers.map((i) => i._id),
    };
    console.log(paylaod);
    createGroup(paylaod);
  };
  return (
    <>
      {<span onClick={onOpen}>{children}</span>}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="add users eg: John, Raj"
                onChange={onSearchInputChange}
                mb={1}
              />
            </FormControl>
            <Box display="flex" justifyContent="center" gap={2}>
              {selectedUsers?.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  onRemove={handleRemoveSelectedUsers}
                />
              ))}
            </Box>
            {searchUsersLoading ? (
              <Spinner />
            ) : (
              searchUsers
                ?.slice(0, 4)
                ?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={handleGroup}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
