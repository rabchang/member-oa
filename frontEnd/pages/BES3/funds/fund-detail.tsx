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
    ApiWrapper<{
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
    }>
  >(router.query["id"] && "/api/funds/" + router.query["id"], fetcher);

  return (
    <Container component="main" maxWidth="md">
      <h1>BES3 Funds Detail</h1>
      <p></p>
      <div style={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell>key</TableCell>
                <TableCell>value</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {data?.data[0] &&
                Object.entries(data.data[0]).map(([key, value]) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="left">{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
