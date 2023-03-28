
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../../utils/useUser";

export default function ChangeInstitution({ func }) {
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
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    router.push("/FormResult");
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={{ height: "20px" }}></div>
      <div style={{ fontSize: "32px" }}>Join BES3</div>
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
        <label htmlFor="nInst"> Institution</label>
        <Controller
          name="nInst"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
        <label htmlFor="oInstAuditor"> Auditor</label>
        <Controller
          name="oInstAuditor"
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
          render={({ field }) => <TextField {...field} multiline minRows={3} />}
        />
        <div></div>
        <Button type="submit" variant="contained">
          确定
        </Button>
      </Box>
    </Container>
  );
}
