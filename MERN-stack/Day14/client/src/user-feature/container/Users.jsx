import React from "react";

import UsersList from "../components/UsersList";
import { DUMMY_USERS } from "../../data";

const Users = () => {
  return (
    <div className="container">
      <UsersList items={DUMMY_USERS} />
    </div>
  );
};

export default Users;
