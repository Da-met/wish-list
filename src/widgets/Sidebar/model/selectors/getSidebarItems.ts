import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import { getRouteAbout, getRouteMain, getRouteProfile, getRouteFriends, getRouteWishes, getRouteCalendar, getRouteGiftsFriends, getRouteNotifications, getRouteList } from "@/shared/const/router";
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/file-text.svg';
import ProfileIcon from '@/shared/assets/icons/user.svg';
import FriendsIcon from '@/shared/assets/icons/users.svg';
import WishesIcon from '@/shared/assets/icons/grid.svg';
import GiftIcon from '@/shared/assets/icons/gift.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import BellIcon from '@/shared/assets/icons/bell.svg';
import { SidebarItemType } from "../types/sidebar";



export const getSidebarItems = createSelector (
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            // {
            //     path: getRouteMain(),
            //     Icon: MainIcon,
            //     text: "Главная страница",
            // },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: "О сайте",
            },
            
            {
                path: getRouteWishes(),
                Icon: WishesIcon,
                text: "Желания",
                // authOnly: true,
            },
        ];
        if(userData) {
            sidebarItemsList.push(
                {
                    path: getRouteList(),
                    Icon: AboutIcon,
                    text: "Листы",
                    authOnly: true,
                }, 
               {
                    path: getRouteProfile(String(userData.id)),
                    Icon: ProfileIcon,
                    text: "Профиль",
                    authOnly: true,
                }, 
                {
                    path: getRouteFriends(String(userData.id)),
                    Icon: FriendsIcon,
                    text: "Друзья",
                    authOnly: true,
                }, 
                {
                    path: getRouteGiftsFriends(String(userData.id)),
                    Icon: GiftIcon,
                    text: "Подарки друзьям",
                    authOnly: true,
                }, 
                // {
                //     path: getRouteCalendar(String(userData.id)),
                //     Icon: CalendarIcon,
                //     text: "Календарь",
                //     authOnly: true,
                // }, 
                {
                    path: getRouteNotifications(String(':id')),
                    Icon: BellIcon,
                    text: "Ближайшие события",
                    authOnly: true,
                }, 
            )
            
        }
        return sidebarItemsList;
    }
)