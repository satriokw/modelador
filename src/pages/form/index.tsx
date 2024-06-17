import { AppShell, Button, Flex, Stack, Table, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import allTasksData from "@/data/tasks.json";
import { useRouter } from "next/router";

export default function FormIndexPage() {
  const router = useRouter();
  const [opened] = useDisclosure();

  const rows = allTasksData.data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.description ?? "-"}</Table.Td>
      <Table.Td>{item.owner ?? "-"}</Table.Td>
      <Table.Td>{item.createTime}</Table.Td>
      <Table.Td>{item.priority}</Table.Td>
      <Table.Td>{item.dueDate ?? "-"}</Table.Td>
      <Table.Td>
        <Button onClick={() => router.push(`/form/${item.id}`)}>
          View Task
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

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
        <Flex
          mih={50}
          gap="md"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
          mb={32}
        >
          <Title order={3}>
            Task Active (Update Time: 2024-06-18 09:00:00)
          </Title>
        </Flex>

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
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}
