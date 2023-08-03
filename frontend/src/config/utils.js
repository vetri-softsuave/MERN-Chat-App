export const makeToastConfig = (title, status) => {
  return {
    title,
    status,
    duration: 3000,
    position: "top-right",
    isClosable: true,
  };
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser.userId ? users[1] : users[0];
};


export const isLastMessage = (messages, i) => {
  return messages[i].sender._id !== messages[i + 1]?.sender._id;
};

export const calculateMarginLeft = (messages, i, userId) => {
  if (messages[i]?.sender?._id !== userId) {
    if (isLastMessage(messages, i)) return 0;
    else return 33;
  } else return "auto";
};
