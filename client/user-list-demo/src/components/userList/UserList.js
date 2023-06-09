import { UserItem } from "./userItem/UserItem";
import { useState } from "react";
import { UserDetails } from "./userDetails/UserDetails";
import * as UserService from "../../services/UserService";
import { UserEdit } from "./userEdit/UserEdit";
import { UserActions } from "./UserListConstants";
import { UserDelete } from "./userDelete/UserDelete";
import { UserCreate } from "./userCreate/UserCreate";

export const UserList = ({ users, setUsers }) => {
  const [userAction, setUserAction] = useState({ user: null, action: null });

  const userActionClickHandler = (userId, actionType) => {
    UserService.getOne(userId).then((user) => {
      setUserAction({
        user,
        action: actionType,
      });
    });
  };

  const closeHandler = () => {
    setUserAction({ user: null, action: null });
  };

  const userCreateHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { firstName, lastName, email, imageUrl, phoneNumber, ...address } =
      Object.fromEntries(formData);
    const userData = {
      firstName,
      lastName,
      email,
      imageUrl,
      phoneNumber,
      address,
    };

    UserService.create(userData).then((result) => {
      closeHandler();

      setUsers((oldUsers) => [...oldUsers, result.user]);
    });
  };

  const userEditHandler = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    const { firstName, lastName, email, imageUrl, phoneNumber, ...address } =
      Object.fromEntries(formData);
    const userData = {
      firstName,
      lastName,
      email,
      imageUrl,
      phoneNumber,
      address,
    };
    const currentUserId = userAction.user._id;

    UserService.edit(userData, currentUserId).then((result) => {
      closeHandler();

      setUsers((oldUsers) => [
        ...oldUsers.filter((user) => user._id !== currentUserId),
        result.user,
      ]);
    });
  };

  const userDeleteHandler = (event) => {
    event.preventDefault();
    const currentUserId = userAction.user._id;

    UserService.remove(currentUserId).then(() => {
      closeHandler();

      setUsers(oldUsers => oldUsers.filter((user) => user._id !== currentUserId));
    });
  };

  return (
    <>
      <div className="table-wrapper">
        {/* Overlap components  */}

        {userAction.action === UserActions.Details && (
          <UserDetails user={userAction.user} onClose={closeHandler} />
        )}

        {userAction.action === UserActions.Edit && (
          <UserEdit
            user={userAction.user}
            onUserEdit={userEditHandler}
            onClose={closeHandler}
          />
        )}

        {userAction.action === UserActions.Delete && (
          <UserDelete user={userAction.user} onClose={closeHandler} onUserDelete={userDeleteHandler} />
        )}

        {userAction.action === UserActions.Add && (
          <UserCreate onClose={closeHandler} onUserCreate={userCreateHandler} />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                First name
                <svg
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Last name
                <svg
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Email
                <svg
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Phone
                <svg
                  className="icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Created
                <svg
                  className="icon active-icon"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                onActionClick={userActionClickHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn-add btn"
        onClick={() => userActionClickHandler(null, UserActions.Add)}
      >
        Add new user
      </button>
    </>
  );
};
