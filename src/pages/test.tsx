import {
  AppShell,
  Button,
  Container,
  Flex,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function TestPage() {
  const [opened] = useDisclosure();
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <Button variant="default">View Task</Button>
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
          <Title>Task Active (Update Time: 2024-06-18 09:00:00)</Title>
        </Flex>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Element position</Table.Th>
              <Table.Th>Element name</Table.Th>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>Atomic mass</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
}
