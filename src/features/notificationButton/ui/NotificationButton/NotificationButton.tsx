import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import Bell from '@/shared/assets/icons/bell.svg';
import { NotificationList } from '@/entities/Notification';
import { Popover } from '@/shared/ui/Popups';
import cls from './NotificationButton.module.scss';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])
    
    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR} >
            <Bell />
        </Button>
    )

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.bell, {}, [className])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    {/* <NotificationList className={cls.notifications}/> */}
                    <div className={cls.notifications}>
                        тут должен быть NotificationList
                    </div>
                    
                </Popover>
            </BrowserView>
           
            <MobileView>
                {/* <Button onClick={onOpenDrawer}>CLICK!</Button> */}
                <div className={cls.pad}>
                    {trigger}
                </div>
                    <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                        {/* <NotificationList /> */}
                        тут должен быть NotificationList
                    </Drawer>
            </MobileView>
        </div>
        
    );
});
