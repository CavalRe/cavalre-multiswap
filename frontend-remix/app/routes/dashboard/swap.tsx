import { Form } from "remix";
import {
    Card,
    Container,
    Group,
    SimpleGrid,
    Title
} from "@mantine/core";

import { RequireAuth } from "~/components/Dashboard";

const Swap = () => {

    return (
        <RequireAuth>
            <Container>
                <Form>
                    <Title>Multi-Asset Swap</Title>
                    <Card mt="lg">
                        <SimpleGrid cols={2}>
                            <Group>
                                <Title order={4}>
                                    Assets In
                                </Title>
                            </Group>
                            <Group>
                                <Title order={4}>
                                    Assets Out
                                </Title>
                            </Group>
                        </SimpleGrid>
                    </Card>
                </Form>
            </Container>
        </RequireAuth>
    );
};

export default Swap;
