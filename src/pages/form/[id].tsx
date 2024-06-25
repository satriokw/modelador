import { AppShell, Button, Container, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { convertJsonSchema, convertUiSchema } from "@/utils/adaptor";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function FormDetailPage() {
  const router = useRouter();
  const [opened] = useDisclosure();

  const log = (type: any) => console.log.bind(console, type);

  const url =
    "/api" +
    "/flowable-rest/service/runtime/tasks/" +
    router.query.id +
    "/form";

  const {
    data: form,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["form", router.query.id],
    queryFn: async () => {
      const res = await axios.get(url, {
        auth: {
          username: "rest-admin",
          password: "test",
        },
      });
      return res.data;
    },
    enabled: router.query.id !== undefined,
    retry: false,
  });

  const schema = useMemo(() => {
    if (router.query.id !== undefined && form !== undefined) {
      return convertJsonSchema(form);
    } else return [];
  }, [form, router.query.id]);
  const uiSchema = useMemo(() => {
    if (router.query.id !== undefined && form !== undefined) {
      return convertUiSchema(form);
    } else return [];
  }, [form, router.query.id]);

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
          <Link href="/form">
            <Button mb="xl">{`<- Back`}</Button>
          </Link>
          {isError && <Text>{error.message}</Text>}
          {isFetching && <Text>Loading ...</Text>}
          {form && (
            <Form
              schema={schema}
              validator={validator}
              uiSchema={uiSchema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")}
            />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
