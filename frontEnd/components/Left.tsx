import Box from "@mui/material/Box";

import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";

const drawerWidth = 240;

export function Left({}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <List>
        <Link href="/">
          <ListItemButton selected={decodeURIComponent(router.asPath) === "/"}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dash Board" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          style={{ paddingLeft: "48px" }}
        >
          <List component="div">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="LHAASO" />
            </ListItemButton>
            <Link href="/JUNO">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="JUNO" />
              </ListItemButton>
            </Link>
            <Link href="/BES3">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="BES3" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link href="/MyInformation">
          <ListItem disablePadding>
            <ListItemButton
              selected={decodeURIComponent(router.asPath) === "/MyInformation"}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Information" />
            </ListItemButton>
          </ListItem>
        </Link>
        {/* <Link href="/JoinInstRequestList">
          <ListItem disablePadding>
            <ListItemButton
              selected={
                decodeURIComponent(router.asPath) === "/JoinInstRequestList"
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Join Inst. Request" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/JoinGroupRequestList">
          <ListItem disablePadding>
            <ListItemButton
              selected={
                decodeURIComponent(router.asPath) === "/JoinGroupRequestList"
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Join Group Request" />
            </ListItemButton>
          </ListItem>
        </Link> */}
        <Link href="/audit-hall">
          <ListItem disablePadding>
            <ListItemButton
              selected={decodeURIComponent(router.asPath) === "/audit-hall"}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Audit Hall" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
