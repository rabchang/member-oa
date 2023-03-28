import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import FileSaver from "file-saver";
import Image from "next/image";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import { ApiWrapper, fetcher } from "../../utils/fetcher";
import dayjs from "dayjs";
import { SelectInst } from "../../components/SelectInst";
import { useState } from "react";
import { CheckBox, Label } from "@mui/icons-material";
import instsPng from "../../public/insts.png";

export default function Home({ func }) {
  const router = useRouter();
  // const [inst, $inst] = useState(-1);
  const [inst, $inst] = useState<{ id: number; name: string }>(null);
  const [workType, $workType] = useState<string>("*");
  const { data } = useSWR<
    ApiWrapper<
      {
        institution_id: number;
        abbreviation_name: string;
        full_name: string;
        address1: string;
        address2: string;
        address3: string;
        address4: string;
        address5: string;
        description: string;
        continent: string;
        contact_person_id: number;
        country: string;
        join_date: string;
        leave_date: string;
      }[]
    >
  >("/api/institutions-info?group_id=1", fetcher);

  const handleCSV = () => {
    if (!data) return;
    const headString =
      "institution_id,abbreviation_name,full_name,address1,address2,address3,address4,address5,description,continent,contact_person_id,country,join_date,leave_date";
    const keys = headString.split(",");
    const rowsString = data.data.map((x) =>
      keys
        .map((y) => x[y])
        .map((y) => (y === undefined ? "" : y))
        .map((y) => (y === null ? "" : y))
        .map((y) => "" + y)
        .map((y) => (y.includes(",") ? '"' + y + '"' : y))
        .join(",")
    );
    const csvString = [headString, ...rowsString].join("\n");

    var file = new File(
      [csvString],
      `Users (${dayjs().format("YYYY-MM-DD")}).csv`,
      {
        type: "text/csv;charset=utf-8",
      }
    );
    FileSaver.saveAs(file);
  };
  return (
    <Container component="main">
      <h1>BES3 Institutions</h1>

      <Image width={960} height={720} src={instsPng}></Image>
      <div style={{ margin: "8px 0" }}>
        <Button variant="contained" onClick={handleCSV}>
          Download CSV
        </Button>
      </div>
      <div style={{ width: "100%" }}>
        {data ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {"#,Abbreviation Name,Full Name,Address,Join Date,Leave Date,"
                    .split(",")
                    .map((key) => (
                      <TableCell key={key} align="right">
                        {key}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((row) => (
                  <TableRow
                    key={row.institution_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {"institution_id,abbreviation_name,full_name,address1,join_date,leave_date"
                      .split(",")
                      .map((key) => (
                        <TableCell key={key} align="right">
                          {row[key] || "-"}
                        </TableCell>
                      ))}
                    <TableCell align="right">
                      <Link
                        href={
                          "/BES3/institution-detail?id=" + row.institution_id
                        }
                      >
                        <Button>Detail</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress />
        )}
      </div>
    </Container>
  );
}
Home.title = "Institutions";
