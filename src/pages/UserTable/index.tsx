import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";

const UserTable: React.FC<{}> = () => {
  const { users, setActiveUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickUserRow = (user: IUser) => {
    setActiveUser(user);
    navigate("/timesheet");
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleClickUserRow(user)} style={{ cursor: "pointer" }}>
                <td>
                  <img
                    className="user-table-avatar"
                    src={user.avatar?.link}
                    alt={`Avatar of ${user.firstName} ${user.lastName}`}
                  />
                </td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserTable;
