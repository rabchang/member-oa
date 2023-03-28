import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import useSWR, { mutate } from "swr";
import { fetcher, JSONResultWrapper } from "../utils/fetcher";
import { default as dayjs, Dayjs } from "dayjs";
import { SelectInst } from "../components/SelectInst";
import { SelectGroup } from "../components/SelectGroup";
import { useUser } from "../utils/useUser";

enum Title {
  Ms = 0,
  Mrs,
  Mx,
  Mr,
  Dr,
  Prof,
}

type SignupValues = {
  inst_id: { id: number; name: string }; // database key
  group_id: number;
  identity: string;
  workType: string;
  note: string;
  join_time: Dayjs;
  leave_time: Dayjs;
};

const oneYearLater = function () {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
};

export default function JoinInst({ func }) {
  const router = useRouter();
  const { data: myInst, error: myInstErr } = useSWR<
    JSONResultWrapper<{ instId: number; userId: number }>
  >("/api/my/inst", fetcher);

  const { handleSubmit, control, formState, watch } = useForm<SignupValues>({
    defaultValues: {
      group_id: 2,
      inst_id: null,
      note: "",
      join_time: dayjs(new Date()),
      leave_time: dayjs(oneYearLater()),
      identity: "User",
      workType: "Author",
    },
    resolver: (values) => {
      let errors: any = {};
      if (+values.join_time > +values.leave_time) {
        errors.joinTime = {
          type: "invalid",
          message: "Join time needs to be less than leave time",
        };
      }
      if (!values.inst_id) {
        errors.inst_id = {
          type: "invalid",
          message: "Please select a institution.",
        };
      }
      if (!ib_result?.data) {
        errors.inst_id = {
          type: "invalid",
          message: "Ib data missing. Contact with Admin.",
        };
      }
      return {
        values,
        errors,
      };
    },
  });

  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      let submit: any = data;
      submit.join_time = data.join_time.valueOf().toString();
      submit.leave_time = data.leave_time.valueOf().toString();
      submit.joinTime = data.join_time.valueOf().toString();
      submit.leaveTime = data.leave_time.valueOf().toString();
      submit.inst_id = data.inst_id.id;
      submit.worktype = data.workType;

      const res = await fetch("/api/joinGroupRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (myInstErr || myInst.data === null) {
        const res2 = await fetch("/api/joinInstRequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    } catch (error) {
      console.log(error);
      alert("catch sign up error");
      return;
    }
    await mutate("/api/me");
    router.push("/JoinInstRequestList");
    // window.opener.location.reload();
    // window.close();
  };

  const watchInstitution = watch("inst_id");
  const watchGroup = watch("group_id");
  const { data: ib_result } = useSWR<JSONResultWrapper<{ username: string }>>(
    () =>
      `/api/inst_ib?inst_id=${
        watchInstitution.id || -1
      }&group_id=${watchGroup}`,
    fetcher
  );

  return (
    <Container component="main" maxWidth="md">
      <div style={{ height: "20px" }}></div>
      <div style={{ fontSize: "32px" }}>Join Inst.</div>
      <Box
        onSubmit={handleSubmit(onSubmit)}
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
        <span>Join Time *</span>
        <Controller
          name="join_time"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="joinTime"
              renderInput={(params) => <TextField {...params} />}
              {...field}
            />
          )}
        />
        {errors?.join_time && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.join_time.message}
          </p>
        )}
        <span>Leave Time *</span>
        <Controller
          name="leave_time"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="leaveTime"
              renderInput={(params) => <TextField {...params} />}
              {...field}
            />
          )}
        />
        <label htmlFor="group_id">Group *</label>
        <Controller
          name="group_id"
          control={control}
          render={({ field }) => <SelectGroup {...field}></SelectGroup>}
        />
        <label htmlFor="inst_id">Institution *</label>
        <Controller
          name="inst_id"
          control={control}
          render={({ field }) => <SelectInst {...field}></SelectInst>}
        />
        {errors?.inst_id && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.inst_id.message}
          </p>
        )}
        <label htmlFor="institution">IB *</label>
        <div style={{ textAlign: "left" }}>
          {ib_result?.data?.username || "ib data missing"}
        </div>
        <label htmlFor="identity">Identity *</label>
        <Controller
          name="identity"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="identity"
              id="identity"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"IB Chair"}>IB Chair</MenuItem>
              <MenuItem value={"IB"}>IB</MenuItem>
              <MenuItem value={"User"}>User</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="workType">Work Type *</label>
        <Controller
          name="workType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="workType"
              id="workType"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"Author"}>Author</MenuItem>
              <MenuItem value={"Shifter"}>Shifter</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="note">Note *</label>
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <TextField multiline rows={3} required {...field} />
          )}
        />
        <div></div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
JoinInst.title = "Join Inst.";
