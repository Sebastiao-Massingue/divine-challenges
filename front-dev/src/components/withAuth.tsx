import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ComponentProps {
  email: string;
  password: string;
}

const withAuth = (WrappedComponent: React.ComponentType<ComponentProps>) => {
  const AuthComponent = (props: ComponentProps) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If the user is not authenticated, redirect to the login page
        router.push('/users/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
