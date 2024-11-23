import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ReactNode, useEffect, useState } from "react";
import { TaskPriority } from "@/api/models/tasks.model.ts";

type PrioritySelectorProps = {
  children?: ReactNode;
  priority?: TaskPriority;
  onPriorityChange: (priority: TaskPriority) => void;
};

const PrioritySelector = ({
  children,
  priority,
  onPriorityChange,
}: PrioritySelectorProps) => {
  const [value, setValue] = useState<string>();

  const priorityLevelClasses: Record<string, string> = {
    Low: "bg-success-50 text-success-500",
    Medium: "bg-warning-50 text-warning-500",
    High: "bg-danger-50 text-danger-500",
  };

  useEffect(() => {
    setValue(priority);
  }, [priority]);

  return (
    <Select
      value={value}
      onValueChange={(selectedValue) => {
        setValue(selectedValue);
        onPriorityChange(selectedValue as TaskPriority);
      }}
    >
      <SelectTrigger>
        <div>
          {!value ? (
            children
          ) : (
            <div
              className={
                "font-semibold text-xs p-1 border-none rounded " +
                priorityLevelClasses[value]
              }
            >
              <p>
                <span>&#x2022;</span> {value}
              </p>
            </div>
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="z-[200]">
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
      </SelectContent>
    </Select>
  );
};

export { PrioritySelector };
