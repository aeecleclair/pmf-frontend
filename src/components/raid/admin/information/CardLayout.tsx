import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardLayoutProps {
  label: string;
  children: React.ReactNode;
}

export const CardLayout = ({ label, children }: CardLayoutProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
