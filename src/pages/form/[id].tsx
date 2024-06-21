import { AppShell, Button, Container, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { dataMap } from "@/utils/constant";
import { convertJsonSchema, convertUiSchema } from "@/utils/adaptor";
import Link from "next/link";
import axios, { HttpStatusCode } from "axios";

export default function FormDetailPage() {
  const router = useRouter();
  const [opened] = useDisclosure();
  const [formData, setFormData] = useState(null);

  const log = (type: any) => console.log.bind(console, type);

  function getData() {
    const url =
      "/api" +
      "/flowable-rest/service/runtime/tasks/" +
      router.query.id +
      "/form";

    axios
      .get(url, {
        auth: {
          username: "rest-admin",
          password: "test",
        },
      })
      .then((res) => {
        if (res.status == HttpStatusCode.Ok) {
          console.log("ok");
          setFormData(res.data);
        }
      });
    // setAllFormData(!allFormData);
  }

  useEffect(() => {
    getData();
  }, [router.query.id]);

  const schema = useMemo(() => {
    if (router.query.id !== undefined && formData !== null) {
      return convertJsonSchema(formData);
    } else return [];
  }, [formData, router.query.id]);
  const uiSchema = useMemo(() => {
    if (router.query.id !== undefined && formData !== null) {
      return convertUiSchema(formData);
    } else return [];
  }, [formData, router.query.id]);

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
          {schema.length === 0 ? (
            <div>schema is empty</div>
          ) : (
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
