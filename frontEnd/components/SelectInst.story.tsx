import { useState } from "react";
import { SelectInst } from "./SelectInst";

const Page = () => {
  const [inst, $inst] = useState<{ id: number; name: string }>(null);
  return (
    <div>
      <div>{inst === null ? "null" : "data"}</div>
      <div>{inst?.id}</div>
      <div>{inst?.name}</div>
      <SelectInst value={inst} onChange={$inst}></SelectInst>
    </div>
  );
};

export { Page as default };
