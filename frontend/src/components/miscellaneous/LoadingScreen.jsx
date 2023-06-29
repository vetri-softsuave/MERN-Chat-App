import { Box, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgColor="white"
    >
      <Spinner size="xl" color="blue.500" />
    </Box>
  );
};

export default LoadingScreen;