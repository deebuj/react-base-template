import UserList from "./components/UserList";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonAppBar from "./components/ButtonAppBar";

export default function App() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
            <ButtonAppBar/>
            <div>
                <div >                    
                    <UserList></UserList>
                </div>
            </div>
        </Container>
        </Box>
    );
}
