import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, JSONResultWrapper } from "../utils/fetcher";
import { useUser } from "../utils/useUser";
import EditIcon from "@mui/icons-material/Edit";

export default function Home({ func }) {
  const router = useRouter();
  const { user } = useUser();
  const { data: myInstitutionData } = useSWR<
    JSONResultWrapper<{
      id: string;
      full_name: string;
    }>
  >("/api/myInstitution", fetcher);
  const { data: groupsData } = useSWR<
    JSONResultWrapper<
      { id: number; group_name; address: string; homepage: string }[]
    >
  >("/api/groups", fetcher);
  const { data: myGroupsData } = useSWR<
    JSONResultWrapper<
      {
        groupName: string;
        identity: string;
        groupId: number;
        worktype: string;
        beginTime: string;
        endTime: string;
      }[]
    >
  >("/api/my/groups", fetcher);

  return (
    <Container component="main" maxWidth="md">
      <div style={{ height: "20px" }}></div>
      <div style={{ fontSize: "32px" }}>My Information</div>
      {user ? (
        <>
          <Box
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
            <label htmlFor="email">E-mail</label>
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              value={user.username || user.email}
              disabled
            />
            <label htmlFor="name">name</label>
            <div style={{ display: "flex" }}>
              <TextField
                style={{ flexGrow: 1, paddingRight: "4px" }}
                id="firstName"
                label="First Name"
                variant="outlined"
                value={user.first_name}
                disabled
              />
              <TextField
                style={{ flexGrow: 1 }}
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={user.last_name}
                disabled
              />
            </div>
            <label htmlFor="institution">Institution</label>
            <div style={{ display: "flex" }}>
              <Select
                sx={{ flexGrow: 1 }}
                required
                label="Institution"
                labelId="Institution"
                id="institution"
                style={{ textAlign: "left" }}
                value={0}
                disabled
              >
                <MenuItem value={0}>
                  {myInstitutionData?.data
                    ? myInstitutionData?.data?.full_name
                    : "No Institution"}
                </MenuItem>
              </Select>
              {!myInstitutionData?.data && (
                <Link href="/SignupJoinInst">
                  <Button>Join</Button>
                </Link>
              )}
            </div>
            {[
              "id",
              "createTime",
              "updateTime",
              "password",
              "passwordSalt",
              "chineseName",
              "tel_phone",
              "contact_email",
              "title",
              "initials",
              "address",
            ].map((key) => {
              return user[key] ? (
                <>
                  <label>{key}</label>
                  <TextField
                    style={{ textAlign: "left" }}
                    value={user[key]}
                    onChange={() => {}}
                    disabled
                  ></TextField>
                </>
              ) : null;
            })}
            <div></div>
            <div>
              Click
              <Link href="/form/change-information">
                <Button>here</Button>
              </Link>
              to change personal information.
            </div>
          </Box>
          <div style={{ fontSize: "32px" }}>Groups</div>
          <Grid container spacing={1}>
            {groupsData?.data.map((group) => {
              let myGroupDetail = myGroupsData?.data.find(
                (x) => x.groupId === group.id
              );
              return (
                <Grid item xs={6} key={group.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {group.group_name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {group.address}
                      </Typography>
                      {myGroupDetail && (
                        <>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            identity: {myGroupDetail.identity}
                            <Link href="/form/Change Identity">
                              <IconButton>
                                <EditIcon></EditIcon>
                              </IconButton>
                            </Link>
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            work type: {myGroupDetail.worktype || "pending"}
                            <IconButton>
                              <Link href="/form/Change WorkType">
                                <IconButton>
                                  <EditIcon></EditIcon>
                                </IconButton>
                              </Link>
                            </IconButton>
                          </Typography>{" "}
                        </>
                      )}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {myGroupDetail &&
                          dayjs(myGroupDetail.beginTime).format("YYYY/MM/DD") +
                            " - " +
                            dayjs(myGroupDetail.endTime).format("YYYY/MM/DD")}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!!myGroupDetail ? (
                        <>
                          <Link href={group.homepage}>
                            <Button>Manage</Button>
                          </Link>
                          <Link href={"/footnote?group_id="+group.id}>
                            <Button>Edit Footnote</Button>
                          </Link>
                        </>
                      ) : (
                        <Link href="/SignupJoinInst">
                          <Button>Join Group</Button>
                        </Link>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        "Loading……"
      )}
    </Container>
  );
}
Home.title = "My Information";
