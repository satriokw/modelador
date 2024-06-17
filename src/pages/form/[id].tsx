import { AppShell, Button, Container, Stack, Text } from "@mantine/core";
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
        <Stack mih="100%" justify="space-between">
          <Stack align="stretch" justify="center" gap="md">
            <Text mt="xl" mb="4rem">
              Admin
            </Text>
            <Button>Task</Button>
            <Button variant="default">History</Button>
          </Stack>
          <Button fullWidth>Sign out</Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container fluid>
          <Button
            mb="xl"
            onClick={() => router.push(`/form`)}
          >{`<- Back`}</Button>
          <Form
            schema={schema}
            validator={validator}
            uiSchema={uiSchema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}
          />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
