import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "./fetcher";

const useUser = ({ redirectWhenLogout = true } = {}) => {
  const router = useRouter();
  const { data, error } = useSWR<{
    data: {
      id: number;
      username: string;
      email;
      first_name: string;
      last_name: string;

      address: string;
      chineseName: string;
      contact_email: string;
      createTime: string;
      initials: string;
      roles: [];
      tel_phone: string;
      title: string;
    };
    ok: boolean;
  }>("/api/me", fetcher);

  useEffect(() => {
    if (redirectWhenLogout && (error || (data && !data.ok))) {
      router.replace("/Login?r=" + router.pathname);
    }
  }, [data, redirectWhenLogout]);

  return { data, error, user: data?.data };
};

export { useUser };
