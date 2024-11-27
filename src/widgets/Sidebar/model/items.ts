import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/file-text.svg';
import ProfileIcon from 'shared/assets/icons/user.svg';


export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: "Главная страница",
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: "О сайте",
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: "Профиль",
    },

]