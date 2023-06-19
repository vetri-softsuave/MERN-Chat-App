import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "../../components/ProfileModal";
import UserList from "../../components/UserList";
import { makeToastConfig } from "../../config/utils";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useSearchUsersQuery } from "../../redux/api/userApi";
import { logout as logoutAction } from "../../redux/features/userSlice";

const SideDrawer = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [logout, { isSuccess, isError, error }] = useLogoutMutation();
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { data, isFetching } = useSearchUsersQuery(searchKey);
  console.log("isFetching: ", isFetching);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  console.log("data: ", data);
  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutAction());
      toast(makeToastConfig("Logged out", "success"));
    }
    if (isError)
      toast(makeToastConfig(error?.data?.message || "Logout failed", "error"));
  }, [isSuccess, isError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKey(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        borderWidth="4px"
        w="100%"
        px="10px"
        py="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4px">
              Search user
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work sans">
          Talk-Now
        </Text>
        <div>
          <Menu>
            <MenuButton p={1} m={1}>
              <i className="fa-solid fa-bell"></i>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="fa-solid fa-chevron-down fa-xs"></i>}
            >
              <Avatar
                size="sm"
                name={user?.name}
                cursor="pointer"
                src=""
              />
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <InputGroup>
                <InputLeftElement>
                  <i className="fas fa-search"></i>
                </InputLeftElement>
                <Input
                  placeholder="search by name or email"
                  value={search}
                  mr={2}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Box>
            <UserList isLoading={isFetching} users={data?.users ?? []} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
