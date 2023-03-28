import styled from "@emotion/styled";
import {
  Select,
  MenuItem,
  TextField,
  Input,
  Button,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../utils/fetcher";
import { useUser } from "../utils/useUser";
import { SelectGroup } from "./SelectGroup";

const RowLabelAndInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 8px;
  line-height: 56px;
  font-weight: 800;
  & span {
    text-align: right;
    padding-right: 16px;
  }
`;

const SelectAuditor = ({ value, onChange, role, disabled }) => {
  const { data, error } = useSWR<any>(
    "/api/users?" + new URLSearchParams({ role }),
    fetcher
  );
  return (
    <Select value={value} onChange={onChange}>
      {data?.data?.map(
        ({ id, username, first_name, last_name, chineseName }) => {
          return (
            <MenuItem key={id} value={id} disabled={disabled}>
              {chineseName ||
                (first_name ? first_name + " " + last_name : username)}
            </MenuItem>
          );
        }
      )}
    </Select>
  );
};

const SelectInst = ({ value, onChange, disabled }) => {
  const { data, error } = useSWR<any>("/api/institutions", fetcher);
  return (
    <Select value={value} onChange={onChange} disabled={disabled}>
      {data?.data?.map(({ id, name }) => {
        return (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const SelectIdentity = ({ value, onChange, disabled }) => {
  return (
    <Select value={value} onChange={onChange} disabled={disabled}>
      <MenuItem value={"User"}> User </MenuItem>
      <MenuItem value={"IB"}> IB </MenuItem>
      <MenuItem value={"IB Chair"}> IB Chair </MenuItem>
    </Select>
  );
};

const SelectTitle = ({ value, onChange, disabled }) => {
  return (
    <Select value={value} onChange={onChange} disabled={disabled}>
      <MenuItem value={"Mr"}>Mr</MenuItem>
      <MenuItem value={"Mrs"}>Mrs</MenuItem>
      <MenuItem value={"Mx"}>Mx</MenuItem>
      <MenuItem value={"Dr"}>Dr</MenuItem>
      <MenuItem value={"Prof"}>Prof.</MenuItem>
    </Select>
  );
};

const SelectWorkType = ({ value, onChange, disabled }) => {
  return (
    <Select value={value} onChange={onChange} disabled={disabled}>
      <MenuItem value={"Author"}> Author </MenuItem>
      <MenuItem value={"Shifter"}> Shifter </MenuItem>
    </Select>
  );
};

const SelectIBByGroup = ({ label, value, onChange, disabled }) => {
  const [group, $group] = useState<number>();
  const { data: myInst, error: myInstErr } = useSWR<
    ApiWrapper<{ userId: number; instId: number }>
  >("/api/my/inst", fetcher);
  const { data: ib, error: ibErr } = useSWR<
    ApiWrapper<{ userId: number; username: string }>
  >(
    () => {
      if (!myInst.data.instId) return undefined;
      if (typeof group !== "number") return undefined;
      return (
        "/api/inst_ib?" +
        new URLSearchParams({
          inst_id: "" + myInst.data.instId,
          group_id: "" + group,
        })
      );
    },
    fetcher,
    {
      onSuccess: (data) => {
        onChange(data.data.userId);
      },
    }
  );
  if (disabled) {
    <>
      <RowLabelAndInput>
        <span>{label}:</span>
        <span style={{ textAlign: "left" }}>{value}</span>
      </RowLabelAndInput>
    </>;
  }
  return (
    <>
      <RowLabelAndInput>
        <span>{label} (Group):</span>
        <SelectGroup
          value={group}
          onChange={(ev) => $group(ev.target.value)}
          disabled={disabled}
        ></SelectGroup>
      </RowLabelAndInput>
      <RowLabelAndInput>
        <span>{label}:</span>
        <span style={{ textAlign: "left" }}>
          {ibErr ? "IB data missing" : ib?.data?.username || "IB unselected"}
        </span>
      </RowLabelAndInput>
    </>
  );
};

const SelectIBChairByGroup = ({ label, value, onChange, disabled }) => {
  const [group, $group] = useState(-1);
  const { data: ib, error: ibErr } = useSWR<
    ApiWrapper<{
      ibChairId: number;
      ibChairName: string;
    }>
  >("/api/group-ib-chair?group_id=" + group, fetcher, {
    onSuccess: (data) => {
      onChange(data.data.ibChairId);
    },
  });
  if (disabled) {
    <>
      <RowLabelAndInput>
        <span>{label}:</span>
        <span style={{ textAlign: "left" }}>{value}</span>
      </RowLabelAndInput>
    </>;
  }
  return (
    <>
      <RowLabelAndInput>
        <span>{label} (Group):</span>
        <SelectGroup
          value={group}
          onChange={(ev) => $group(ev.target.value)}
          disabled={disabled}
        ></SelectGroup>
      </RowLabelAndInput>
      <RowLabelAndInput>
        <span>{label}:</span>
        <span style={{ textAlign: "left" }}>
          {ibErr
            ? "IB Chair data missing"
            : ib?.data.ibChairName || "IB Chair unselected"}
        </span>
      </RowLabelAndInput>
    </>
  );
};

const InputInitials = ({ label, value, onChange, disabled }) => {
  const [errorMessage, $errorMessage] = useState("");
  const checkConflict = async () => {
    const res = await fetch("/api/open/check-initials-dup?initials=" + value);
    const json = await res.json();
    console.log(json.data);
    if (json.data !== "is OK to use") {
      $errorMessage("Initials duplicate, please replace!");
      return true;
    } else {
      $errorMessage("");
      return false;
    }
  };
  return (
    <>
      <RowLabelAndInput>
        <span>{label} (Group):</span>
        <div style={{ display: "flex", width: "100%" }}>
          <TextField
            style={{ flexGrow: "1" }}
            value={value}
            onChange={onChange}
            disabled={disabled}
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
      </RowLabelAndInput>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "right" }}>{errorMessage}</p>
      )}
    </>
  );
};

export class Form {
  id: number;
  title: string;
  design: {
    version: number;
    input: DesignProps[];
  };
}

type DesignProps = {
  type:
    | "currentUser"
    | "date"
    | "Date"
    | "selectAuditor"
    | "selectInst"
    | "selectTitle"
    | "selectGroup"
    | "selectIdentity"
    | "selectWorkType"
    | "email"
    | "textarea"
    | "tips"
    | string; //fallback
  key: string;
  label: string;
  role?: string;
};

export const DynamicForm: FC<{
  form: Form;
  readOnly?: boolean;
  onSubmit?: (data: any) => void;
  formData?: any;
}> = (props) => {
  const { user } = useUser();

  const { readOnly = false, form, onSubmit, formData = {} } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: formData,
    resolver: (values) => {
      let errors: any = {};
      form.design.input
        .filter((x) => x.type === "selectAuditor")
        .forEach((x) => {
          if (typeof values[x.key] !== "number" || values[x.key] <= 0) {
            console.log("h", values[x.key]);
            errors.auditor = {
              type: "required",
              message: "`" + x.label + "` is required.",
            };
          }
        });

      return {
        values,
        errors,
      };
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {form.design.input.map((row, i) => {
        const { key, label } = row;
        switch (row.type) {
          case "currentUser":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <div>{user.username}</div>
              </RowLabelAndInput>
            );
          case "date":
          case "Date":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      disabled={readOnly}
                      label={label}
                      renderInput={(params) => (
                        <TextField disabled={readOnly} {...params} />
                      )}
                      {...field}
                    />
                  )}
                />
              </RowLabelAndInput>
            );
          case "inputInitials":
            return (
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <InputInitials
                    label={label}
                    disabled={readOnly}
                    {...field}
                  ></InputInitials>
                )}
              />
            );
          case "selectAuditor":
            if (row.role === "IB")
              return (
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectIBByGroup
                      label={label}
                      disabled={readOnly}
                      {...field}
                    ></SelectIBByGroup>
                  )}
                />
              );
            else if (row.role === "IB Chair")
              return (
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectIBChairByGroup
                      label={label}
                      disabled={readOnly}
                      {...field}
                    ></SelectIBChairByGroup>
                  )}
                />
              );
            else
              return (
                <RowLabelAndInput key={i}>
                  <span>{label}:</span>
                  <Controller
                    name={key}
                    control={control}
                    render={({ field }) => (
                      <SelectAuditor
                        disabled={readOnly}
                        {...field}
                        role={row.role}
                      ></SelectAuditor>
                    )}
                  />
                </RowLabelAndInput>
              );
          case "selectGroup":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectGroup disabled={readOnly} {...field}></SelectGroup>
                  )}
                />
              </RowLabelAndInput>
            );
          case "selectInst":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectInst disabled={readOnly} {...field}></SelectInst>
                  )}
                />
              </RowLabelAndInput>
            );
          case "selectTitle":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectTitle disabled={readOnly} {...field}></SelectTitle>
                  )}
                />
              </RowLabelAndInput>
            );
          case "selectIdentity":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectIdentity
                      disabled={readOnly}
                      {...field}
                    ></SelectIdentity>
                  )}
                />
              </RowLabelAndInput>
            );
          case "selectWorkType":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <SelectWorkType
                      disabled={readOnly}
                      {...field}
                    ></SelectWorkType>
                  )}
                />
              </RowLabelAndInput>
            );
          case "email":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <TextField
                  key={i}
                  disabled={readOnly}
                  {...register(key, { pattern: /^\S+@\S+$/i })}
                ></TextField>
              </RowLabelAndInput>
            );
          case "textarea":
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Input
                  disabled={readOnly}
                  key={i}
                  {...register(key)}
                  multiline
                  minRows={3}
                ></Input>
              </RowLabelAndInput>
            );
          default:
            return (
              <RowLabelAndInput key={i}>
                <span>{label}:</span>
                <Input disabled={readOnly} key={i} {...register(key)}></Input>
              </RowLabelAndInput>
            );
        }
      })}
      {errors?.auditor && (
        <p style={{ width: "100%", textAlign: "right", color: "red" }}>
          {(errors as any).auditor.message}
        </p>
      )}
      {readOnly ? null : (
        <div
          style={{
            display: "flex",
            margin: "8px",
            lineHeight: "56px",
            fontWeight: 800,
          }}
        >
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexFlow: "row-reverse",
              padding: "8px",
            }}
          >
            {isSubmitting ? (
              <CircularProgress style={{ height: "100%" }} />
            ) : (
              <div style={{ height: "100%" }}></div>
            )}
          </div>
          <Button style={{ flexGrow: 2 }} type="submit" variant="contained">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};
