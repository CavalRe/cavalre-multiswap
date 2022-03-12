import { useNavigate } from 'remix';
import {
    AppShell,
    Button,
    Container,
    Header
} from '@mantine/core';

const GoToDashboard = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/dashboard");
    }

    return (
        <Header height={60} p="xs">
            <Button onClick={handleOnClick}>Go to Dashboard</Button>
        </Header>
    )
};

const Welcome = () => {

    return (
        <AppShell
            padding="md"
            header={<GoToDashboard />}
        >
            <Container>
                <h1>Welcome</h1>
            </Container>
        </AppShell>
    )
};

export default Welcome;
