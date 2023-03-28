import {
  Box,
  Button,
  ButtonTypeMap,
  CircularProgress,
  ExtendButtonBase,
  TextField,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

const useLoading = (actionP) => {
  const [uiLoading, $uiLoading] = useState(false);

  const action = async () => {
    if (uiLoading) return;
    $uiLoading(true);
    await actionP();
    // force 500ms delay to reduce blink
    setTimeout(() => {
      $uiLoading(false);
    }, 500);
  };
  return { action, loading: uiLoading };
};
export { useLoading };

const AsyncButton: ExtendButtonBase<
  ButtonTypeMap<{ action: any; children?: ReactNode }, "button">
> = ({ action }) => {
  const { action: actionW, loading } = useLoading(action);
  return (
    <Box sx={{m: "8px 0", position: "relative" }}>
      <Button
        variant="contained"
        disabled={loading}
        onClick={actionW}
        fullWidth
      >
        Submit
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: "green",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};
export { AsyncButton };

const jsonApiData: <T>(fetchPromise: Promise<Response>) => Promise<T> = (
  fetchPromise
) => {
  return fetchPromise.then((x) => x.json()).then((x) => x.data);
};

// const Story = () => {
//   const handleSubmit = (data) => {
//     312313;
//     fetch("/123", { method: "POST", body: JSON.stringify });
//     loading = true;
//     const res = await axios.post("", {});
//     loading = false;
//   };
//   return (
//     <div>
//       <TextField></TextField>
//       <AsyncButton
//         action={async () => {
//           const res = await jsonApiData(fetch("/api"));
//         }}
//       />
//     </div>
//   );
// };
