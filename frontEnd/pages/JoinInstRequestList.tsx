import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import {
  Alert,
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
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useAlternativeUI } from "../components/useAlternativeUI";
import { JSONResultWrapper } from "../utils/fetcher";
import { isoTime2ChinaDate } from "../utils/isoTime2chinaDate";
import { useUser } from "../utils/useUser";

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
  const { data: user } = useUser();
  const { data, alternativeUI, mutate } = useAlternativeUI<
    JSONResultWrapper<FormRow[]>
  >(`/api/joinInstRequest?status=${status}`);
  const [successMsg, $successMsg] = useState("");
  return (
    <Container component="main" maxWidth="md">
      <h1>User Join Inst. Requests</h1>
      {successMsg && <Alert severity="success">{successMsg}</Alert>}
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
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Applicant</TableCell>
                  <TableCell align="right">Inst. Name</TableCell>
                  <TableCell align="right">Submission Time</TableCell>
                  <TableCell align="right">Note</TableCell>
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
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.userStatus}</TableCell>
                    <TableCell align="right">{row.userName}</TableCell>
                    <TableCell align="right">{row.instName}</TableCell>
                    <TableCell align="right">
                      {isoTime2ChinaDate(row.createTime)}
                    </TableCell>
                    <TableCell align="right">{row.note}</TableCell>
                    <TableCell align="right">
                      {row.userId === user?.data?.id ? (
                        "No operation"
                      ) : (
                        <div>
                          <Link href={"/form-progress-join-inst?id=" + row.id}>
                            <Button>Detail</Button>
                          </Link>
                          <Button
                            onClick={async () => {
                              await fetch(
                                `/api/joinInstRequest/${row.id}/pass`,
                                {
                                  method: "POST",
                                }
                              );
                              mutate();
                              $successMsg(
                                `Successfully passed Join Inst. Request from ${row.userName}. `
                              );
                            }}
                          >
                            Pass
                          </Button>
                          <Button
                            color="error"
                            onClick={async () => {
                              await fetch(
                                `/api/joinInstRequest/${row.id}/reject`,
                                {
                                  method: "POST",
                                }
                              );
                              mutate();
                              alert("rejected");
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {data?.data.length === 0 && (
          <div>
            There is no join institution request. Click{" "}
            <Link href="/SignupJoinInst">
              <Button>here </Button>
            </Link>
            to join institution and group now.
          </div>
        )}
      </div>
    </Container>
  );
}

Home.title = "Join Inst. Request List";
