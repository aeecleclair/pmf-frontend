import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface UserInfoViewProps {
  label: string;
  value?: string;
}

export const UserInfoView = ({ label, value }: UserInfoViewProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={label} className="font-bold">
        {label} :
      </Label>
      {label ? (
        <span id={label}>{value}</span>
      ) : (
        <Skeleton className="w-24 h-6" />
      )}
    </div>
  );
};
