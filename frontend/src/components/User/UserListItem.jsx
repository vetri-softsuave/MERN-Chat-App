import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, onClose, handleFunction }) => {

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
      onClick={() => handleFunction(user)}
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
