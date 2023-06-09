import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");

  const submitHandler = () =>{
    console.log('submitted');
  }

  return (
    <VStack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              variant="ghost"
              onClick={() => setShowPassword((pre) => !pre)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              variant="ghost"
              onClick={() => setShowPassword((pre) => !pre)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="picture" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          border='none'
          p={1.5}
          accept="image/*"
          placeholder="upload profile picture"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" color="white" mt={1} onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
