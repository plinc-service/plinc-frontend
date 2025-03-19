"use client";

import TopBar from "@/components/layout/TopBar";
import UsersTableWrapper from "@/components/users/UsersTableWrapper";

export type SortField = "username" | "email" | "date_joined";
export type SortOrder = "asc" | "desc";

const UsersPage: React.FC = () => {
  return (
    <div className="relative w-full h-full p-3">
      <TopBar pageName="Utilisateurs" />
      <UsersTableWrapper />
    </div>
  );
};

export default UsersPage;
