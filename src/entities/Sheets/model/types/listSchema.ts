import { EntityState } from "@reduxjs/toolkit";
import { List } from "./list";



export interface ListSchema extends EntityState<List>{
    isLoading?: boolean;
    error?: string;
}



// export interface ListSchema {
//     isLoading?: boolean;
//     error?: string;
//     data: List[];
// }
