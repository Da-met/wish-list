import { FC, lazy } from "react";
import { SheetCreateProps } from "./SheetCreate";


export const SheetCreateAsync = lazy <FC<SheetCreateProps>>(
    () => import('./SheetCreate'),
);

// export const SheetCreateAsync = lazy (
//     () => import('./SheetCreate'),
// );