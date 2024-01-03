export interface Item {
    _id: string,
    name: string,
    description?: string,
    isDone: boolean,
    listId: string,
    __v: number
}