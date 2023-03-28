import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined")

class UserStore {
  user: string;

  login() {}
  logOut() {}
  canAccessRoute() {

  }

}
