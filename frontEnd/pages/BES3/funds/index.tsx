import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import FileSaver from "file-saver";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../../../utils/fetcher";
import dayjs from "dayjs";
export default function Home({ func }) {
  const router = useRouter();
  const { data } = useSWR<
    ApiWrapper<
      {
        contract_level: number;
        contract_no: string;
        create_time: string;
        creator_id: number;
        description: string;
        end_time: string;
        fund_source: string;
        id: number;
        institution_id: number;
        source_level: number;
        start_time: string;
      }[]
    >
  >("/api/funds?group_id=1", fetcher);

  const handleCSV = () => {
    if (!data) return;
    const keys = [
      `id`,
      `institution_id`,
      `fund_source`,
      `contract_no`,
      `source_level`,
      `contract_level`,
      `start_time`,
      `end_time`,
      `description`,
      `creator_id`,
      `create_time`,
      `group_id`,
    ];
    const headString = keys.join(",");
    const rowsString = data.data.map((x) =>
      keys
        .map((y) => x[y])
        .map((y) => y === undefined ? "": y)
        .map((y) => "" + y)
        .map((y) => (y.includes(",") ? '"' + y + '"' : y))
        .join(",")
    );
    const csvString = [headString, ...rowsString].join("\n");

    var file = new File(
      [csvString],
      `Funds (${dayjs().format("YYYY-MM-DD")}).csv`,
      {
        type: "text/csv;charset=utf-8",
      }
    );
    FileSaver.saveAs(file);
  };
  return (
    <Container component="main" maxWidth="md">
      <h1>BES3 Funds</h1>
      <p>
        <Button variant="contained" onClick={handleCSV}>
          Download CSV
        </Button>
      </p>
      <div style={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left" style={{ width: "300px" }}>
                  Description
                </TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right">
                    {dayjs(row.start_time).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={"/BES3/funds/fund-detail?id=" + row.id}>
                      <Button>Detail</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
