import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './PageError.module.scss';
import { Button } from "@/shared/ui/Button/Button";


interface PageErrorProps {
    className?: string;
}

export const PageError = ({className}: PageErrorProps ) => {

    const reloadPage = () => {
        location.reload();
    }

    return (
        <div className={classNames(cls.PageError, {}, [])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button onClick={reloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};