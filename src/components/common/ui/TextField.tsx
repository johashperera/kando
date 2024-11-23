import { ReactNode } from "react";

type TextFieldProps = {
  type?: "text" | "password" | "email" | "number";
  addOn?: ReactNode;
  placeholder?: string;
};

const TextField = ({
  type = "text",
  addOn,
  placeholder = "",
}: TextFieldProps) => {
  return (
    <div
      className={`border border-dark-50 w-fit p-2 rounded-lg ${addOn && "flex items-center gap-2"}`}
    >
      {addOn ? <span>{addOn}</span> : null}
      <input
        type={type}
        className="border-none outline-none font-normal"
        placeholder={placeholder}
      />
    </div>
  );
};

export { TextField };
