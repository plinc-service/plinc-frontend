import Image from "next/image";
import { User } from "@/interfaces/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Avatar } from "@/components/ui/Avatar";
import { ChevronRight } from "lucide-react";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nom d&apos;utilisateur</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead>Inscrit le</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="cursor-pointer">
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <Image
                    src={user.avatar || "/avatar.svg"}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell className="text-muted-foreground">{user.address}</TableCell>
            <TableCell className="text-muted-foreground">{user.registeredAt}</TableCell>
            <TableCell>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
