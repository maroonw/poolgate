import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import PoolsList from './features/pools/PoolsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditPool from './features/pools/EditPool'
import NewPool from './features/pools/NewPool'
import Prefretch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<Prefretch />}>

          <Route path="dash" element={<DashLayout />}>    {/* Start Dash */}

            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="pools">
              <Route index element={<PoolsList />} />
              <Route path=":id" element={<EditPool />} />
              <Route path="new" element={<NewPool />} />
            </Route>

          </Route>     {/* End Dash */}

        </Route>
      </Route>
    </Routes>
  );
}

export default App;