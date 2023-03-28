import dayjs from "dayjs";

const isoTime2ChinaDate = (str) => {
  return dayjs(str).format("YYYY/MM/DD HH:mm:ss");
};

export { isoTime2ChinaDate };
