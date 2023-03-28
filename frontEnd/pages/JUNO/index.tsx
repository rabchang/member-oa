import Container from "@mui/material/Container";
import NoSsr from "@mui/material/NoSsr";
import { useRouter } from "next/router";

import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";

import Button from "@mui/material/Button";
import dayjs from "dayjs";
//import rows from "./dataSample.json";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from "@mui/material";
import chartsData from "./dataSampleChart.json";
import rows from "./response.json";

export function BasicTable() {
  const [skip, $skip] = useState(0);
  const [limit, $limit] = useState(10);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Data Source</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Event Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(skip, skip + limit).map((row) => (
              <TableRow
                key={row.time}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dayjs(parseInt(row.time) / 1000).toISOString()}
                </TableCell>
                <TableCell align="right">{row.datasource}</TableCell>
                <TableCell align="right">{row.data}</TableCell>
                <TableCell align="right">{row.eventtype}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button onClick={() => $skip(skip - limit)}>Previous</Button>
        {skip / limit + 1}/{Math.ceil(rows.length / limit)}
        <Button onClick={() => $skip(skip + limit)}>Next</Button>
      </div>
    </div>
  );
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const eventType = {};
chartsData.map((x) => (eventType[x.eventType] = 1));
const queryType = (type) => {
  return chartsData.filter((x) => x.eventType === type);
};

export function MyChart() {
  // const a = chartsData
  //   .filter((x) => x.eventType === "AppsRunningInfo")
  //   .map((x) => {
  //     let res = {
  //       time: x.time,
  //       cpu: parseFloat(JSON.parse(x.data).CPUPercent),
  //     };
  //     return res;
  //   });
  // console.log(a);
  const a = [
    {
      time: 1667982491,
      cpuTemp: 52.0,
    },
    {
      time: 1667982492,
      cpu: 52.0,
    },
    {
      time: 1667982493,
      cpu: 53.0,
    },
    {
      time: 1667982494,
      cpu: 51.0,
    },
    {
      time: 1667982501,
      cpu: 51.0,
    },
    {
      time: 1667982503,
      cpu: 51.0,
    },
    {
      time: 1667982504,
      cpu: 51.0,
    },
    {
      time: 1667982505,
      cpu: 53.0,
    },
    {
      time: 1667982512,
      cpu: 53.0,
    },
    {
      time: 1667982514,
      cpu: 53.0,
    },
    {
      time: 1667982515,
      cpu: 53.0,
    },
    {
      time: 1667982516,
      cpu: 53.0,
    },
    {
      time: 1667982523,
      cpu: 53.0,
    },
  ];
  return (
    <LineChart
      width={800}
      height={300}
      data={a}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        tickFormatter={(ts) => {
          return dayjs(ts * 1000).format("hh:MM:ss");
        }}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="cpu"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
  );
}

export default function Home({ func }) {
  const router = useRouter();
  const [sTime, $sTime] = useState();
  const [eTime, $eTime] = useState();

  return (
    <Container component="main" maxWidth="md">
      <FormControl>
        <Stack direction="row" spacing={2}>
          <div>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              style={{ width: "150px" }}
            >
              {Object.keys(eventType).map((x) => {
                return (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <DatePicker
            value={sTime}
            onChange={$sTime}
            renderInput={(params) => <TextField {...params} />}
          ></DatePicker>
          <DatePicker
            value={eTime}
            onChange={$eTime}
            renderInput={(params) => <TextField {...params} />}
          ></DatePicker>
          <Button variant="contained">显示</Button>
        </Stack>
      </FormControl>
      <NoSsr>
        <MyChart></MyChart>
      </NoSsr>
      <BasicTable></BasicTable>
    </Container>
  );
}