import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginFormSchema } from "../../config/schema";
import { useLoginMutation } from "../../redux/api/userApi";
import { setAccessToken } from "../../redux/features/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, isSuccess, error, data }] =
    useLoginMutation();
  const toast = useToast();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitHandler,
    validationSchema: loginFormSchema,
  });
  async function submitHandler(data) {
    console.log(data);
    login(data);
    resetForm();
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAccessToken(data.accessToken));
      toast({
        title: "Login successFull",
        duration: 3000,
        isClosable: true,
        status: "success",
        position: "bottom",
      });
      navigate("/chats");
    } else if (isError)
      toast({
        title: error?.data?.message || "something went wrong",
        duration: 3000,
        isClosable: true,
        status: "error",
        position: "bottom",
      });
  }, [isError, isSuccess, error]);
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {" "}
        <FormControl
          id="email"
          isRequired
          isInvalid={errors.email && touched.email}
        >
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          id="password"
          isInvalid={errors.password && touched.password}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          width="100%"
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
        >
          Login
        </Button>
        <Button width="100%" colorScheme="red">
          Get Guest User Credentials
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
