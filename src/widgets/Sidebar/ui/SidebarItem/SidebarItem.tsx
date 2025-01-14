import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';

import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';



interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData)
    if(item.authOnly && !isAuth) {
        return null
    }


    return (
        <AppLink 
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
            theme={AppLinkTheme.SECONDARY} 
            to={item.path} 
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{item.text}</span>
        </AppLink>
    )
}

export default SidebarItem;