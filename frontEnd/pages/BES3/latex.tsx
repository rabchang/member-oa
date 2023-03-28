import { Button, TextField } from "@mui/material";
import axios from "axios";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import useSWR from "swr";

const Page = () => {
  const { data, error } = useSWR("/latex.txt", (url) =>
    axios.get(url).then((x) => x.data)
  );

  const handleCSV = () => {
    if (!data) return;

    var file = new File(
      [data],
      `Authors (${dayjs().format("YYYY-MM-DD")}).tex`,
      {
        type: "text/plain;charset=utf-8",
      }
    );
    FileSaver.saveAs(file);
  };
  return (
    <div>
      <h1>Export Latex</h1>
      <div>
        <Button onClick={handleCSV}>download</Button>
        <Button onClick={() => {copy(data); alert("copied")}}>copy</Button>
      </div>
      <div>Preview: </div>
      <TextField value={data || ""} multiline fullWidth></TextField>
    </div>
  );
};
Page.title = "Export Authors";
export { Page as default };
