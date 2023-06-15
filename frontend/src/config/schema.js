import * as yup from "yup";
export const signUpFormSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  picture: yup.string(),
});

export const loginFormSchema = yup.object({
  email: yup.string().email("please enter a valid email").required("Required"),
  password: yup.string().required(),
});
