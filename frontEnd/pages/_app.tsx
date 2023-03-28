import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Left } from "../components/Left";
import { Left as LeftBes } from "../components/LeftBES";
import { OuterResponsive } from "../components/OuterResponsive";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const left = router.asPath.startsWith("/BES3") ? <LeftBes /> : <Left />;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <div>
          <OuterResponsive
            left={left}
            title={Component.title || Component.name || "MEMBER"}
          >
            <Component {...pageProps} />
          </OuterResponsive>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
