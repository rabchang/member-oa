import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Stack from "@mui/system/Stack";
import * as React from "react";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../utils/fetcher";
import { isoTime2ChinaDate } from "../utils/isoTime2chinaDate";
import { useUser } from "../utils/useUser";
import { DynamicForm } from "../components/DynamicForm";
import { FootnoteEditor } from "./footnote";
import { checkAndAlert } from "../components/checkAndAlert";
import axios from "axios";

function VerticalLinearStepper({ status, auditId, userId }) {
  const [activeStep, setActiveStep] = React.useState(
    status === "pending" ? 1 : 2
  );
  const { data: api1 } = useSWR<
    ApiWrapper<{
      userName: string;
    }>
  >("/api/show-user-name?user_id=" + userId, fetcher);
  const { data: api2 } = useSWR<
    ApiWrapper<{
      userName: string;
    }>
  >("/api/show-user-name?user_id=" + auditId, fetcher);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            {api1?.data.userName || "User#" + userId} Submit Form
          </StepLabel>
        </Step>
        <Step>
          <StepLabel error={status === "reject"} optional={status}>
            {api2?.data.userName || "Auditor#" + userId} Auditing
          </StepLabel>
        </Step>
        <Step>
          <StepLabel error={false} optional={"Successfully change institution"}>
            {`Form is audited and saving to database.`}
          </StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}

export default function Home({}) {
  const router = useRouter();
  const { user } = useUser();
  const { data: formReq, error } = useSWR<
    ApiWrapper<{
      applicantId: number;
      audits: { id: number; status: string; auditor_id: number }[];
      formData: {
        foot_note: string;
        also_at: string;
        note: string;
        auditor1: number;
      };
    }>
  >(
    router.isReady
      ? "/api/application/" +
          router.query["id"] +
          "?joinAudit=true&joinForm=true"
      : null,
    fetcher
  );
  const [note, $note] = React.useState<string>("");
  if (error) return "error";
  if (!formReq) return "loading...";

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Container component="main">
          <div style={{ height: "20px" }}></div>
          <FootnoteEditor
            readOnly
            value={formReq?.data.formData}
          ></FootnoteEditor>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <h1>Audit Status</h1>
        <VerticalLinearStepper
          status={formReq.data.audits[0].status}
          auditId={formReq.data.audits[0].auditor_id}
          userId={formReq.data.applicantId}
        ></VerticalLinearStepper>
        {user.id === formReq.data.audits[0].auditor_id ? (
          <div>
            <h2>
              <label htmlFor="auditNote">AuditNote</label>
            </h2>
            {/* <TextField
              value={note}
              onChange={(ev) => $note(ev.target.value)}
              multiline
              minRows={3}
              style={{ width: "100%" }}
            /> */}
            <Stack direction="row" spacing={2} style={{ marginTop: "8px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={async () => {
                  try {
                    await fetch(
                      `/api/audit/${formReq.data.id}/pass`,
                      {
                        method: "POST",
                      }
                    );
                    alert("succeeded");
                  } catch (error) {
                    alert("error");
                  }
                  router.push("/BES3/personalInfo");
                }}
              >
                Approval
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={{async () => {
                  try {
                    await fetch(
                      `/api/audit/${formReq.data.id}/pass`,
                      {
                        method: "POST",
                      }
                    );
                    alert("succeeded");
                  } catch (error) {
                    alert("error");
                  }
                  router.push("/BES3/personalInfo");
                }f}
              >
                Rejection
              </Button>
            </Stack>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
}
Home.title = "Join Group Request";
