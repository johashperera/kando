import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Assignee } from "@/api/models/tasks.model.ts";

type AssigneeSelectorProps = {
  children?: ReactNode;
  assignees?: Assignee[];
  selectedAssigneeId: string | null;
  onAssigneeChange: (assigneeId: string) => void;
};

const AssigneeSelector = ({
  children,
  assignees,
  selectedAssigneeId,
  onAssigneeChange,
}: AssigneeSelectorProps) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(selectedAssigneeId);
  }, [selectedAssigneeId]);

  const assignee = useMemo(() => {
    if (!assignees) return null;
    const assignee = assignees.filter(
      (assignee) => assignee.id === selectedAssigneeId,
    );
    if (assignee.length) {
      return assignee[0];
    } else {
      return null;
    }
  }, [selectedAssigneeId]);

  return (
    <Select
      value={value ?? undefined}
      onValueChange={(selectedValue) => {
        setValue(selectedValue);
        onAssigneeChange(selectedValue);
      }}
    >
      <SelectTrigger>
        <div>
          {!value ? (
            children
          ) : (
            <div>
              <img
                src={assignee?.profileImage}
                alt=""
                className="h-7 w-7 rounded-full"
              />
            </div>
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="z-[200]">
        {assignees &&
          assignees.map((assignee, index) => {
            return (
              <SelectItem key={index} value={assignee.id}>
                {assignee.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};

export { AssigneeSelector };
