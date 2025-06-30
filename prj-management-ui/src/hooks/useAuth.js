import Cookies from 'js-cookie';

export function useAuth() {
  const token = Cookies.get('access');

  const isAuthenticated = !!token;

  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
  };

  return { isAuthenticated, logout };
}



