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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeToastConfig } from "../../config/utils";
import useSearchUsers from "../../hooks/useSearchUsers";
import {
  useAddUserToGroupMutation,
  useLeaveGroupMutation,
  useRemoveUserFromGroupMutation,
  useRenameGroupMutation,
} from "../../redux/api/chatApi";
import { setSelectedChat } from "../../redux/features/chatSlice";
import UserBadgeItem from "../User/UserBadgeItem";
import UserListItem from "../User/UserListItem";
import ConfirmModal from "./ConfirmModal";

const UpdateGroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();
  const [confirmDialogData, setConfirmDialogData] = useState({
    title: "Leave Group",
    prompt: `Do you want to leave this group?`,
  });
  const [userToRemove, setUserToRemove] = useState();
  const { selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const [groupChatName, setGroupChatName] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const { users, usersLoading, onSearchInputChange } = useSearchUsers();
  const [
    renameGroup,
    {
      isLoading: isUpdatingGroupName,
      data: updatedGroup,
      isSuccess: isGroupUpdateSuccess,
      isError: isGroupUpdateHasError,
      error: groupUpdateError,
    },
  ] = useRenameGroupMutation();
  const [
    addUserToGroup,
    {
      data: userAddedGroup,
      isSuccess: isAddUserSuccess,
      isError: isAddUserHasError,
      error: addUserError,
    },
  ] = useAddUserToGroupMutation();

  const [
    removeUserFromGroup,
    {
      data: userRemovedGroup,
      isSuccess: isRemoveUserSuccess,
      isError: isRemoveUserHasError,
      error: RemoveUserError,
    },
  ] = useRemoveUserFromGroupMutation();

  const [
    leaveGroup,
    {
      isSuccess: isLeaveGroupSuccess,
      isError: isLeaveGroupHasError,
      error: LeaveGroupError,
    },
  ] = useLeaveGroupMutation();

  useEffect(() => {
    if (isAddUserSuccess) {
      toast(makeToastConfig("user added", "success"));
      dispatch(setSelectedChat(userAddedGroup));
    }
    if (isAddUserHasError)
      toast(
        makeToastConfig(
          addUserError?.data?.message || "couldn't add user",
          "error"
        )
      );
  }, [isAddUserHasError, isAddUserSuccess]);

  useEffect(() => {
    if (isGroupUpdateSuccess) {
      toast(makeToastConfig("Group name updated", "success"));
      dispatch(setSelectedChat(updatedGroup));
    }
    if (isGroupUpdateHasError)
      toast(
        makeToastConfig(
          groupUpdateError?.data?.message || "couldn't rename group",
          "error"
        )
      );
  }, [isGroupUpdateHasError, isGroupUpdateSuccess]);

  useEffect(() => {
    if (isRemoveUserSuccess) {
      toast(makeToastConfig("user removed", "success"));
      dispatch(setSelectedChat(userRemovedGroup));
    }
    if (isRemoveUserHasError)
      toast(
        makeToastConfig(
          RemoveUserError?.data?.message || "couldn't remove user",
          "error"
        )
      );
  }, [isRemoveUserHasError, isRemoveUserSuccess]);

  useEffect(() => {
    if (isLeaveGroupSuccess) {
      toast(makeToastConfig("You left the group", "success"));
      dispatch(setSelectedChat({}));
    }
    if (isLeaveGroupHasError)
      toast(
        makeToastConfig(
          LeaveGroupError?.data?.message || "couldn't left the group",
          "error"
        )
      );
  }, [isLeaveGroupHasError, isLeaveGroupSuccess]);

  const handleRemoveUser = (userToRemove) => {
    setUserToRemove(userToRemove);
    let dialogData = {
      title: "Remove user",
      prompt: `Do you want to remove ${userToRemove.name}?`,
    };
    if (
      user?.userId === userToRemove?._id ||
      user.userId === userToRemove.userId
    )
      dialogData = {
        title: "Leave Group",
        prompt: `Do you want to leave this group?`,
      };
    setConfirmDialogData(dialogData);
    onConfirmModalOpen();
  };

  const RemoveUserHandler = () => {
    if (userToRemove?.userId) leaveGroup({ groupId: selectedChat?._id });
    else
      removeUserFromGroup({
        groupId: selectedChat?._id,
        userToRemove: userToRemove?._id,
      });
    handleCloseConfirmModal();
  };

  const handleCloseConfirmModal = () => {
    onConfirmModalClose();
    setUserToRemove({});
  };

  const handleAddUser = (user) => {
    if (selectedChat?.users?.find((item) => item?._id === user._id))
      toast(makeToastConfig("User already in group", "error"));
    else addUserToGroup({ groupId: selectedChat?._id, userToAdd: user?._id });
  };

  const handleRename = () => {
    const payload = { groupId: selectedChat._id, groupName: groupChatName };
    renameGroup(payload);
    setGroupChatName("");
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
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={isUpdatingGroupName}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={onSearchInputChange}
              />
            </FormControl>
            {usersLoading ? (
              <Spinner />
            ) : (
              users
                ?.slice(0, 4)
                ?.map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleFunction={handleAddUser}
                  />
                ))
            )}
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
      <ConfirmModal
        isOpen={confirmModalOpen}
        title={confirmDialogData.title}
        prompt={confirmDialogData.prompt}
        onClose={handleCloseConfirmModal}
        onConfirm={RemoveUserHandler}
      />
    </>
  );
};

export default UpdateGroupChatModal;
