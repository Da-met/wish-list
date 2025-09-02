import cls from './CalendarPage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/Text/Text';


interface CalendarPageProps {
    className?: string;
}

const CalendarPage = ({className}: CalendarPageProps) => {

    const { id } = useParams<{id: string}>();

    if (!id) {
        return <Text text='Профиль не найден' />;
    }



    return (

            <Page >
                <div className={cls.profilePageModule}>
                    КАЛЕНДАРЬ
                </div>
                
            </Page>

    )
}

export default CalendarPage;