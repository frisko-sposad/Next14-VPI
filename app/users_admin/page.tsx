'use client';
import Header from '@/components/Header/header';
import UserAdd from '../components/user_add';
import UserDel from '../components/user_del';
import UserInfo from '../components/user_info';
import UserUpdate from '../components/user_update';
import UsersInfo from '../components/users_info';

const UsersAdmin = () => {
  return (
    <>
      <Header />
      <UserAdd />
      <br></br>
      <UserUpdate />
      <br></br>
      <UserDel />
      <UserInfo
        params={{
          userId: 2,
        }}
      />
      <UsersInfo />
    </>
  );
};

export default UsersAdmin;
