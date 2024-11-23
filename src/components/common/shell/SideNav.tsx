import { Button } from "../ui/Button.tsx";
import {
  Diagram,
  Home2,
  LampCharge,
  NotificationBing,
  Setting2,
  TaskSquare,
} from "iconsax-react";

const SideNav = () => {
  return (
    <>
      <div className="p-4 flex items-center justify-start border-r border-dark-50">
        <span>
          <img src="logo.svg" alt="code-94-labs-logo" />
        </span>
        Code94 Labs
      </div>
      <div className="px-4 py-6 flex flex-col gap-4 h-[calc(100vh-72px)] border-t border-dark-50">
        <Button addOn={<Home2 size="16" />}>Home</Button>
        <Button variant="PRIMARY" addOn={<TaskSquare size="16" />}>
          Tasks
        </Button>
        <Button addOn={<Diagram size="16" />}>Report</Button>
        <Button addOn={<LampCharge size="16" />}>Insights</Button>
        <Button addOn={<NotificationBing size="16" />}>Inbox</Button>
        <Button addOn={<Setting2 size="16" />}>Settings</Button>
      </div>
    </>
  );
};

export { SideNav };
