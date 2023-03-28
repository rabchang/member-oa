import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { SelectInst } from "../components/SelectInst";
import { ApiWrapper, fetcher } from "../utils/fetcher";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../utils/useUser";
import axios from "axios";
import { AsyncButton, useLoading } from "../components/loading";

interface InstEditObj {
  type: "inst";
  id: number;
  address: "" | "A" | "B" | "C" | "D" | "E";
}

interface AlsoEditObj {
  type: "also";
  id: number;
}

const InstTitle: FC<{ id }> = ({ id }) => {
  const { data: insts } = useSWR<ApiWrapper<{ id; fullName }[]>>(
    "/api/institutions",
    fetcher
  );
  return (
    <span>
      {insts?.data.find((x) => x.id === id)?.fullName || `Inst#${id} missing`}
    </span>
  );
};

const AlsoTitle: FC<{ id }> = ({ id }) => {
  const { data: allAlso } = useSWR<ApiWrapper<{ id: number; name: string }[]>>(
    "/api/users/also-ats",
    fetcher
  );
  return (
    <span>
      {allAlso?.data.find((x) => x.id === id).name || `Also#${id} missing`}
    </span>
  );
};

const ListWithDelete: FC<{ data; $data; render; readOnly? }> = ({
  data,
  $data,
  render,
  readOnly,
}) => {
  if (!data || data.length === 0) return <>(empty)</>;
  return (
    <>
      {data.map((x, i, arr) => {
        return (
          <div key={data.id || i}>
            {render(x, i, arr)}
            <IconButton
              disabled={readOnly}
              onClick={() => {
                if (readOnly) return;
                const nd = [...data];
                nd.splice(i, 1);
                $data(nd);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      })}
    </>
  );
};

const editArray2String = (
  arr: InstEditObj[] | AlsoEditObj[],
  transform?: (str: string) => string
) => {
  if (!transform) transform = (x) => x;
  return arr
    .map((x) => x.id + "" + (x.address || ""))
    .map(transform)
    .join(",");
};

const FootnoteEditor: FC<{
  readOnly?: boolean;
  value?: {
    foot_note: string;
    also_at: string;
    note: string;
    auditor1: number;
  };
}> = ({ readOnly, value }) => {
  const router = useRouter();
  const [mainInst, $mainInst] = useState<InstEditObj>({
    id: 0,
    type: "inst",
    address: "",
  });
  const [foot_note, $foot_note] = useState<InstEditObj[]>([]);
  const [inst, $inst] = useState<InstEditObj>(null);
  const [instAddress, $instAddress] = useState<[string, string][]>([]);
  const [instAddressAddSelect, $instAddressAddSelect] = useState<string>("");
  const [also_at, $also_at] = useState<AlsoEditObj[]>([]);
  const [alsoAddSelect, $alsoAddSelect] = useState<number | "">("");
  const [note, $note] = useState("");
  const { data: insts } = useSWR<
    ApiWrapper<
      {
        id: number;
        address: string;
        address2: string;
        address3: string;
        address4: string;
        address5: string;
      }[]
    >
  >("/api/institutions", fetcher);

  const { data: alsoDb } = useSWR<
    ApiWrapper<
      {
        id: number;
        name: string;
        group_id: number;
      }[]
    >
  >(
    router.query["group_id"] &&
      "/api/users/also-ats?group_id=" + router.query["group_id"],
    fetcher
  );

  useEffect(() => {
    const load = async () => {
      $mainInst({
        id: await fetch("/api/my/inst")
          .then((x) => x.json())
          .then((x) => x.data.instId),
        type: "inst",
        address: "",
      });
      if (readOnly) {
        // $foot_note(value.foot_note);
        // $also_at(value.also_at);
        $foot_note(
          value.foot_note.split(",").map((str) => ({
            type: "inst",
            id: parseInt(str),
            address: (!!str[str.length - 1].match(/[A-E]/)
              ? str[str.length - 1]
              : "") as any,
          }))
        );
        $also_at(
          value.also_at.split(",").map((str) => ({
            type: "also",
            id: parseInt(str),
          }))
        );
        $note(value.note);
      } else {
        $foot_note(
          await fetch(
            "/api/users/foot-note?group_id=" + router.query["group_id"]
          )
            .then((x) => x.json())
            .then(
              (x) =>
                x.data?.map((x) => ({
                  type: "inst",
                  id: x.instId,
                  address: "",
                })) || []
            )
        );
        $also_at(
          await fetch("/api/users/also-at?group_id=" + router.query["group_id"])
            .then((x) => x.json())
            .then(
              (x) => x.data?.map((x) => ({ type: "also", id: x.instId })) || []
            )
        );
      }
    };
    if (router.isReady) {
      load();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (inst) {
      const db_inst = insts?.data.find((instX) => instX.id === inst.id);
      const manyAddress = !!db_inst.address2;
      if (!manyAddress) {
        $instAddressAddSelect("(default)");
        $instAddress([["(default)", db_inst.address]]);
      } else {
        const addressArray = [
          ["A", db_inst.address],
          ["B", db_inst.address2 || ""],
          ["C", db_inst.address3],
          ["D", db_inst.address4],
          ["E", db_inst.address5],
        ];
        $instAddressAddSelect("A");
        $instAddress(addressArray as [string, string][]);
      }
    }
  }, [inst]);

  const onSave = async () => {
    axios.post("/api/users/foot-note", {
      group_id: router.query["group_id"],
      foot_note: "",
      also_at: also_at.map((x) => x.id).join(","),
    });
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "right", paddingRight: "8px" }}
        >
          Primary inst:{" "}
        </Grid>
        <Grid item xs={12} md={9}>
          <Chip label={<InstTitle id={mainInst.id} />} />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "right", paddingRight: "8px" }}
        >
          <div>Foot Note:</div>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card style={{ marginBottom: "16px", padding: "16px" }}>
            <TextField
              disabled
              value={editArray2String(foot_note)}
              onChange={() => {}}
              fullWidth
            ></TextField>
            <ListWithDelete
              data={foot_note}
              $data={$foot_note}
              readOnly={readOnly}
              render={(x, i) => {
                return (
                  <Chip key={x.type + x.id} label={<InstTitle id={x.id} />} />
                );
              }}
            />
            {!readOnly && (
              <Grid container>
                <SelectInst
                  style={{ flexGrow: 1 }}
                  value={inst}
                  onChange={$inst}
                ></SelectInst>
                <Select
                  style={{ flexGrow: 1 }}
                  value={instAddressAddSelect}
                  onChange={(ev) => $instAddressAddSelect(ev.target.value)}
                >
                  {instAddress.map(([key, value]) => {
                    if (!value) return undefined;
                    return (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Button
                  onClick={() => {
                    const nFootNote = [...foot_note];
                    nFootNote.push({
                      type: "inst",
                      id: inst.id,
                      address:
                        instAddressAddSelect === "(default)"
                          ? ""
                          : (instAddressAddSelect as InstEditObj["address"]),
                    });
                    $foot_note(nFootNote);
                  }}
                >
                  Add Inst.
                </Button>
              </Grid>
            )}
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "right", paddingRight: "8px" }}
        >
          Also at:{" "}
        </Grid>
        <Grid item xs={12} md={9}>
          <Card style={{ marginBottom: "16px", padding: "16px" }}>
            <TextField
              disabled
              value={editArray2String(also_at)}
              fullWidth
              onChange={() => {}}
            ></TextField>
            <ListWithDelete
              data={also_at}
              $data={$also_at}
              readOnly={readOnly}
              render={(x, i) => {
                return (
                  <Chip
                    sx={{ maxWidth: "600px" }}
                    key={x.type + x.id}
                    label={<AlsoTitle id={x.id} />}
                  />
                );
              }}
            />

            {!readOnly && (
              <div>
                <Select
                  fullWidth
                  style={{ flexGrow: 1 }}
                  value={alsoAddSelect}
                  onChange={(ev) => $alsoAddSelect(ev.target.value as number)}
                >
                  {alsoDb?.data.map(({ id, name }) => {
                    return (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Button
                  onClick={() => {
                    if (readOnly) return;
                    const naa = [...also_at];
                    if (alsoAddSelect === "") return;
                    naa.push({
                      type: "also",
                      id: alsoAddSelect,
                    });
                    $also_at(naa);
                  }}
                >
                  Add Also at note
                </Button>
              </div>
            )}
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "right", paddingRight: "8px" }}
        >
          note:
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            disabled={readOnly}
            multiline
            fullWidth
            value={note}
            onChange={(ev) => $note(ev.target.value)}
          ></TextField>{" "}
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}>
          {!readOnly && (
            <AsyncButton
              action={async () => {
                const group_id: string = router.query["group_id"] as string;
                const inst_id: string = await axios("/api/my/inst").then(
                  (x) => x.data.data.instId
                );
                const auditorId = await axios("/api/inst_ib", {
                  params: {
                    inst_id,
                    group_id,
                  },
                }).then((x) => x.data.data.userId);
                await axios.post("/api/applications", {
                  formId: 8,
                  formData: {
                    foot_note: editArray2String(foot_note),
                    also_at: editArray2String(also_at),
                    note: note,
                    auditor1: auditorId,
                  },
                });

                router.push("/FormResult");
              }}
            >
              Save
            </AsyncButton>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          style={{ textAlign: "right", paddingRight: "8px", fontWeight: 600 }}
        >
          <div>Render as:</div>
        </Grid>
        <Grid item xs={12} md={9}>
          <DemoRender
            mainInst={mainInst}
            foot_note={foot_note}
            also_at={also_at}
          ></DemoRender>
        </Grid>
      </Grid>
    </>
  );
};

export { FootnoteEditor };

function gatherMap<T extends { id: number }>(insts2d: T[][]) {
  const res = new Map();
  for (const row of insts2d) {
    for (const cell of row) {
      res.set(cell.id, cell);
    }
  }
  return [...res.entries()];
}

function colName(n) {
  // https://stackoverflow.com/questions/8240637/convert-numbers-to-letters-beyond-the-26-character-alphabet
  var ordA = "a".charCodeAt(0);
  var ordZ = "z".charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s;
}

const DemoRender = ({ mainInst, foot_note, also_at }) => {
  const gatherInstMap = gatherMap([
    // [{ id: 96 }, { id: 60 }],
    [mainInst],
    foot_note,
  ]);
  const gatherAlsoMap = gatherMap([
    // [{ id: 11 }, { id: 12 }]
    also_at,
  ]);

  return (
    <div>
      <div>
        A. Alice<sup>1 a</sup>, ...{" "}
        <span style={{ color: "red" }}>
          B. Bob
          <sup>
            {editArray2String([mainInst])},{editArray2String(foot_note)}{" "}
            {editArray2String(also_at, colName)}
          </sup>
        </span>
        , ... Z. Zack
        <sup>2 b</sup>
      </div>
      <div style={{ margin: "16px" }}>
        {gatherInstMap.map(([_, obj], ni) => (
          <div key={ni + 1}>
            {ni + 1 + ". "}
            <InstTitle id={obj.id}></InstTitle>
          </div>
        ))}
      </div>
      <div style={{ margin: "16px" }}>
        {gatherAlsoMap.map(([_, obj], ni) => (
          <div key={colName(ni)}>
            {colName(ni) + ". "}
            <AlsoTitle id={obj.id}></AlsoTitle>
          </div>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  const { user } = useUser();
  return (
    <Container>
      <h1>Edit Foot note</h1>
      <FootnoteEditor />
    </Container>
  );
};
Page.title = "Edit Foot Note";

export default Page;
