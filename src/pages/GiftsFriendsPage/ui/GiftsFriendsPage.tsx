import cls from './GiftsFriendsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { GiftsFriendsList } from '@/entities/GiftsFriends';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_IMG, APP_NAME } from '@/shared/config/appName/appName';


interface GiftsFriendsPageProps {
    className?: string;
}

const GiftsFriendsPage = ({className}: GiftsFriendsPageProps) => {


    return (
        <>
            {/*  SEO */}
            <SeoHead
                title={`Подарки друзьям — ${APP_NAME}`}
                description={`
                    Смотрите подарки, которые вы планируете подарить своим друзьям. 
                    Управляйте резервированием и идеями сюрпризов.
                `}
                url={`https://vishy.vercel.app/gifts_friends`}
                // image={APP_IMG}
            />
            <Page >
                <div className={cls.GiftsFriendsPage}>
                    <Text title={'Подарки друзьям'} className={cls.title} titleTag="h1"/>
                    <GiftsFriendsList />
                </div>
            </Page>
        </>
    )
}

export default GiftsFriendsPage;