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
import { fetcher } from "../utils/fetcher";
import { isoTime2ChinaDate } from "../utils/isoTime2chinaDate";
import { useUser } from "../utils/useUser";
import { DynamicForm } from "../components/DynamicForm";
import axios from "axios";

class FormAudit {
  id: number;
  status: "pending" | "pass" | "reject";
  note: string;
  auditor_id: number;
  application_id: number;
  auditor_order: number;
  submission_time: string;
}

const steps = (
  audits: FormAudit[],
  auditorNameMap: { [key: string]: string }
) => {
  const ret = [
    ...audits.map((audit) => {
      console.log(audit);
      return {
        error: audit.status === "reject",
        label: `Auditor ${auditorNameMap[audit.auditor_id]}(${
          audit.auditor_id
        }) Auditing`,
        description: audit.note ? (
          <div>
            <div>{"note:" + audit.note}</div>
            <div>{"time: " + isoTime2ChinaDate(audit.submission_time)}</div>
          </div>
        ) : (
          "pending"
        ),
      };
    }),
    {
      error: false,
      label: "Successfully change institution",
      description: `Form is audited and the systemchange your institution.`,
    },
  ];
  return ret;
};

function VerticalLinearStepper({ audits, auditorNameMap }) {
  const [activeStep, setActiveStep] = React.useState(
    currentAudit(audits)
      ? currentAudit(audits).auditor_order
      : audits.length + 1
  );
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Submit Form</StepLabel>
        </Step>
        {steps(audits, auditorNameMap).map((step, index) => (
          <Step key={step.label}>
            <StepLabel error={step.error} optional={step.description}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const rows: any = [
  {
    id: 1,
    initiator: "test",
    startTime: "2020-10-01 00:00",
    type: "Change Institution",
  },
  {
    id: 2,
    initiator: "test",
    startTime: "2020-10-02 02:30",
    type: "Join Institution",
  },
  {
    id: 3,
    initiator: "test",
    startTime: "2020-10-03 02:22",
    type: "Exit Institution",
  },
];

const columns: any[] = [
  { field: "id", headerName: "Form Id", width: 150 },
  { field: "initiator", headerName: "Initiator", width: 150 },
  { field: "startTime", headerName: "Start time", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
];

const currentAudit = (audits: FormAudit[]) => {
  return audits.find((x) => x.status === "pending");
};
const currentAuditorId = (audits: FormAudit[]) => {
  return currentAudit(audits)?.auditor_id;
};

export default function Home({ func }) {
  const router = useRouter();
  const { user } = useUser();
  // TODO fix type here
  const { data, error } = useSWR<any>(
    router.isReady
      ? "/api/application/" +
          router.query["id"] +
          "?joinAudit=true&joinForm=true"
      : null,
    fetcher
  );
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      department: 0,
      group: 0,
      oInst: 0,
      nInst: 0,
      oInstAuditor: 0,
      nInstAuditor: 0,
      planDate: new Date(),
      note: "",
      auditNote: "",
    },
  });
  const [note, $note] = React.useState<string>("");
  if (error) return "error";
  if (!data) return "loading...";
  console.log(user.id, currentAuditorId(data.data.audits));
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Container component="main">
          <div style={{ height: "20px" }}></div>
          <DynamicForm
            readOnly
            form={data.data.form}
            formData={data.data.formData}
          ></DynamicForm>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <h1>Audit Status</h1>
        <VerticalLinearStepper
          audits={data.data.audits}
          auditorNameMap={data.data.auditorNameMap}
        ></VerticalLinearStepper>
        {user.id === currentAuditorId(data.data.audits) ? (
          <div>
            <h2>
              <label htmlFor="auditNote">AuditNote</label>
            </h2>
            <TextField
              value={note}
              onChange={(ev) => $note(ev.target.value)}
              multiline
              minRows={3}
              style={{ width: "100%" }}
            />
            <Stack direction="row" spacing={2} style={{ marginTop: "8px" }}>
              <Button
                variant="contained"
                color="success"
                onClick={async () => {
                  await axios
                    .post(
                      "/api/audit/" +
                        data.data.audits[0].id +
                        "?" +
                        new URLSearchParams({
                          status: "pass",
                          note: "",
                        })
                    )
                    .catch((e) => {
                      console.error(e);
                      alert("network error");
                    });
                  router.push("/BES3/personalInfo/FormWaitList");
                }}
              >
                Approval
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await axios
                    .post(
                      "/api/audit/" +
                        data.data.audits[0].id +
                        "?" +
                        new URLSearchParams({
                          status: "reject",
                          note: "",
                        })
                    )
                    .catch((e) => {
                      console.error(e);
                      alert("network error");
                    });
                  router.push("/BES3/personalInfo/FormWaitList");
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
