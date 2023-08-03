import { useSelector } from "react-redux";
import LoadingScreen from "../components/miscellaneous/LoadingScreen";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import { useGetUserDetailsQuery } from "../redux/api/userApi";
import { useGetCookieQuery } from '../redux/api/authApi';

const MainGuard = () => {
  const { isLoading } = useGetUserDetailsQuery();
  const {data} = useGetCookieQuery()
  const { isLoggedIn, name } = useSelector((state) => state.user);
  let content = <Home />;
  if (isLoggedIn) {
    if (isLoading) content = <LoadingScreen />;
    if (name) content = <Chat />;
  }
  return <>{content}</>;
};

export default MainGuard;
