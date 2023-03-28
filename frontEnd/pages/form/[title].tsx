import { useRouter } from "next/router";
import { DynamicForm, Form } from "../../components/DynamicForm";


import { useAlternativeUI } from "../../components/useAlternativeUI";


export default function FormPage({ func }) {
  const router = useRouter();
  const { title } = router.query;
  const { isReady } = router;

  const { alternativeUI, data } = useAlternativeUI<Form>(
    isReady ? "/api/form?title=" + router.query["title"] : null
  );

  if (!isReady) return "loading...";

  const onSubmit = async (submitData) => {
    await fetch("/api/applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        formId: data.data.id,
        formData: submitData,
      }),
    });

    router.push("/FormResult");
  };
  return (
    alternativeUI || (
      <>
        <h1>{data.data.title}</h1>
        <DynamicForm form={data.data} onSubmit={onSubmit}></DynamicForm>
      </>
    )
  );
}
