import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const ProfileModal = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          icon={<i className="fa-solid fa-eye"></i>}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            display="flex"
            justifyContent="center"
            fontFamily="work sans"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" flexDir="column">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.picture}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
