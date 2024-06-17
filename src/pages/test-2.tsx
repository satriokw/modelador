import { AppShell, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";

export default function Test2Page() {
  const [opened] = useDisclosure();

  const log = (type: any) => console.log.bind(console, type);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Stack
          h={300}
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="md"
        >
          <Button variant="default">Task</Button>
          <Button variant="default">History</Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Form
          schema={schema}
          validator={validator}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
        />
      </AppShell.Main>
    </AppShell>
  );
}

const uiSchema = {
  borrower_mail: { "ui:placeholder": "Email" },
  newrenewaltopup: {},
  company_name: {},
  lead_code: {},
  phone_number_borrower: { "ui:placeholder": "62xxx..." },
  company_type: { "ui:placeholder": "Select Company Type" },
  nik_pic: {},
  npwp: {},
  gender: {},
  birth_palce: {},
  birth_date: {},
  religion: { "ui:placeholder": "Select a Religion" },
  marital_status: {},
};

const schema = {
  title: "Form Biz",
  description: "",
  type: "object",
  required: [
    "borrower_mail",
    "newrenewaltopup",
    "company_name",
    "lead_code",
    "phone_number_borrower",
    "company_type",
    "nik_pic",
    "gender",
    "birth_palce",
    "birth_date",
    "religion",
    "marital_status",
  ],
  properties: {
    borrower_mail: { title: "Email Peminjam", type: "string", format: "email" },
    newrenewaltopup: {
      title: "New Renewal Topup",
      type: "string",
      enum: ["Select New Renewal Topup", "New", "Renewal", "Top Up"],
    },
    company_name: {
      title: "Nama Perusahaan Peminjam / Nama Toko (Alphabet Only)",
      type: "string",
    },
    lead_code: { title: "Unique Lead Code", type: "integer" },
    phone_number_borrower: { title: "No. Telepon Peminjam", type: "string" },
    company_type: {
      title: "Tipe Perusahaan",
      type: "string",
      enum: ["Select Company Type", "Home business", "CV", "PT"],
    },
    nik_pic: { title: "NIK PIC", type: "string" },
    npwp: { title: "NPWP", type: "string" },
    gender: {
      title: "Jenis Kelamin",
      type: "string",
      enum: ["Select a Gender", "Male", "Female"],
    },
    birth_palce: { title: "Tempat Lahir", type: "string" },
    birth_date: { title: "Tanggal Lahir", type: "string", format: "date" },
    religion: {
      title: "Agama",
      type: "string",
      enum: [
        "Select a Religion",
        "Islam",
        "Katholik",
        "Kristen",
        "Budha",
        "Hindu",
        "Khonghucu",
        "Other",
      ],
    },
    marital_status: {
      title: "Status Perkawinan",
      type: "string",
      enum: [
        "Select a Marital Status",
        "BELUM KAWIN",
        "KAWIN",
        "CERAI HIDUP",
        "CERAI MATI",
      ],
    },
  },
};
