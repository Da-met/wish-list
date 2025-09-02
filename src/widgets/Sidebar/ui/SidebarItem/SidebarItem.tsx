import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import MainIcon from '@/shared/assets/icons/home.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';



interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
    onClick?: () => void; // новый проп
}

const SidebarItem = ({ item, collapsed, onClick }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData)
    if(item.authOnly && !isAuth) {
        return null
    }


    return (
        <AppLink 
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
            activeClassName={cls.active}
            theme={AppLinkTheme.SECONDARY} 
            to={item.path}
            onClick={onClick}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{item.text}</span>
        </AppLink>
    )
}

export default SidebarItem;