import { CdrUser } from "@/api";

export default function UserDisplayName({ user }: { user: CdrUser }) {
  return (
    <span className="font-bold">
      {user.nickname
        ? `${user.nickname} (${user.firstname} ${user.name})`
        : `${user.firstname} ${user.name}`}
    </span>
  );
}
