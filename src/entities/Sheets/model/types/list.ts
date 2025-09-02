

export interface List {
    id: number;
    name: string;
    user_id: number;
    wishes: ListWishes[];
}



export interface ListWishes {
    id: number;
    name: string;
    img: string;   
    completed: boolean;
    // reservation: {
    //     id: number,
    //     user_id: number,
    // };
    isReserved?: boolean; 
}