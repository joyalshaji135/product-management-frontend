import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/contexts/ProtectedRoute';
import ProductManagementEdit from '@/pages/productManagement/ProductManagementEdit';
import ProductManagementView from '@/pages/productManagement/ProductManagementView';
import ProductManagementList from '@/pages/productManagement/ProductManagementList';
import ProductManagementAdd from '@/pages/productManagement/ProductManagementAdd';
import CategoryManagementAdd from '@/pages/categoryManagement/CategoryManagementAdd';
import CategoryManagementList from '@/pages/categoryManagement/CategoryManagementList';
import CategoryManagementView from '@/pages/categoryManagement/CategoryManagementView';
import CategoryManagementEdit from '@/pages/categoryManagement/CategoryManagementEdit';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Category Management */}
        <Route path="/category-management" element={<CategoryManagementAdd />} />
        <Route path="/category-management-list" element={<CategoryManagementList />} />
        <Route path="/category-management/view/:id" element={<CategoryManagementView />} />
        <Route path="/category-management/edit/:id" element={<CategoryManagementEdit />} />

        {/* Product Management */}
        <Route path="/product-management" element={<ProductManagementAdd />} />
        <Route path="/product-management-list" element={<ProductManagementList />} />
        <Route path="/product-management/view/:id" element={<ProductManagementView />} />
        <Route path="/product-management/edit/:id" element={<ProductManagementEdit />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;