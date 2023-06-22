import { useEffect, useState } from "react";
import { useSearchUsersQuery } from "../redux/api/userApi";

const useSearchUsers = () => {
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { data, isFetching } = useSearchUsersQuery(searchKey);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKey(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const onSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  return {
    users: data?.users,
    usersLoading: isFetching,
    onSearchInputChange,
  };
};

export default useSearchUsers;
