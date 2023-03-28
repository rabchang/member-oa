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
import dayjs from "dayjs";
import { ApiWrapper, fetcher } from "../../utils/fetcher";

("institution-detail");
export default function Home({ func }) {
  const router = useRouter();
  const { data } = useSWR<
    ApiWrapper<{
      institution_id: number;
      abbreviation_name: string;
      full_name: string;
      address1: string;
      address2: string;
      address3: string;
      address4: string;
      address5: string;
      description: string;
      continent: string;
      contact_person_id: number;
      country: string;
      join_date: string;
      leave_date: string;
    }>
  >(router.query["id"] && "/api/institution/" + router.query["id"], fetcher);

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
              {data?.data &&
                Object.entries(data.data).map(([key, value]) => (
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
Home.title = "Institution Details";
