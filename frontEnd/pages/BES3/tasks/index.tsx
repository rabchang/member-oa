
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Link from "next/link";

function createData(
  id: string,
  applicant: string,
  startTime: string,
  type: string
) {
  return { id, applicant, startTime, type };
}

const rows = [
  createData("1", "tester 1", "2020-10-01 00:00", "Change Institution"),
  createData("2", "tester 2", "2020-10-02 02:00", "Join Institution"),
  createData("3", "tester 1", "2020-10-08 03:30", "Exit Institution"),
];

export default function Home({ func }) {
  const router = useRouter();
  return (
    <Container component="main" maxWidth="md">
      <h1>My Tasks Application Form Lists</h1>
      <div style={{ height: 300, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Applicant</TableCell>
                <TableCell align="right">Submission Time</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.applicant}</TableCell>
                  <TableCell align="right">{row.startTime}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    <Link href={"/BES3/formStatus/" + row.id}>
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
