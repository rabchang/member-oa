import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../../../../utils/useUser";

import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Stack from "@mui/system/Stack";
import * as React from "react";

const steps = [
  {
    label: "Submit Form",
    description: `User submit form.`,
  },
  {
    label: "Auditor Auditing", // Assembler Assemble!
    description:
      "An Auditor check form content and decide whether the form should be permitted or not.",
  },
  {
    label: "Successfully change institution",
    description: `Form is audited and the system automatically change your institution.`,
  },
];

function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
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

export default function Home({ func }) {
  const router = useRouter();
  const { user } = useUser();
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
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Container component="main">
          <div style={{ height: "20px" }}></div>
          <div style={{ fontSize: "32px" }}>Change Institution</div>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridGap: "8px 16px",
              textAlign: "right",
              lineHeight: "56px",
              fontWeight: "800",
            }}
          >
            <label htmlFor="email">Email</label>
            <TextField
              disabled
              id="email"
              label="邮箱"
              defaultValue="Default Value"
              value={user?.email || ""}
              variant="filled"
            />
            <label htmlFor="oInst">Original Inst.</label>
            <Controller
              name="oInst"
              control={control}
              render={({ field }) => <TextField {...field} />}
            />
            <label htmlFor="nInst">New Inst.</label>
            <Controller
              name="nInst"
              control={control}
              render={({ field }) => <TextField {...field} />}
            />
            <label htmlFor="oInstAuditor">Old Inst. Auditor</label>
            <Controller
              name="oInstAuditor"
              control={control}
              render={({ field }) => <TextField {...field} />}
            />
            <label htmlFor="nInstAuditor">New Inst. Auditor</label>
            <Controller
              name="nInstAuditor"
              control={control}
              render={({ field }) => <TextField {...field} />}
            />
            <label htmlFor="planDate">Plan Time</label>
            <Controller
              name="planDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Plan Date"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              )}
            />
            <label htmlFor="note">Note</label>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField {...field} multiline minRows={3} />
              )}
            />
          </Box>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <h1>Audit Status</h1>
        <VerticalLinearStepper></VerticalLinearStepper>
        <h2>
          <label htmlFor="auditNote">AuditNote</label>
        </h2>
        <Controller
          name="auditNote"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              minRows={3}
              style={{ width: "100%" }}
            />
          )}
        />
        <Stack direction="row" spacing={2} style={{ marginTop: "8px" }}>
          <Button variant="contained" color="success">
            Approval
          </Button>
          <Button variant="contained" color="error">
            Rejection
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
