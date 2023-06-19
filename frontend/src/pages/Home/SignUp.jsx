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
import { signUpFormSchema } from "../../config/schema";
import { makeToastConfig } from "../../config/utils";
import { useRegisterUserMutation } from "../../redux/api/authApi";
import uploadImage from "../../services/cloudinary";

const SignUp = () => {
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      picture: "",
    },
    validationSchema: signUpFormSchema,
    onSubmit: submitHandler,
  });
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [picture, setPicture] = useState(
    "https://res.cloudinary.com/vetri/image/upload/v1686809488/boy_glpzsa.jpg"
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast(makeToastConfig("User Registered Successfully", "success"));
    } else if (isError)
      toast(
        makeToastConfig(
          error?.data?.message || "User Registration Failed",
          "error"
        )
      );
  }, [isSuccess, isError, error]);
  const uploadImageHandler = async (pic) => {
    setUploadingImage(true);
    if (
      pic === undefined ||
      (pic.type !== "image/jpeg" && pic.type !== "image/png")
    ) {
      toast(makeToastConfig("Please select an image", "warning"));
    } else {
      const res = await uploadImage(pic);
      setPicture(res?.data?.url);
    }
    setUploadingImage(false);
  };
  function submitHandler(data) {
    data.picture = picture;
    registerUser(data);
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl
          id="name"
          isRequired
          isInvalid={errors.name && touched.name}
        >
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
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
        <FormControl
          isRequired
          id="confirmPassword"
          isInvalid={errors.confirmPassword && touched.confirmPassword}
        >
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Confirm Password"
              value={values.confirmPassword}
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
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <FormControl id="picture" isInvalid={errors.picture && touched.picture}>
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            border="none"
            p={1.5}
            accept="image/*"
            placeholder="upload profile picture"
            onChange={(e) => uploadImageHandler(e.target.files[0])}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{errors.picture}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          color="white"
          type="submit"
          mt={1}
          isLoading={isLoading || uploadingImage}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default SignUp;
