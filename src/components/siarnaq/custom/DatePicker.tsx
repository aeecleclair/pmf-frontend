"use client";

import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";
import * as React from "react";

import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date?: Date;
  defaultDate?: Date;
  fromDate?: Date;
  toDate?: Date;
  setDate: (date?: Date) => void;
  disabled?: boolean;
}

export function DatePicker({
  date,
  setDate,
  defaultDate,
  fromDate,
  toDate,
  disabled,
}: DatePickerProps) {
  const t = useTranslations("datePicker");
  const defaultToDate = new Date();
  defaultToDate.setFullYear(defaultToDate.getFullYear() + 10);
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          type="button"
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: fr })
          ) : (
            <span>{t("select")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          captionLayout="dropdown"
          fromDate={fromDate ?? new Date(1900)}
          toDate={toDate ?? defaultToDate}
          defaultMonth={defaultDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
