import { fetchProfileData, profileReducer } from "entities/Profile";
import { ProfileCard } from "entities/Profile/ui/ProfileCard/ProfileCard";
import { useEffect } from "react";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";


const reducers: ReducersList = {
    profile: profileReducer,
}


interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div >
                <ProfileCard></ProfileCard>
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage;