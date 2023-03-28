import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { fetcher } from "../utils/fetcher";
import { mutate } from "swr";

enum Title {
  Ms = "Ms",
  Mrs = "Mrs",
  Mx = "Mx",
  Mr = "Mr",
  Dr = "Dr",
  Prof = "Prof",
}

type SignupValues = {
  email: string;
  contactEmail: string;
  firstName: string;
  lastName: string;

  chineseName: string;
  title: Title;
  initials: string;
  tel: string;
  address: string;
};

export default function Signup({ func }) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<SignupValues>({
    defaultValues: {
      contactEmail: "",
      firstName: "",
      lastName: "",

      chineseName: "",
      title: Title.Ms,
      initials: "",
      tel: "",
      address: "",
    },
    resolver: (values) => {
      let errors: any = {};
      if (values.firstName.length === 0) {
        errors.firstName = {
          type: "required",
          message: "This is required.",
        };
      }
      if (values.lastName.length === 0) {
        errors.lastName = {
          type: "required",
          message: "This is required.",
        };
      }
      if (values.initials.length === 0) {
        errors.initials = {
          type: "required",
          message: "This is required.",
        };
      }
      if (values.tel.length === 0) {
        errors.tel = {
          type: "required",
          message: "This is required.",
        };
      }
      if (values.address.length === 0) {
        errors.address = {
          type: "required",
          message: "This is required.",
        };
      }

      return {
        values,
        errors,
      };
    },
  });
  const onSubmit = async (data) => {
    try {
      await checkConflict();
      const res = await fetch(
        "/api/oauth/signup/ihep?signupJwt=" + router.query.signupJwt,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.log(error);
      alert("catch sign up error");
      return;
    }
    try {
      await mutate("/api/me");
    } catch (error) {
      console.log("fetch api me failed");
      console.log(error);
      return;
    }
    window.opener.location.reload();
    window.close();
  };

  const watchInitials = watch("initials");
  const checkConflict = async () => {
    const res = await fetch(
      "/api/open/check-initials-dup?initials=" + watchInitials
    );
    const json = await res.json();
    console.log(json.data);
    if (json.data !== "is OK to use") {
      setError("initials", {
        type: "conflict",
        message: "Initials duplicate, please replace!",
      });
      return true;
    } else {
      clearErrors("initials");
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={{ height: "20px" }}></div>
      <div style={{ fontSize: "32px" }}>Sign up</div>
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
        <label htmlFor="email">E-mail *</label>
        <TextField
          disabled
          id="email"
          label="Linked E-mail"
          defaultValue="Default Value"
          value={router.query?.email}
          variant="filled"
        />
        <span>Contact E-mail:</span>
        <Controller
          name="contactEmail"
          control={control}
          render={({ field }) => <TextField required {...field} />}
        />
        <label htmlFor="firstName">First Name *</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <TextField required {...field} />}
        />
        {errors?.firstName && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.firstName.message}
          </p>
        )}
        <label htmlFor="lastName">Last Name *</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
        {errors?.firstName && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.lastName.message}
          </p>
        )}
        {/* <label htmlFor="institution">Institution *</label>
            <Controller
              name="institution"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  required
                  labelId="institution"
                  id="institution"
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value={"0"}>IHEP</MenuItem>
                  <MenuItem value={"1"}>LZU</MenuItem>
                </Select>
              )}
            /> */}
        <label htmlFor="chineseName">Chinese Name</label>
        <Controller
          name="chineseName"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              required
              labelId="title"
              id="title"
              style={{ textAlign: "left" }}
            >
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Mrs"}>Mrs</MenuItem>
              <MenuItem value={"Mx"}>Mx</MenuItem>
              <MenuItem value={"Dr"}>Dr</MenuItem>
              <MenuItem value={"Prof"}>Prof.</MenuItem>
            </Select>
          )}
        />
        <label htmlFor="initials">Initials</label>
        <div style={{ display: "flex", width: "100%" }}>
          <Controller
            name="initials"
            control={control}
            render={({ field }) => (
              <TextField style={{ flexGrow: "1" }} {...field} />
            )}
          />
          <Button
            onClick={async () => {
              const res = await checkConflict();
              if (!res) alert("no conflict");
            }}
          >
            Check Conflict
          </Button>
        </div>
        {errors?.initials && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.initials.message}
          </p>
        )}

        <label htmlFor="tel">Tel *</label>
        <Controller
          name="tel"
          control={control}
          render={({ field }) => <TextField required {...field} />}
        />
        {errors?.tel && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.firstName.message}
          </p>
        )}
        <label htmlFor="address">Address *</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <TextField required {...field} />}
        />
        {errors?.address && (
          <p style={{ gridColumn: "1 / 3", color: "red" }}>
            {errors.firstName.message}
          </p>
        )}
        <p
          style={{ gridColumn: "1 / 3", fontWeight: "500", lineHeight: "1.4" }}
        >
          Check your information carefully, any errors will only be corrected
          <br /> in the future by submitting for approval.
        </p>
        <div></div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
