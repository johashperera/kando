import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";

type ConfirmationDialogProps = {
  children: ReactNode;
  title?: string;
  body?: string;
  confirmationActionText?: string;
  rejectionActionText?: string;
  confirm?: () => void;
  reject?: () => void;
};

const ConfirmationDialog = ({
  children,
  title,
  body,
  confirm,
  reject,
  rejectionActionText,
  confirmationActionText,
}: ConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{body}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2"></div>
        <DialogFooter className="sm:end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={reject}>
              {rejectionActionText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={confirm}>
              {confirmationActionText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmationDialog };
