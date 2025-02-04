"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { users } from "@/data/users";

const UsersTable = () => {
  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersTable;
