import { Routes, Route } from 'react-router-dom';
import Login from '@/Login';
import Dashboard from '@/Dashboard';
import Layout from '@/layouts/Layout';
// import EnquiryManagementAdd from '@/pages/leadManagement/leadManagement/EnquiryManagementAdd';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Route - Login Page */}
      <Route path="/" element={<Login />} />

      {/* Private Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* leadManagement */}

      </Route>
    </Routes>
  );
};

export default AppRoutes;