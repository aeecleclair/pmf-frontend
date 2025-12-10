import { columns } from "./Columns";
import { DataTable } from "./DataTable";

import { useUsers } from "@/hooks/siarnaq/useCdrUsers";

export const UserSearch = () => {
  const { users } = useUsers();

  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
