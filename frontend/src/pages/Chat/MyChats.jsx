import { Box, Button, Stack, Text } from "@chakra-ui/react";

const MyChats = () => {
  return (
    <Box
      display={{ base: true ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="work sans"
        display="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<i className="fa-solid fa-plus"></i>}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY='scroll'>
          {[1, 2, 3, 4].map((chat, i) => (
            <Box
              key={i}
              cursor="pointer"
              bg="#e8e8e8"
              color="black"
              px={3}
              py={2}
              borderRadius="lg"
            >
              <Text>{chat?.is_group_chat ? chat?.chat_name : "getSender"}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MyChats;
