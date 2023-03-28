import { Select, MenuItem, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { fetcher, JSONResultWrapper } from "../utils/fetcher";

const SelectInst: FC<{value, onChange, style?}> = ({ value, onChange, style }) => {
  const { data, error } = useSWR<
    JSONResultWrapper<{ id: number; name: string }[]>
  >("/api/institutions", fetcher);
  const insts = data?.data;
  return (
    <Autocomplete
      style={style}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={insts || []}
      getOptionLabel={(x) => {
        return x.name;
      }}
      renderInput={(params) => <TextField {...params} label="Institution" />}
    />
  );
};

export { SelectInst };
