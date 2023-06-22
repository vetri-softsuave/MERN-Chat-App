import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, onRemove }) => {
  console.log('user: ', user);
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize={12}
      variant="solid"
      bg="purple"
      color="white"
      cursor={"pointer"}
      onClick={() => onRemove(user)}
    >
      {user.name}
      <i
        className="fa-solid fa-xmark"
        style={{ color: "#fff", marginLeft: "5px" }}
      ></i>
    </Box>
  );
};

export default UserBadgeItem;
