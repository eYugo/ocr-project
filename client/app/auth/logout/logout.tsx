'use client';
import { useRouter } from 'next/navigation';
// import { logout as apiLogout } from '../../services/api-auth';

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    // try {
    //   await apiLogout();
    // } catch (error) {
    //   console.error('Logout failed:', error);
    // } finally {
    //   localStorage.removeItem('accessToken');
    //   localStorage.removeItem('refreshToken');
    //   router.push('/login');
    // }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/');
  };

  return logout;
};
