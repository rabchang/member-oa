import { useRouter } from "next/router";
import { useEffect } from "react";

// backend login success and redirect
export default function Login({ func }) {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      window.localStorage.setItem("jwt", router.query["jwt"] as string);
      window.opener.location.reload();
      window.close();
    }
  }, [router.isReady]);

  return <h1>Login success, this window will closed shortly.</h1>;
}
