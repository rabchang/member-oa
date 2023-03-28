import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ChangeInstitutionResult({ func }) {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      department: 0,
      group: 0,
      oInst: 0,
      nInst: 0,
      oInstAuditor: 0,
      nInstAuditor: 0,
      planDate: new Date(),
      Note: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="md">
      <Stack
        style={{
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "32px",
        }}
        spacing={4}
      >
        <CheckCircleIcon
          style={{
            width: "200px",
            height: "200px",
            color: "green",
          }}
        ></CheckCircleIcon>
        <div>
          Your form has been successfully submitted.
          <br />
        </div>
        <div style={{ fontSize: "24px" }}>
          Click on <Link href="/BES3/personalInfo">My Form</Link> to view the
          details.
        </div>
      </Stack>
    </Container>
  );
}
