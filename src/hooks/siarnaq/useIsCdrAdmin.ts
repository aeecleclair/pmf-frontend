import { useMeUser } from "../useMeUser";

export const useIsCdrAdmin = () => {
  const { user } = useMeUser();
  const adminCdrId = "c1275229-46b2-4e53-a7c4-305513bb1a2a";
  return user?.groups?.some((group) => group.id === adminCdrId) ?? false;
};
