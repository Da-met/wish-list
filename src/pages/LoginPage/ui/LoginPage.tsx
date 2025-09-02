import LoginForm from '@/features/AuthByUserName/ui/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import cls from './LoginPage.module.scss';
import { Page } from '@/widgets/Page/Page';


const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/wishes');
  };

  return (
    <Page>
      <div className={cls.LoginPage}>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </Page>
  );
};

export default LoginPage;