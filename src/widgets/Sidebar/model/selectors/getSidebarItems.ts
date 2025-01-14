import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";

import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/file-text.svg';
import ProfileIcon from 'shared/assets/icons/user.svg';
import WishesIcon from 'shared/assets/icons/grid.svg';
import { SidebarItemType } from "../types/sidebar";



export const getSidebarItems = createSelector (
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
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
                path: RoutePath.wishes,
                Icon: WishesIcon,
                text: "Желания",
                // authOnly: true,
            },
        ];
        if(userData) {
            sidebarItemsList.push(
               {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: "Профиль",
                    authOnly: true,
                }, 
            )
            
        }
        return sidebarItemsList;
    }
)