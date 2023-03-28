import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import useSWR from "swr";
import { SelectInst } from "../components/SelectInst";
import { fetcher } from "../utils/fetcher";

type SuperscriptStructure = (
  | string
  | { type: "Inst"; id: number }
  | { type: "Also"; id: number }
)[];

const structure2string = (st: SuperscriptStructure) => {
  let res = "";
  st.forEach((x) => {
    if (typeof x === "string") {
      res += x;
    } else if (x.type === "Inst") {
      res += `\\inst{${x.id}}`;
    } else if (x.type === "Also") {
      res += `\\also{${x.id}}`;
    }
  });
  return res;
};

const string2Structure = (str: string) => {
  const reg = /\\(?:also|inst)\{(?:\d+)\}/g; // with out matching groups
  const gaps = str.split(reg);
  const reg2 = /\\(also|inst)\{(\d+)\}/g;
  const matches = str.matchAll(reg2);

  const structure = [];

  let i = 0;
  // console.log(gaps);
  for (const match of matches) {
    // console.log(match.length);
    if (gaps[i].length !== 0) {
      structure.push(gaps[i]);
    }
    if (match[1] === "inst") {
      structure.push({ type: "Inst", id: parseInt(match[2]) });
    } else if (match[1] === "also") {
      structure.push({ type: "Also", id: parseInt(match[2]) });
    }
    i++;
  }
  if (gaps[gaps.length - 1].length !== 0) {
    structure.push(gaps[gaps.length - 1]);
  }
  return structure;
};

const Structure2ui: FC<{
  st: SuperscriptStructure;
  onDelete: (i: number) => void;
}> = ({ st, onDelete }) => {
  let res: JSX.Element[] = [];
  st.forEach((x, i) => {
    if (typeof x === "string") {
      res.push(
        <Chip
          key={i}
          label={x}
          onContextMenu={(ev) => {
            ev.preventDefault();
            onDelete(i);
          }}
        ></Chip>
      );
    } else if (x.type === "Inst") {
      res.push(
        <Chip
          key={i}
          label={`\\inst{${x.id}}`}
          color="secondary"
          onContextMenu={(ev) => {
            ev.preventDefault();
            onDelete(i);
          }}
        ></Chip>
      );
    } else if (x.type === "Also") {
      res.push(
        <Chip
          key={i}
          label={`\\also{${x.id}}`}
          color="success"
          onContextMenu={(ev) => {
            ev.preventDefault();
            onDelete(i);
          }}
        ></Chip>
      );
    }
  });
  return res;
};

const InstLatex = ({ id }) => {
  const { data: insts } = useSWR("/api/institutions", fetcher);
  return (
    <span>
      {insts?.data.find((x) => x.id === id)?.fullName || `Inst#${id} missing`}
    </span>
  );
};

const also: [number, string][] = [
  [
    17,
    "Also at Key Laboratory of Nuclear Physics and Ion-beam Application [MOE] and Institute of Modern Physics, Fudan University, Shanghai 200443, People&#039;s Republic of China",
  ],
  [2, "Also at Ankara University,06100 Tandogan, Ankara, Turkey"],
  [3, "Also at Bogazici University, 34342 Istanbul, Turkey"],
  [
    4,
    "Also at the Moscow Institute of Physics and Technology, Moscow 141700, Russia",
  ],
  [
    5,
    "Also at the Functional Electronics Laboratory, Tomsk State University, Tomsk, 634050, Russia",
  ],
  [6, "Also at the Novosibirsk State University, Novosibirsk, 630090, Russia"],
  [7, 'Also at the NRC "Kurchatov Institute", PNPI, 188300, Gatchina, Russia'],
  [8, "Also at University of Texas at Dallas, Richardson, Texas 75083, USA"],
  [9, "Currently at Istanbul Arel University, 34295 Istanbul, Turkey"],
  [11, "Also at Istanbul Arel University, 34295 Istanbul, Turkey"],
  [12, "Also at Goethe University Frankfurt, 60323 Frankfurt am Main, Germany"],
  [
    13,
    "Also at Institute of Nuclear and Particle Physics, Shanghai Key Laboratory for Particle Physics and Cosmology, Shanghai 200240, People&#039;s Republic of China",
  ],
  [
    15,
    "Also at Key Laboratory for Particle Physics, Astrophysics and Cosmology, Ministry of Education; Shanghai Key Laboratory for Particle Physics and Cosmology; Institute of Nuclear and Particle Physics, Shanghai 200240, People&#039;s Republic of China",
  ],
  [
    16,
    "Also at Government College Women University, Sialkot - 51310. Punjab, Pakistan. ",
  ],
  [
    18,
    "Currently at: Center for Underground Physics, Institute for Basic Science, Daejeon 34126, Korea",
  ],
  [
    19,
    "Also at Harvard University, Department of Physics, Cambridge, MA, 02138, USA",
  ],
  [
    20,
    "Currently at: Institute of Physics and Technology, Peace Ave.54B, Ulaanbaatar 13330, Mongolia",
  ],
  [
    21,
    "Also at State Key Laboratory of Nuclear Physics and Technology, Peking University, Beijing 100871, People&#039;s Republic of China",
  ],
  [
    22,
    "Also at School of Physics and Electronics, Hunan University, Changsha 410082, China",
  ],
  [
    23,
    "Also at Guangdong Provincial Key Laboratory of Nuclear Science, Institute of Quantum Matter, South China Normal University, Guangzhou 510006, China",
  ],
  [
    24,
    "Also at Frontiers Science Center for Rare Isotopes, Lanzhou University, Lanzhou 730000, People&#039;s Republic of China",
  ],
  [
    25,
    "Also at Lanzhou Center for Theoretical Physics, Lanzhou University, Lanzhou 730000, People&#039;s Republic of China",
  ],
  [27, "Currently at Istinye University, 34010 Istanbul, Turkey"],
  [
    30,
    "Also at the Department of Mathematical Sciences, IBA, Karachi 75270, Pakistan",
  ],
];

const AlsoLatex = ({ id }) => {
  return (
    <span>{also.find((x) => x[0] === id)?.[1] || `Also#${id} missing`}</span>
  );
};

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

function gatherMap<T extends { id: number }>(insts2d: T[][]) {
  const res = new Map();
  for (const row of insts2d) {
    for (const cell of row) {
      res.set(cell.id, cell);
    }
  }
  return [...res.entries()];
}

const Page = () => {
  const [db, $db] = useState<SuperscriptStructure>(
    string2Structure("\\inst{7},\\also{2},\\also{3}")
  );
  const [addType, $addType] = useState<"str" | "inst" | "also" | "">("");
  const [nStr, $nStr] = useState(",");
  const [nInst, $nInst] = useState<{ id: number }>();
  const [nAlso, $nAlso] = useState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const gatherInstMap = gatherMap([
    [{ id: 96 }, { id: 60 }],
    db.filter((x) => x.type === "Inst"),
  ]);
  // console.log(db.filter((x) => x.type === "Inst"));

  const gatherAlsoMap = gatherMap([
    [{ id: 11 }, { id: 12 }],
    db.filter((x) => x.type === "Also"),
  ]);

  return (
    <div>
      <h2>Edit Superscript As Latex</h2>
      <TextField
        style={{ width: "100%" }}
        value={structure2string(db)}
        onChange={(ev) => $db(string2Structure(ev.target.value))}
      ></TextField>
      <h2>Edit Superscript</h2>
      <p>right click to delete</p>
      <div>
        <Structure2ui
          st={db}
          onDelete={(i) => {
            const ndb = [...db];
            ndb.splice(i, 1);
            $db(ndb);
          }}
        />

        <IconButton
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AddIcon></AddIcon>
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              $addType("inst");
              handleClose();
            }}
          >
            Inst
          </MenuItem>
          <MenuItem
            onClick={() => {
              $addType("inst");
              handleClose();
            }}
          >
            Also At
          </MenuItem>
          <MenuItem
            onClick={() => {
              $addType("str");
              handleClose();
            }}
          >
            text
          </MenuItem>
        </Menu>

        {addType === "str" && (
          <div>
            <TextField
              value={nStr}
              onChange={(ev) => $nStr(ev.target.value)}
            ></TextField>
            <Button
              onClick={() => {
                $db([...db, nStr]);
                $addType("");
              }}
            >
              add
            </Button>
          </div>
        )}
        {addType === "inst" && (
          <div>
            <SelectInst value={nInst} onChange={$nInst}></SelectInst>
            <Button
              onClick={() => {
                $db([...db, { type: "Inst", id: nInst.id }]);
                $addType("");
              }}
            >
              add
            </Button>
          </div>
        )}
      </div>
      <h2>Your input will render as:</h2>
      <div>
        <div>
          A. Alice<sup>1 a</sup>, ...{" "}
          <span style={{ color: "red" }}>
            HC. Zhang
            <sup>
              {db.map((x) => {
                if (typeof x === "string") {
                  return x;
                } else if (x.type === "Inst") {
                  return gatherInstMap.findIndex(
                    ([id, obj]) => x.id === obj.id
                  );
                } else if (x.type === "Also") {
                  return colName(
                    gatherAlsoMap.findIndex(([id, obj]) => x.id === obj.id)
                  );
                }
              })}
            </sup>
          </span>
          , ... Z. Zack
          <sup>2 b</sup>
        </div>
        <div style={{ margin: "16px" }}>
          {gatherInstMap.map(([_, obj], ni) => (
            <div key={ni + 1}>
              {ni + 1 + ". "}
              <InstLatex id={obj.id}></InstLatex>
            </div>
          ))}
        </div>
        <div style={{ margin: "16px" }}>
          {gatherAlsoMap.map(([_, obj], ni) => (
            <div key={colName(ni)}>
              {colName(ni) + ". "}
              <AlsoLatex id={obj.id}></AlsoLatex>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
