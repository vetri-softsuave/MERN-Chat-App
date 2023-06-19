import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const UserList = ({ isLoading, users = [], onClose }) => {
  return (
    <>
      {isLoading ? (
        <ChatLoading />
      ) : (
        users.map((user) => (
          <UserListItem key={user._id} user={user} onClose={onClose} />
        ))
      )}
    </>
  );
};

export default UserList;
