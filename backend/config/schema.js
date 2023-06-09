const yup = require("yup");

const signUpSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(12).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "confirm password is not matching"),
  }),
});

module.exports = { signUpSchema };
