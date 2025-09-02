import { getUserAuthData } from "@/entities/User";
import { memo, Suspense, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "@/app/providers/router/config/routeConfig";
import { AppRoutesProps } from "@/shared/types/router";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);