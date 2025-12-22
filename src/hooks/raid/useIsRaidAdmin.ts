import { useMeUser } from "../useMeUser";

const RAID_ADMIN_GROUP_ID = "e9e6e3d3-9f5f-4e9b-8e5f-9f5f4e9b8e5f";

export const useIsRaidAdmin = () => {
  const { user } = useMeUser();

  return (
    user?.groups?.some((group) => group.id === RAID_ADMIN_GROUP_ID) ?? false
  );
};
