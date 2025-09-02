import cls from './ProfilePage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { EditableProfileCard } from '@/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard';
import { Text } from '@/shared/ui/Text/Text';



interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const { id } = useParams<{id: string}>();

    if (!id) {
        return <Text text='Профиль не найден' />;
    }

    return (
        // <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <>
            <Page >
                <div className={cls.profilePageModule}>
                    {/* <ProfilePageHeader/> */}
                    <EditableProfileCard id={id}/>
                </div> 
            </Page>
        </>    
        // </DynamicModuleLoader>
    )
}

export default ProfilePage;