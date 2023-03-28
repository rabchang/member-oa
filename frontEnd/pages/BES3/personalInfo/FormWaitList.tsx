import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useAlternativeUI } from "../../../components/useAlternativeUI";
import { JSONResultWrapper } from "../../../utils/fetcher";
import { isoTime2ChinaDate } from "../../../utils/isoTime2chinaDate";

class FormRow {
  id: number;
  applicationId: number;
  status: "pass" | "pending" | "reject";
  applicantName: string;
  submissionTime: string;
  title: string;
}

export default function Home({ func }) {
  const router = useRouter();
  const [status, $status] = useState("pending");
  const { data, alternativeUI } = useAlternativeUI<
    JSONResultWrapper<FormRow[]>
  >(`/api/audit?forMe=true&status=${status}`);
  return (
    <Container component="main" maxWidth="md">
      <h1>Form Waiting for Audit</h1>

      <RadioGroup
        row
        defaultValue={"pending"}
        value={status}
        onChange={(ev) => $status(ev.target.value)}
      >
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
        <FormControlLabel value="pass" control={<Radio />} label="Approved" />
        <FormControlLabel value="reject" control={<Radio />} label="Rejected" />
      </RadioGroup>
      <div style={{ height: 300, width: "100%" }}>
        {alternativeUI || (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Application Id</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Applicant</TableCell>
                  <TableCell align="right">Submission Time</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="right">{row.applicationId}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.applicantName}</TableCell>
                    <TableCell align="right">
                      {isoTime2ChinaDate(row.submissionTime)}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      <Link href={"/FormProgress?id=" + row.applicationId}>
                        <Button>Detail</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Container>
  );
}
