import "../../assets/css/table.css";

const UserTable = (props) => {
    return (
        <div id="userTableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.userList && props.userList.length > 0 &&
                        props.userList.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {props.selfId !== user._id &&
                                        <span style={{ cursor: "pointer" }} onClick={() => props.handleDeleteUserClicked(user._id)}>X</span>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default UserTable;