import { AppShell, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { dataMap } from "@/utils/constant";
import { convertJsonSchema, convertUiSchema } from "@/utils/adaptor";

export default function FormDetailPage() {
  const [opened] = useDisclosure();
  const router = useRouter();
  const log = (type: any) => console.log.bind(console, type);

  const schema = useMemo(
    () => convertJsonSchema(dataMap[router.query.id as string]),
    [router.query.id]
  );
  const uiSchema = useMemo(
    () => convertUiSchema(dataMap[router.query.id as string]),
    [router.query.id]
  );

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
