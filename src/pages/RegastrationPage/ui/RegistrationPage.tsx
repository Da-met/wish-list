import LoginForm from '@/features/AuthByUserName/ui/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import cls from './RegistrationPage.module.scss';
import { Page } from '@/widgets/Page/Page';
import { RegistrationForm } from '@/features/Registration';


const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/wishes');
  };

  return (
    <Page>
      <div className={cls.RegistrationPage}>
        <RegistrationForm onSuccess={handleSuccess} />
      </div>
    </Page>
  );
};

export default RegistrationPage;