export type item = {
    name: string
    price: number,
}

export type state = {
    itemList: item[],
}

export const initialState: state = {
    itemList: []
}