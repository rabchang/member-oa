import { Select, MenuItem } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const SelectGroup = ({ value, onChange, disabled }) => {
  const { data, error } = useSWR<any>("/api/groups", fetcher);
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ textAlign: "left" }}
      disabled={disabled}
    >
      {data?.data?.map(({ id, group_name }) => {
        return (
          <MenuItem key={id} value={id}>
            {group_name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export { SelectGroup };
