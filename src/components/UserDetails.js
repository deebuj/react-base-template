import Card from '@mui/material/Card';

export default function UserDetails({ user }) {

    return (
        <Card>
            <div>
                <h4>User Details</h4>
                <ul>
                    <li>Name - {user.name}</li>
                    <li>Phone - {user.phone}</li>
                    <li>Website - {user.website}</li>
                    <li>User name - {user.username}</li>
                </ul>
            </div>
        </Card>
    )

}