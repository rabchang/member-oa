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

const formDesign = {
  id: -1,
  title: "Join Inst Request",
  design: {
    version: 1,
    input: [
      // { key: "inst_id", label: "Inst.", type: "selectInst" },
      { key: "groupId", label: "Group", type: "selectGroup" },
      { key: "identity", label: "Identity", type: "selectIdentity" },
      { key: "worktype", label: "Work Type", type: "selectWorkType" },
      { key: "note", label: "Note", type: "textarea" },
      { key: "join_time", label: "Join Time", type: "date" },
      { key: "leave_time", label: "Leave Time", type: "date" },
    ],
  },
};

export default function Home({ func }) {
  const router = useRouter();
  const { user } = useUser();
  const { data: joinGroupReq, error } = useSWR<
    ApiWrapper<{
      createTime: string;
      groupId: number;
      groupName: string;
      ibId: number;
      ibName: string;
      id: number;
      identity: "User";
      joinTime: string;
      leaveTime: string;
      note: string;
      userId: 11;
      userName: string;
      status: string;
      worktype: string;
    }>
  >(
    router.isReady ? "/api/joinGroupRequest/" + router.query["id"] : null,
    fetcher
  );
  const [note, $note] = React.useState<string>("");
  if (error) return "error";
  if (!joinGroupReq) return "loading...";

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Container component="main">
          <div style={{ height: "20px" }}></div>
          <DynamicForm
            readOnly
            form={formDesign}
            formData={joinGroupReq.data}
          ></DynamicForm>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <h1>Audit Status</h1>
        <VerticalLinearStepper
          status={joinGroupReq.data.status}
          auditId={joinGroupReq.data.ibId}
          userId={joinGroupReq.data.userId}
        ></VerticalLinearStepper>
        {user.id === joinGroupReq.data.ibId ? (
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
                      `/api/joinGroupRequest/${joinGroupReq.data.id}/pass`,
                      {
                        method: "POST",
                      }
                    );
                    alert("saved");
                  } catch (error) {
                    alert("error");
                  }
                  router.push("/JoinGroupRequestList");
                }}
              >
                Approval
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  try {
                    await fetch(
                      `/api/joinGroupRequest/${joinGroupReq.data.id}/reject`,
                      {
                        method: "POST",
                      }
                    );
                    alert("saved");
                  } catch (error) {
                    alert("error");
                  }
                  router.push("/JoinGroupRequestList");
                }}
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
