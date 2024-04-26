import { useState, useEffect } from "react";
import ApiHelper from "../api/ApiHelper";
import UserDetails from "./UserDetails";

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = () => {
        ApiHelper.getData("users").then((json) => {
            setUsers(json);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Pass an empty array to only call the function once on mount.

    return (
        <Demo>
            <h1>User List</h1>
            {users &&
                <List>{
                    users.map(item => (
                        <ListItem key={item.id}
                            onClick={() => setSelectedUser(item)}
                        ><ListItemText>{item.name}<br/>{item.email}</ListItemText></ListItem>)
                    )
                }</List>}

            {selectedUser &&
                <UserDetails user={selectedUser}></UserDetails>
            }

        </Demo>

    );

}