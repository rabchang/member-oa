import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import FileSaver from "file-saver";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../../utils/fetcher";
import dayjs from "dayjs";
import { SelectInst } from "../../components/SelectInst";
import { useState } from "react";
import { CheckBox, Label } from "@mui/icons-material";
export default function Home({ func }) {
  const router = useRouter();
  // const [inst, $inst] = useState(-1);
  const [inst, $inst] = useState<{ id: number; name: string }>(null);
  const [workType, $workType] = useState<string>("*");
  const { data } = useSWR<
    ApiWrapper<
      {
        user_id: number;
        first_name: string;
        last_name: string;
        begin_time: string;
        end_time: string;
        username: string;
        identity: string;
        worktype: string;
      }[]
    >
  >(() => {
    const s = new URLSearchParams({ group_id: "1" });
    if (workType !== "*") s.set("worktype", workType);
    if (inst !== null) s.set("inst_id", "" + inst.id);
    return "/api/group-users-info?" + s;
  }, fetcher);

  const handleCSV = () => {
    if (!data) return;
    const keys = [
      "user_id",
      "username",
      "first_name",
      "last_name",
      "begin_time",
      "end_time",
      "identity",
      "worktype",
    ];
    const headString = keys.join(",");
    const rowsString = data.data.map((x) =>
      keys
        .map((y) => x[y])
        .map((y) => (y === undefined ? "" : y))
        .map((y) => (y === null ? "" : y))
        .map((y) => "" + y)
        .map((y) => (y.includes(",") ? '"' + y + '"' : y))
        .join(",")
    );
    const csvString = [headString, ...rowsString].join("\n");

    var file = new File(
      [csvString],
      `Users (${dayjs().format("YYYY-MM-DD")}).csv`,
      {
        type: "text/csv;charset=utf-8",
      }
    );
    FileSaver.saveAs(file);
  };
  return (
    <Container component="main">
      <h1>BES3 Users</h1>
      <div style={{ margin: "8px 0" }}>
        <div>Institution: {inst ? inst.name : "(any)"}</div>
        <div style={{ display: "flex" }}>
          {/* <Button
            onClick={(ev) => {
              $inst(null);
            }}
          >
            Cancel inst. Filtering
          </Button> */}
          <SelectInst
            value={inst}
            onChange={$inst}
            style={{ flexGrow: 1 }}
          ></SelectInst>
        </div>
      </div>
      <div style={{ margin: "8px 0" }}>
        Work Type:
        <RadioGroup
          row
          value={workType}
          onChange={(ev) => $workType(ev.target.value)}
        >
          <FormControlLabel value="*" control={<Radio />} label="(Any)" />
          <FormControlLabel value="Author" control={<Radio />} label="Author" />
          <FormControlLabel
            value="Shifter"
            control={<Radio />}
            label="Shifter"
          />
        </RadioGroup>
      </div>
      <div style={{ margin: "8px 0" }}>
        <Button variant="contained" onClick={handleCSV}>
          Download CSV
        </Button>
      </div>
      <div style={{ width: "100%" }}>
        {data ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Begin Time</TableCell>
                  <TableCell align="right">End Time</TableCell>
                  <TableCell align="right">Identity</TableCell>
                  <TableCell align="right">WorkType</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((row) => (
                  <TableRow
                    key={row.user_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="right">{row.user_id}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.first_name}</TableCell>
                    <TableCell align="right">{row.last_name}</TableCell>
                    <TableCell align="right">
                      {row.begin_time.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">
                      {row.end_time.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">{row.identity}</TableCell>
                    <TableCell align="right">
                      {row.worktype || "pending"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress />
        )}
      </div>
    </Container>
  );
}
