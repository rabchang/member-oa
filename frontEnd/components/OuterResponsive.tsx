import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Menu, MenuItem } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { useUser } from "../utils/useUser";
import logo from "../public/member_logo_small.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { default as MUILink } from "@mui/material/Link";

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props: any) {
  const [email, $email] = React.useState("");

  React.useEffect(() => {
    $email("zhanghc#ihep.ac.cn".replace("#", "@"));
  }, []);

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      IHEP DAQ {new Date().getFullYear()}
      {"."}
      <MUILink href={"mailto:" + email}>{email}</MUILink>
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export function OuterResponsive({ children, left, title }) {
  const router = useRouter();
  const { user } = useUser({ redirectWhenLogout: false });

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [avatarMenuAnchorEl, $avatarMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    $avatarMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    $avatarMenuAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Head>
        <title>{title + " | MEMBER"}</title>
      </Head>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <IconButton>
              <Image
                src={logo}
                width="48px"
                height="48px"
                alt={"logo image"}
              ></Image>
            </IconButton>
          </Link>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>

          {user ? (
            <>
              <span style={{ marginRight: "8px" }}>{user.username}</span>
              <IconButton sx={{ p: 0 }} onClick={handleMenu}>
                <Avatar alt={user.username} src="#" />
              </IconButton>
              <Menu
                id="menu-appbar-avatar"
                anchorEl={avatarMenuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(avatarMenuAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/MyInformation");
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await fetch("/api/logout", { redirect: "manual" });
                    document.location = "/";
                    handleClose();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/Login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ height: "100vh" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" style={{ height: "100%" }}>
          {left}
          {/* {mainListItems} */}
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        </List>
      </Drawer>
      <Box
        component="main"
        style={{ flexShrink: 0 }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          sx={{ mt: 4, mb: 4 }}
          style={{
            display: "flex",
            flexFlow: "column",
            minHeight: "calc(100% - 120px)",
          }}
        >
          <div style={{ flex: "1 0 auto" }}>{children}</div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export { OuterResponsive as Outer };
