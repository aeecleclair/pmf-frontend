import * as React from "react";
import { Column } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface DataTableFilterCheckBoxProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableFilterCheckBox<TData, TValue>({
  column,
  title,
}: DataTableFilterCheckBoxProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as null[]);

  const filterValues = Array.from(selectedValues);
  const isSelected = filterValues.length > 0;

  const toggleValue = () => {
    if (isSelected) {
      selectedValues.delete(null);
    } else {
      selectedValues.add(null);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  return (
    <Button
      variant="ghost"
      className="h-8 border-dashed border"
      onClick={toggleValue}
    >
      <Checkbox
        checked={isSelected}
        className="mr-2"
        onCheckedChange={toggleValue}
      />
      {title}
    </Button>
  );
}
