
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../../../utils/useUser";

export default function ChangeInstitution({ func }) {
  const router = useRouter();

  const { user } = useUser();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      department: 0,
      group: 0,
      oInst: "0",
      nInst: "0",
      oInstAuditor: "0",
      nInstAuditor: "0",
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

        <label htmlFor="oInst">Original Institution</label>
        <Controller
          name="oInst"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="oInst"
              id="oInst"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"0"}>IHEP</MenuItem>
              <MenuItem value={"1"}>LZU</MenuItem>
              <MenuItem value={"2"}>PKU</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="nInst">New Institution</label>
        <Controller
          name="nInst"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="nInst"
              id="nInst"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"0"}>IHEP</MenuItem>
              <MenuItem value={"1"}>LZU</MenuItem>
              <MenuItem value={"2"}>PKU</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="oInstAuditor">Original Institution Auditor</label>
        <Controller
          name="oInstAuditor"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="oInstAuditor"
              id="oInstAuditor"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"0"}>Mali Chen, IHEP</MenuItem>
              <MenuItem value={"1"}>HC Zhang, LZU</MenuItem>
              <MenuItem value={"2"}>Albert Wang, PKU</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="nInstAuditor">New Institution Auditor</label>
        <Controller
          name="nInstAuditor"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="nInstAuditor"
              id="nInstAuditor"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"0"}>Mali Chen, IHEP</MenuItem>
              <MenuItem value={"1"}>HC Zhang, LZU</MenuItem>
              <MenuItem value={"2"}>Albert Wang, PKU</MenuItem>
            </Select>
          )}
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
