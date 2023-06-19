export const makeToastConfig = (title, status) => {
  return {
    title,
    status,
    duration: 3000,
    position: "bottom",
    isClosable: true,
  };
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
