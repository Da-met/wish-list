import cls from './NotificationsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useEffect, useState } from 'react';
import { getFriends } from '@/pages/FriendsPage/model/slice/friendsPageSlice';
import dayjs from 'dayjs';
import { Friend } from '@/pages/FriendsPage';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_NAME } from '@/shared/config/appName/appName';


interface NotificationsPageProps {
    className?: string;
}

export const commonHolidays = [
    { name: "Новый год", date: "01-01" },
    { name: "Рождество", date: "01-07" },
    { name: "День защитника Отечества", date: "02-23" },
    { name: "Международный женский день", date: "03-08" },
    { name: "День труда", date: "05-01" },
    { name: "День Победы", date: "05-09" },
    { name: "День России", date: "06-12" },
    { name: "День знаний", date: "09-01" },
    { name: "День учителя", date: "10-05" },
    { name: "День народного единства", date: "11-04" },
    { name: "День Святого Валентина", date: "02-14" },
];

  
interface UpcomingEvent {
    type: 'birthday' | 'holiday';
    date: dayjs.Dayjs;
    text: string;
}



const NotificationsPage = ({className}: NotificationsPageProps) => {

    const { id } = useParams<{id: string}>();
    if (!id) {
        return <Text text='Профиль не найден' />;
    }

    const user = useSelector(getUserAuthData);
    const friends: Friend[] = useSelector(getFriends.selectAll);
    const [events, setEvents] = useState<UpcomingEvent[]>([]);

    useEffect(() => {
        const now = dayjs();
        const result: UpcomingEvent[] = [];
            
        // Дни рождения
        friends.forEach((friend: Friend) => {
            if (!friend.birthday) return;
            const birthday = dayjs(friend.birthday).year(now.year());
            const daysDiff = birthday.diff(now, 'day');
            if (daysDiff >= 0 && daysDiff <= 10) {
            result.push({
                type: 'birthday',
                date: birthday,
                text: `🎂 У ${friend.name} день рождения через ${daysDiff} дней`,
            });
            }
        });

        // Общие праздники
        commonHolidays.forEach((holiday) => {
            const holidayDate = dayjs(`${now.year()}-${holiday.date}`);
            const daysDiff = holidayDate.diff(now, 'day');
            if (daysDiff >= 0 && daysDiff <= 10) {
            result.push({
                type: 'holiday',
                date: holidayDate,
                text: `🎉 Скоро ${holiday.name} — через ${daysDiff} дней`,
            });
            }
        });

        setEvents(result.sort((a, b) => a.date.diff(b.date)));
      }, [friends]);


    return (
        <>
            <SeoHead
                title={`Ближайшие события — ${APP_NAME}`}
                description={`
                    Смотрите дни рождения друзей и праздники, которые приближаются. 
                    Планируйте подарки заранее, чтобы порадовать близких.
                `}
                url={`https://vishi.ru/notifications/${id}`}
                image="/images/preview-events.jpg"
            />
            <Page >
                {/* <div className={cls.profilePageModule}>
                    КАЛЕНДАРЬ
                </div> */}
                <div className={cls.wrapper}>
                    <Text title={'Ближайшие события'} className={cls.title} titleTag="h1"/>

                    <ul className={cls.listEvent}>
                        {events.length === 0 && <p className={cls.p}>Пока ничего нет ✨</p>}
                        {events.map((event, idx) => (
                        <li className={cls.eventLi} key={idx}>{event.text}</li>
                        ))}
                    </ul>
                </div>
                
            </Page>
        </>
    )
}

export default NotificationsPage;

