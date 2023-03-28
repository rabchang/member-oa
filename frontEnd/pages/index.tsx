
import { useRouter } from "next/router";


import Box from "@mui/material/Box";
import { useState } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Grid,
  MobileStepper, Typography,
  useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../public/indexImg1.jpg";
import img2 from "../public/indexImg2.jpg";
import { useUser } from "../utils/useUser";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: img1,
  },
  {
    label: "Bird",
    imgPath: img2,
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Image src={images[activeStep].imgPath} alt={images[activeStep].label} />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default function Home({ func }) {
  const router = useRouter();
  const { user } = useUser({ redirectWhenLogout: false });
  const [model, $model] = useState(func);
  const [loading, $loading] = useState(false);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SwipeableTextMobileStepper />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Group
              </Typography>
              <Typography variant="h5" component="div">
                LHAASO
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                DaoCheng, SiChuan
              </Typography>
              <Typography variant="body2">
                Large High Altitude Air Shower Observatory
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/LHAASO">
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Group
              </Typography>
              <Typography variant="h5" component="div">
                JUNO
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                JiangMen, GuangZhou
              </Typography>
              <Typography variant="body2">
                Jiangmen Underground Neutrino Observatory
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/JUNO">
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Group
              </Typography>
              <Typography variant="h5" component="div">
                BES3
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Beijing
              </Typography>
              <Typography variant="body2">
                Beijing Spectrometer(BESIII) Experiments
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/BES3">
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        style={{
          display: "flex",
          flexFlow: "column",
          textAlign: "center",
        }}
      >
        {/* <Image src={logo} width="381px" height="320px"></Image> */}
        {user && (
          <ButtonGroup style={{ margin: "0 auto" }}>
            <Button
              onClick={async () => {
                window.localStorage.removeItem("jwt");
                try {
                  await fetch("/api/logout", {
                    redirect: "manual",
                  });
                } catch (error) {
                  console.error(error);
                }
                window.location.reload();
              }}
            >
              退出登录
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
}
Home.title = "Home"