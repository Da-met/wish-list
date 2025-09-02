import React from "react";
import { Page } from "@/widgets/Page/Page";
import cls from './AboutPage.module.scss';
import { Text, TextSize } from "@/shared/ui/Text/Text";

import IconFriends from '../../../shared/assets/icons/about-friends.svg';
import IconList from '../../../shared/assets/icons/about-list.svg';
import IconReserv from '../../../shared/assets/icons/about-check.svg';
import IconPlan from '../../../shared/assets/icons/about-calendar.svg';
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { getRouteList, getRouteRegistration } from "@/shared/const/router";
import { SeoHead } from "@/shared/ui/SeoHead/SeoHead";
import { APP_NAME } from "@/shared/config/appName/appName";



const AboutPage = () => {
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const handleClick = () => {
        if (authData) {
            navigate(getRouteList());
        } else {
            navigate(getRouteRegistration());
        }
    };


    return (
        <>
            {/*  SEO */}
            <SeoHead
                title={`О сайте — ${APP_NAME}`}
                description={`
                    Просматривайте и управляйте всеми вашими списками подарков в ${APP_NAME}, добавляйте новые идеи и делитесь с друзьями.
                `}
                url="/about"
                image="/images/preview-about.jpg"
            />
            <Page >
                <div className={cls.wrapper}>
                    {/* Заголовок */}
                    <div className={cls.padding}>
                        <div className={cls.ListPage}>
                            <Text title={'О сайте'} className={cls.title} titleTag="h1"/>
                        </div>

                        {/* Краткое описание */}
                        <p className={cls.description}>
                            Этот сервис помогает хранить идеи подарков, делиться ими с друзьями и
                            бронировать сюрпризы, чтобы они оставались сюрпризами.
                        </p>

                        {/* Функции */}
                        <div className={cls.canIDo}>
                            <div className={cls.canIDoName}>Что вы можете сделать:</div>
                            <div className={cls.centr} >
                                <div className={cls.wrapperCards}>
                                    <div className={cls.card}>
                                        <IconList/>
                                        <p>Создавать списки подарков для любых событий</p>
                                    </div>
                                    <div className={cls.card}>
                                        <IconFriends/>
                                        <p>Добавлять друзей и смотреть их идеи</p>
                                    </div>
                                    <div className={cls.card}>
                                        <IconReserv/>
                                        <p>Резервировать подарки, чтобы их никто не купил раньше</p>
                                    </div>
                                    <div className={cls.card}>
                                        <IconPlan/>
                                        <p>Планировать сюрпризы заранее</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Как создать лист — пошагово */}
                        <div className={cls.stepsSection}>
                            <div className={cls.stepsTitle}>Как создать</div>
                            <div className={cls.stepsGrid}>
                                <Text size={TextSize.S} className={cls.step}
                                    title="Составьте лист желаемых подарков" 
                                    text="Например: День рождения, Новый год или Свадьба."
                                />
                                <Text size={TextSize.S} className={cls.step}
                                    title="Добавьте подарки" 
                                    text="Вставьте ссылку, загрузите фото и кратко опишите идею."
                                />
                                <Text size={TextSize.S} className={cls.step}
                                    title="Поделитесь с друзьями" 
                                    text="Отправьте ссылку — близкие увидят, что вам действительно нужно."
                                />
                                <Text size={TextSize.S} className={cls.step}
                                    title="Резервируйте" 
                                    text="Друзья отмечают, что берут подарок, и дубликатов не будет."
                                />
                            </div>
                        

                        {/* Немного о миссии */}
                        <div className={cls.bottomText}>
                            <p className={cls.description}>
                            Мы создали этот сервис, потому что часто забывали идеи подарков или
                            не знали, что подарить. Теперь всё хранится в одном месте, и каждый
                            праздник — это радость без лишнего стресса.
                            </p>
                        </div>

                        <div className={cls.goBlock}>
                            <Text
                                title={authData ? 'Начните с первого списка' : 'Присоединяйтесь и начните'}
                                text={
                                authData
                                    ? 'Создайте свой первый список и пригласите друзей.'
                                    : 'Зарегистрируйтесь, чтобы начать создавать списки и делиться ими.'
                                }
                                size={TextSize.S}
                                className={cls.ctaText}
                            />
                            <Button onClick={handleClick} theme={ButtonTheme.BACKGROUND}>
                                {authData ? 'Создать первый список' : 'Зарегистрироваться'}
                            </Button>
                        </div>

                        {/* Контакты */}
                        {/* <div className="mt-10 text-center">
                            <p className="text-gray-600">
                            Есть предложения или вопросы? Пишите на{" "}
                            <a
                                href="mailto:support@example.com"
                                className="text-blue-500 hover:underline"
                            >
                                support@example.com
                            </a>
                            </p>
                        </div> */}
                    </div>
                    </div>
                </div>
            </Page>
        </>
    );
};

export default AboutPage;


