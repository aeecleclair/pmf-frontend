import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditUserInfoFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  form: any;
}

export const EditUserInfoField = ({
  form,
  label,
  id,
  placeholder,
}: EditUserInfoFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col space-y-1.5">
            <FormLabel className="text-left font-bold">{label} :</FormLabel>
            <div>
              <FormMessage />
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
