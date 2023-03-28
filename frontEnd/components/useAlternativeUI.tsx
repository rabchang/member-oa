import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { fetcher, JSONResultWrapper } from "../utils/fetcher";

function useAlternativeUI<T>(key: string): { alternativeUI; data; mutate: () => void } {
  const [slow, $slow] = useState(false);
  const onLoadingSlow = () => {
    $slow(true);
  };
  const swrRes = useSWR<JSONResultWrapper<T>>(key, fetcher, { onLoadingSlow });
  const { data, error, mutate } = swrRes;

  let alternativeUI;
  if (error || (data && !data.ok)) {
    alternativeUI = (
      <div>
        <h1>Network Error!</h1>
        {/* <div>Code: {data?.code || 500}</div>
        <div>Message: {data?.msg || "Internal Error"}</div> */}
        <ButtonGroup>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            Back to Home Page
          </Button>
        </ButtonGroup>
      </div>
    );
  } else if (!data) {
    if (slow) {
      alternativeUI = (
        <div>
          <h1>Still Loading...</h1>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Try Reload
          </Button>
        </div>
      );
    } else {
      alternativeUI = (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  } else if (!data.ok) {
  }

  return {
    alternativeUI,
    data,
    mutate,
  };
}

export { useAlternativeUI };
