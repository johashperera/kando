import { TextField } from "../ui/TextField.tsx";
import { SearchNormal1 } from "iconsax-react";

const TopNav = () => {
  return (
    <>
      <div className="p-4">
        <TextField
          placeholder="Search tasks"
          addOn={<SearchNormal1 size="16" />}
        />
      </div>
    </>
  );
};

export { TopNav };
