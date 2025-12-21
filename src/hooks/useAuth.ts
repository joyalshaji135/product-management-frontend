// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { loginUser, logoutUser, loadUserFromStorage, clearError } from '@/store/slices/authSlice';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  // Memoize loadUser to prevent infinite loops
  const loadUser = useCallback(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Memoize other actions
  const login = useCallback((credentials: { email: string; password: string }) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: authState.isAuthenticated,

    // Memoized Actions
    login,
    logout,
    loadUser,
    clearError: clearErrorAction,

    // Derived state
    fullName: authState.user 
      ? `${authState.user.firstName} ${authState.user.lastName}` 
      : '',
    userRole: authState.user?.role || null,
  };
};