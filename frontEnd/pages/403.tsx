import { Button } from "@mui/material";
import Link from "next/link";
const _403 = () => {
  return (
    <div>
      <h1>You have no permission to view this page.</h1>
      <Link href="/">
        <Button variant="contained">Home page</Button>
      </Link>
    </div>
  );
};
_403.title= "Permission Denied"

export { _403 as default };
