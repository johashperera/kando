import { ReactNode } from "react";
import { SideNav } from "./SideNav.tsx";
import { TopNav } from "./TopNav.tsx";

type LayoutProps = {
  children: ReactNode;
};

const Shell = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <div className="w-1/5 h-dvh">
        <SideNav />
      </div>
      <div className="w-full">
        <TopNav />
        <div className="bg-bgWhite h-[calc(100vh-72px)]">{children}</div>
      </div>
    </div>
  );
};

export default Shell;
