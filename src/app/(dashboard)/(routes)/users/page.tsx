"use client";

import TopBar from "@/components/layout/TopBar";
import UsersTable from "@/components/users/UsersTable";

const UsersPage: React.FC = () => {
  return (
    <div className="relative w-full h-full p-5">
      <TopBar pageName="Utilisateurs" />
      <div className="mt-10">
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
