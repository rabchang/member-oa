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
  TableRow,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, JSONResultWrapper } from "../../../utils/fetcher";

class FormRow {
  id: number;
  applicantId: number;
  submissionTime: string;
  title: string;
}

export default function PersonalInfo({ func }) {
  const router = useRouter();
  const { data, error } = useSWR<JSONResultWrapper<FormRow[]>>(
    "/api/myApplications",
    fetcher
  );
  if (error) return "error";
  if (!data) return "loading...";

  return (
    <Container component="main" maxWidth="md">
      <h1>My Application Form</h1>
      <div style={{ width: "100%" }}>
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
              {data.data.map((row) => {
                let detailLink = "/FormProgress?id=" + row.id;
                if (row.title === "Edit Foot Note")
                  detailLink = "/form-progress-footnote?id="+ row.id;
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.applicantId}</TableCell>
                    <TableCell align="right">{row.submissionTime}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      {}
                      <Link href={detailLink}>
                        <Button>Detail</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
