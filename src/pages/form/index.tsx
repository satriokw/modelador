import {
  AppShell,
  Button,
  Center,
  Flex,
  Loader,
  LoadingOverlay,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function FormIndexPage() {
  const [opened] = useDisclosure();

  const username = "santo";
  const url =
    "/api" + "/flowable-rest/service/runtime/tasks?assignee=" + username;

  const load = true;
  const {
    data: allTasks,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axios.get(url, {
        auth: {
          username: "rest-admin",
          password: "test",
        },
      });
      return res.data;
    },
  });

  const now = new Date();

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
        <Flex
          gap="md"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
          my={32}
        >
          <Title order={4}>
            {`Task Active (Update Time: ${now.toLocaleDateString("ja-JP")})`}
          </Title>
        </Flex>

        {allTasks?.data ? (
          <Table withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Owner</Table.Th>
                <Table.Th>Created Time</Table.Th>
                <Table.Th>Priority</Table.Th>
                <Table.Th>Due Date</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {allTasks?.data.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.description ?? "-"}</Table.Td>
                  <Table.Td>{item.owner ?? "-"}</Table.Td>
                  <Table.Td>{item.createTime}</Table.Td>
                  <Table.Td>{item.priority}</Table.Td>
                  <Table.Td>{item.dueDate ?? "-"}</Table.Td>
                  <Table.Td>
                    <Link href={"form/" + item.id}>
                      <Button>View Task</Button>
                    </Link>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Center h={300}>
            {isFetching && <Loader />}
            {isError && <Text>Data not found</Text>}
          </Center>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
