import { Container, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  function login(values: any) {
    const url =
      "/api" +
      process.env.NEXT_PUBLIC_FLOWABLE_API_CONTEXT_PATH +
      "/idm-api/users/" +
      values.email;
    console.log(url);
    console.log(values);

    axios
      .get(url, {
        auth: {
          username: process.env.NEXT_PUBLIC_FLOWABLE_API_USERNAME!,
          password: process.env.NEXT_PUBLIC_FLOWABLE_API_PASSWORD!,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == HttpStatusCode.Ok) {
          router.push("/form");
        }
      });
  }
  return (
    <div className="mt-12 p-2">
      <Container>
        <form onSubmit={form.onSubmit(login)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            className="mt-8"
            withAsterisk
            label="Password"
            placeholder="input password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
    </div>
  );
}
