import {
  Badge,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { Left } from "../components/Left";
import MapsHomeWorkTwoToneIcon from "@mui/icons-material/MapsHomeWorkTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import Link from "next/link";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../utils/fetcher";
import MailIcon from "@mui/icons-material/Mail";

const contents = [
  {
    icon: MapsHomeWorkTwoToneIcon,
    name: "Join Group Request",
    href: "/JoinGroupRequestList",
    key: "join_group_request",
  },
  {
    icon: PeopleAltTwoToneIcon,
    name: "Join Inst Request",
    href: "/JoinInstRequestList",
    key: "join_inst_request",
  },
  {
    icon: PublicTwoToneIcon,
    name: "Generic Request",
    href: "/BES3/personalInfo/FormWaitList",
    key: "generic_request",
  },
];

export default function Home({ func }) {
  const router = useRouter();
  const theme = useTheme();
  const { data: counts } = useSWR<
    ApiWrapper<{
      join_group_request: number;
      join_inst_request: number;
      generic_request: number;
    }>
  >("/api/audit-hall-prompt-count", fetcher);
  return (
    <Container component="main">
      <h1>Audit hall</h1>
      <Grid container>
        {contents.map((x) => {
          const Icon = x.icon;
          return (
            <Link key={x.key} href={x.href}>
              <Grid item xs={3} style={{ margin: "10px", cursor: "pointer" }}>
                <Card
                  sx={{
                    minWidth: 275,
                  }}
                >
                  <CardContent
                    sx={{
                      fontSize: "20px",
                      display: "flex",
                      flexFlow: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Badge badgeContent={counts?.data[x.key]} color="error">
                      <Icon
                        style={{
                          width: 100,
                          height: 100,
                          color: theme.palette.primary.dark,
                        }}
                      />
                    </Badge>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: "20px",
                        color: "white",
                        WebkitTextStroke: "1px black",
                        textShadow: "2px 2px black",
                        textDecoration: "underline",
                        textDecorationColor: "white",
                      }}
                    >
                      {x.name}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Link>
          );
        })}
      </Grid>
    </Container>
  );
}

Home.title = "Audit Hall";
