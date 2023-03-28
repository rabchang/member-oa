import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";

import MapsHomeWorkTwoToneIcon from "@mui/icons-material/MapsHomeWorkTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import { useEffect } from "react";
import useSWR from "swr";
import { TinyLineChartPlaceHolder } from "../../components/PlaceHolderChart";
import { fetcher, JSONResultWrapper } from "../../utils/fetcher";
import { useUser } from "../../utils/useUser";

import {
  Alert,
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
import { useState } from "react";
import { useAlternativeUI } from "../../components/useAlternativeUI";

class UserInGroup {
  userId: number;
  userName: string;
  beginTime: string;
  endTime: string;
  identity: string;
  worktype: string;
}

function PeopleTable({}) {
  const router = useRouter();
  const { data, alternativeUI, mutate } = useAlternativeUI<
    JSONResultWrapper<UserInGroup[]>
  >(`/api/groups/show-last-month-join?group_id=2`);
  return (
    <Container component="main" maxWidth="md">
      <h2>New Members</h2>
      <div style={{ height: 300, width: "100%" }}>
        {alternativeUI || (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">User Name</TableCell>
                  <TableCell align="right">Leave Time</TableCell>
                  <TableCell align="right">End Time</TableCell>
                  <TableCell align="right">Identity</TableCell>
                  <TableCell align="right">WorkType</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row: UserInGroup) => (
                  <TableRow
                    key={row.userId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="right">{row.userId}</TableCell>
                    <TableCell align="right">{row.userName}</TableCell>
                    <TableCell align="right">
                      {row.beginTime.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">
                      {row.endTime.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">{row.identity}</TableCell>
                    <TableCell align="right">
                      {row.worktype || "pending"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "16px" }}
            >
              {data.data.length === 0 &&
                "There is no group joining in the past month."}
            </div>
          </TableContainer>
        )}
      </div>
    </Container>
  );
}

function PeopleTableExit({}) {
  const router = useRouter();
  const { data, alternativeUI, mutate } = useAlternativeUI<
    JSONResultWrapper<UserInGroup[]>
  >(`/api/groups/show-last-month-exit?group_id=2`);
  return (
    <Container component="main" maxWidth="md">
      <h2>Leaving Members</h2>
      <div style={{ height: 300, width: "100%" }}>
        {alternativeUI || (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">User Name</TableCell>
                  <TableCell align="right">Leave Time</TableCell>
                  <TableCell align="right">End Time</TableCell>
                  <TableCell align="right">Identity</TableCell>
                  <TableCell align="right">WorkType</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row: UserInGroup) => (
                  <TableRow
                    key={row.userId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="right">{row.userId}</TableCell>
                    <TableCell align="right">{row.userName}</TableCell>
                    <TableCell align="right">
                      {row.beginTime.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">
                      {row.endTime.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">{row.identity}</TableCell>
                    <TableCell align="right">
                      {row.worktype || "pending"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "16px" }}
            >
              {data.data.length === 0 &&
                "There is no group leaving in the past month."}
            </div>
          </TableContainer>
        )}
      </div>
    </Container>
  );
}

const dashBoardData = [
  { icon: PeopleAltTwoToneIcon, name: "people", value: 239 },
  { icon: MapsHomeWorkTwoToneIcon, name: "institutions", value: 40 },
  // { icon: PublicTwoToneIcon, name: "counties", value: 37 },
];

const featuredData = [
  { name: "Authors List", href: "#", description: "120 authors" },
  { name: "Funds List", href: "#", description: "40 funds" },
];

export default function Home({ func }) {
  const router = useRouter();
  const theme = useTheme();
  const { data, error } = useSWR<JSONResultWrapper<{ groupName: string }[]>>(
    "/api/my/groups",
    fetcher
  );

  useEffect(() => {
    if (error) {
      router.push("/403");
      return;
    }
    if (data) {
      // loaded
      if (!data.data.find((x) => x.groupName === "LHAASO")) {
        router.push("/403");
      }
    }
  }, [data]);

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2}>
        {dashBoardData.map((row, i) => {
          const Icon = row.icon;
          return (
            <Grid item xs={4} key={i}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Icon
                    style={{
                      width: 100,
                      height: 100,
                      color: theme.palette.primary.dark,

                      float: "left",
                      marginRight: "16px",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: "32px",
                      color: "white",
                      WebkitTextStroke: "1px black",
                      textShadow: "2px 2px black",
                    }}
                  >
                    {row.value}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    {row.name}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <h2>Popular Functions</h2>
      <Grid container spacing={2}>
        {featuredData.map((row, i) => {
          return (
            <Grid item xs={4} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <Link href={row.href}>
                  <CardActionArea>
                    {/* <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                      /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Card sx={{ margin: "16px 0" }}>
        <PeopleTable></PeopleTable>
      </Card>
      <Card sx={{ margin: "16px 0" }}>
        <PeopleTableExit></PeopleTableExit>
      </Card>
      {/* <h2>Graphs</h2>
      <Card style={{ width: "100%", height: "300px" }}>
        <CardContent>
          <div style={{ display: "flex", width: "100%" }}>
            <div>
              <div style={{ fontWeight: 900 }}>Total Form Handled</div>
              <div style={{}}>33</div>
            </div>
            <div style={{ flexGrow: "1" }}></div>
            <Button variant="contained">Show All Form</Button>
          </div>
          <div style={{ width: "100%", height: "250px" }}>
            <TinyLineChartPlaceHolder />
          </div>
        </CardContent>
      </Card> */}
    </Container>
  );
}
Home.title = "LHAASO Home";
