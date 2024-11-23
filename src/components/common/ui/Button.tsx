import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  addOn?: ReactNode;
  variant?: "PRIMARY" | "SECONDARY" | "DEFAULT";
  centered?: boolean;
  width?: number;
};

const Button = ({
  children,
  variant = "DEFAULT",
  addOn,
  centered,
  width,
}: ButtonProps) => {
  const variantClasses: Record<string, string> = {
    PRIMARY: "bg-primary-500 text-white",
    SECONDARY: "bg-gray-500 text-white hover:bg-gray-600",
    DEFAULT: "bg-bgWhite text-dark-500",
  };
  return (
    <button
      className={`w-${width ? `[${width}px]` : "full"} p-3 rounded-lg ${variantClasses[variant]} ${addOn ? "flex items-center gap-2" : ""} ${centered ? "justify-center" : "justify-start"}`}
    >
      {addOn ? <span>{addOn}</span> : null}
      {children}
    </button>
  );
};

export { Button };
