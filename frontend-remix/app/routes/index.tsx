import {
    AppShell,
    Container
} from '@mantine/core';

import { Header } from "~/components/Dashboard";

const Welcome = () => {

    return (
        <AppShell
            padding="md"
            header={<Header />}
        >
            <Container>
                <h1>Welcome</h1>
            </Container>
        </AppShell>
    )
};

export default Welcome;
