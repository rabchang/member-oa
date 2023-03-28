import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import React from "react";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import HandymanIcon from "@mui/icons-material/Handyman";
import HomeIcon from "@mui/icons-material/Home";
import RuleIcon from "@mui/icons-material/Rule";
import Collapse from "@mui/material/Collapse";
import { useRouter } from "next/router";

const menuData = [
  {
    name: "Funds",
    icon: <AccountBalanceIcon />,
    child: [
      { name: "New Funds", href: "/BES3/form/New Fund" },
      { name: "Funds List", href: "/BES3/funds" },
    ],
  },
  // {
  //   name: "Articles",
  //   icon: <ArticleIcon />,
  //   child: [
  //     { name: "New Articles", href: "#" },
  //     { name: "My Articles", href: "#" },
  //   ],
  // },
  {
    name: "Toolbox",
    icon: <HandymanIcon />,
    child: [
      { name: "Generate Authors Info", href: "/BES3/latex" },
      { name: "Generate Institutions Info", href: "#" },
      // { name: "My Task", href: "#" },
    ],
  },
  {
    name: "Personal Info",
    icon: <HomeIcon />,
    child: [
      { name: "Change Inst.", href: "/BES3/form/Change Inst." },
      { name: "Exit Inst.", href: "/BES3/form/Exit Inst." },
      { name: "My Approval Form", href: "/BES3/personalInfo" },
      { name: "View Personal Info 🔗", href: "/MyInformation" },
    ],
  },
  {
    name: "Approval Forms",
    icon: <RuleIcon />,
    child: [
      { name: "Personal Information", href: "/BES3/personalInfo/FormWaitList" },
      // { name: "Funds", href: "/BES3/funds/FundsApproval" },
      // { name: "Tasks", href: "/BES3/tasks/TasksApproval" },
    ],
  },
];
import ApartmentIcon from "@mui/icons-material/Apartment";
const oneMenu = [
  { name: "Users", icon: <GroupIcon />, href: "/BES3/users" },
  { name: "Institutions", icon: <ApartmentIcon />, href: "/BES3/institutions" },
];
// const besMenuHref: string[] = menuData
//   .map((x) => x.child.map((y) => y.href))
//   .flat();
// besMenuHref.push("/BES3");
// export { besMenuHref };

const CollapseList = ({ group }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{group.icon || <InboxIcon></InboxIcon>}</ListItemIcon>
        <ListItemText primary={group.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {group.child.map((item, index) => (
            <Link key={index} href={item.href}>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={decodeURIComponent(router.asPath) === item.href}
              >
                {/* <ListItemIcon>
                  <InboxIcon></InboxIcon>
                </ListItemIcon> */}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};
export function Left({}) {
  const router = useRouter();

  return (
    <List sx={{ overflowX: "hidden" }}>
      {oneMenu.map((x) => {
        return (
          <Link href={x.href}>
            <ListItemButton
              selected={decodeURIComponent(router.asPath) === x.href}
            >
              <ListItemIcon>
                {x.icon}
              </ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </Link>
        );
      })}
      {menuData.map((group, i) => {
        return <CollapseList key={i} group={group}></CollapseList>;
      })}
    </List>
  );
}
