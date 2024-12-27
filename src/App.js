import UserList from "./components/UserList";
import Posts from "./components/Posts";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonAppBar from "./components/ButtonAppBar";
import { useUserContext } from "./utils/AppContext";

export default function App() {
    const user = useUserContext();
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg">
                <ButtonAppBar />
                <div>
                    <Posts />
                </div>
            </Container>
        </Box>
    );
}
