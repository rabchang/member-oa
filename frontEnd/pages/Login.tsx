import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import { useEffect } from "react";

import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "../public/member_logo_darkmode.png";
import { useUser } from "../utils/useUser";

export default function Login({ func }) {
  const router = useRouter();
  const { user, data, error } = useUser({ redirectWhenLogout: false });

  // useEffect(() => {
  //   window.loginSuccess = () => {
  //     console.log("router.query.r", router.query.r)
  //     if (router.query.r) {
  //       router.push(router.query.r);
  //     } else {
  //       router.push("/");
  //     }
  //   };
  //   return () => {
  //     delete window.loginSuccess;
  //   };
  // });

  useEffect(() => {
    if (router.isReady && user) {
      router.push((router.query["r"] as string) || "/");
    }
  }, [user, router.isReady]);

  if (!data && !error) {
    return <h1>Loading......</h1>;
  }

  if (user) {
    return <h1>Redirecting......</h1>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          style={{ display: "flex", flexFlow: "column" }}
        >
          <Image
            src={logo}
            width="600px"
            height="480px"
            alt={"logo image"}
          ></Image>
          <div style={{ background: "white" }}></div>
          <ButtonGroup style={{ margin: "0 auto" }}>
            <Button
              onClick={() => {
                window.open(
                  "/api/oauth/login/ihep",
                  "_blank",
                  "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1024, height=768"
                );
              }}
            >
              Login With IHEP SSO
            </Button>

            <Button
              onClick={async () => {
                const res = await fetch("/api/oauth/forceLogin?username=ib");
                window.location.reload();
              }}
            >
              Login as IB
            </Button>
            <Button
              onClick={async () => {
                const res = await fetch(
                  "/api/oauth/forceLogin?username=ibchair"
                );
                window.location.reload();
              }}
            >
              Login as IB chair
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
}
Login.title = "Login";
