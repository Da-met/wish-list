import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cls from './WishesPage.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWishes, wishesPageReducer } from '../../model/slice/wishesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getWishesPageError, getWishesPageInited, getWishesPageIsLoading } from '../../model/selectors/wishesPageSelectors';
import { Page } from '@/widgets/Page/Page';
import { fetchNextWishesPage } from '../../model/services/fetchNextWishesPage/fetchNextWishesPage';
import { initWishesPage } from '../../model/services/initWishesPage/initWishesPage';
import { WishesPageFilters } from '../WishesPageFilters/WishesPageFilters';
import { WishList } from '@/entities/Wish';
import { useSearchParams } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import CompilationsPage from '../CompilationsPage/CompilationsPage';
import { SeoHead } from '@/shared/ui/SeoHead/SeoHead';
import { APP_NAME } from '@/shared/config/appName/appName';
import { Text, TextSize } from "@/shared/ui/Text/Text";





interface WishesPageProps {
    className?: string;
}


const reducers: ReducersList = {
	wishesPage: wishesPageReducer,
}


const WishesPage = (props: WishesPageProps) => {
    const { className } = props;
	const dispatch = useAppDispatch();

	const wishes = useSelector(getWishes.selectAll);
	
	const isLoading = useSelector(getWishesPageIsLoading);
	// const error = useSelector(getWishesPageError);
	// const inited = useSelector(getWishesPageInited);

	const [isLenta, setIsLenta] = useState(true);
	const onOpenLenta = useCallback(() => {
		setIsLenta(true)
	}, [])
	const onOpenCompilation = useCallback(() => {
		setIsLenta(false)
	}, [])

	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
        if (!isLoading) {
			dispatch(fetchNextWishesPage());
		}
    }, [dispatch, isLoading]);
	
	useInitialEffect(() => {
		dispatch(initWishesPage(searchParams))
	})

    return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			{/*  SEO */}
			<SeoHead
				title={`${APP_NAME} — списки подарков и идей`}
				description={`
					Создавайте списки подарков, бронируйте желания друзей и делитесь вдохновением. 
					${APP_NAME} — удобный сервис для выбора и хранения подарков.
				`}
				url="https://giftflow.ru/"
				image="https://giftflow.ru/images/preview-main.jpg"
			/>
			<Page 
				onScrollEnd={onLoadNextPart} 
				className={classNames(cls.WishesPage, {}, [className])}
			>
				<div className={cls.pointer}>
					<div className={cls.btns}>
						<Button 
							className={classNames(cls.btn, {}, [])}
							onClick={onOpenLenta}
							theme={isLenta  ? ButtonTheme.ACCENT : ButtonTheme.CLEAR}
						>
							<Text title={'Лента'} className={cls.title} titleTag="h1"/>
						</Button>
						{/* <Button 
							theme={!isLenta ? ButtonTheme.ACCENT : ButtonTheme.CLEAR}
							className={classNames(cls.btn, {}, [])}
							onClick={onOpenCompilation}
						>
							Подборки
						</Button> */}
					</div>
					{isLenta 
						? (
						<div>
							<WishesPageFilters className={cls.WishesPageFilters}/>
							<WishList 
								isLoading={isLoading}
								wishes={wishes} 
							/>
						</div>
						) 
						: (
						<CompilationsPage></CompilationsPage>)}
				</div>
			</Page>	
		</DynamicModuleLoader>
        
    );
};

export default memo(WishesPage);


