import { memo } from "react";
import cls from './CompilationDetails.module.scss';
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { AppImage } from "@/shared/ui/AppImage";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { Text, TextAlign, TextSize } from "@/shared/ui/Text/Text";
import { CompilationDetailsItem } from "../CompilationDetailsItem/CompilationDetailsItem";


interface CompilationDetailsProps {
    className?: string;
    id?: string;
}

export const CompilationDetails = memo((props: CompilationDetailsProps) => {


    return ( 
        // <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>

            <div className={cls.CompilationDetails}>
                <Button theme={ButtonTheme.BACKGROUND}> {`< Вернуться`} </Button>
                <div className={cls.preview}>
                    <AppImage 
                        fallback={<Skeleton width={397} height={300}/>}
                        src={`https://thumbs.dreamstime.com/b/pop-art-hand-gift-box-vector-illustration-success-expression-idea-vintage-comic-cartoon-gesture-person-people-stylized-86482704.jpg`} 
                        className={cls.preview_img}
                    />
                    <div className={cls.preview_description}>
                        <Text size={TextSize.L} align={TextAlign.CENTER} title="Самые популярные подарки из ваших вишлистов в январе 2025"/>
                        <Text size={TextSize.L} align={TextAlign.CENTER} text="Наша традиционная подборка ваших самых желанных подарков в первый месяц 2025 года."/>
                        <Text className={cls.time} align={TextAlign.CENTER} text="04 02 2025"/>
                    </div>
                </div>
                <div className={cls.CompilationDetails_list}>
                    <CompilationDetailsItem />
                    <CompilationDetailsItem />
                    <CompilationDetailsItem />
                    <CompilationDetailsItem />
                    <CompilationDetailsItem />
                </div>
                <Button theme={ButtonTheme.BACKGROUND}> {`< Вернуться`} </Button>
            </div>


    )
})