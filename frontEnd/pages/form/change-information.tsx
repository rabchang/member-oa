import { DynamicForm, Form } from "../../components/DynamicForm";
import { useRouter } from "next/router";
import { useUser } from "../../utils/useUser";

const changeInformationDesign = {
  design: {
    version: 1,
    input: [
      { key: "email", label: "email", type: "currentUser" },
      { key: "contact_email", label: "Contact Email", type: "email" },
      { key: "first_name", label: "First Name", type: "text" },
      { key: "last_name", label: "Last Name", type: "text" },
      { key: "chineseName", label: "Chinese Name", type: "text" },
      { key: "title", label: "Title", type: "selectTitle" },
      { key: "initials", label: "Initials", type: "inputInitials" },
      { key: "tel_phone", label: "Tel", type: "text" },
      { key: "address", label: "Address", type: "text" },

      { key: "auditor1", label: "Auditor", type: "selectAuditor", role: "IB" },
    ],
  },
};

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) return "loading...";
  const {
    email,
    contact_email,
    first_name,
    last_name,
    chineseName,
    title,
    initials,
    tel_phone,
    address,
  } = user;
  const onSubmit = async (submitData) => {
    await fetch("/api/applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        formId: 7,
        formData: submitData,
      }),
    });

    router.push("/FormResult");
  };
  return (
    <DynamicForm
      form={changeInformationDesign as Form}
      formData={{
        email,
        contact_email,
        first_name,
        last_name,
        chineseName,
        title,
        initials,
        tel_phone,
        address,
      }}
      onSubmit={onSubmit}
    ></DynamicForm>
  );
}

Page.title = "Change Information";
