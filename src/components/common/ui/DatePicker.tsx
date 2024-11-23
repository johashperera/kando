import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";

type DatePickerProps = {
  children?: ReactNode;
  selectedDate: string | null;
  onDateChange: (date: string | null) => void;
};

const DatePicker = ({
  children,
  selectedDate,
  onDateChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (selectedDate) {
      setDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const onChange = (date?: Date) => {
    setDate(date);
    onDateChange(date ? date.toDateString() : null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          {!date ? (
            children
          ) : (
            <div>
              <span className="p-1 text-xs font-semibold text-primary-500 bg-primary-50 rounded">
                {format(date, "MMM d")}
              </span>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[200]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
