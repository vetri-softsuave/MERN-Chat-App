import { useSelector } from "react-redux";
import LoadingScreen from "../components/miscellaneous/LoadingScreen";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import { useGetUserDetailsQuery } from "../redux/api/userApi";

const MainGuard = () => {
  const { isLoading } = useGetUserDetailsQuery();
  const { isLoggedIn, name } = useSelector((state) => state.user);
  console.log("isLoggedIn: ", isLoggedIn);
  let content = <Home />;
  if (isLoggedIn) content = <Chat />;
  else if (isLoading) content = <LoadingScreen />;
  else if (name) content = <Chat />;

  return <>{content}</>;
};

export default MainGuard;
