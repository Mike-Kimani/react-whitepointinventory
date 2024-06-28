import React, {useEffect, useState} from "react";

interface User {
    ApiKey: string;
    CreatedAt: string;
    Email: string;
    ID: string;
    Name: string;
    Password: string;
    UpdatedAt: string;
}

const Users: React.FC =  () => {
    const[userData, setUserData] = useState<User[]>([])
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/v1/user',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const content = await response.json()
            setUserData(content)
            setLoading(false)
        }
        fetchData()
    },[])
    if (loading) {
        return (
            <div>
                <h1>Users</h1>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className="Purchase">
            <h1>USERS</h1>
            <table>
                <thead>
                <tr>
                    <th>Name </th>
                    <th>Payload</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((user) => (
                    <tr key={user.ID}>
                        <td>{user.Name}</td>
                        <td>
                            <pre>
                                {
                                    JSON.stringify({
                                        user_email: user.Email,
                                        user_name: user.Name,
                                        user_id: user.ID,
                                        created_at: user.CreatedAt
                                    }, null,2)
                                }
                            </pre>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Users;