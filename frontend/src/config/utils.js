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
  return users[0]._id === loggedUser.userId ? users[1] : users[0];
};

// export const isSameSender = (messages, i, userId) => {
//   return ()
//   console.log(messages, i, userId);
// };

export const isLastMessage = (messages, i) => {
  return messages[i].sender._id !== messages[i + 1]?.sender._id;
};

export const calculateMarginLeft = (messages, i, userId) => {
  if (messages[i]?.sender?._id !== userId) {
    if (isLastMessage(messages, i)) return 0;
    else return 33;
  } else return "auto";
};
