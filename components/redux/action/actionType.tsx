export enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
}

export interface action {
    type: ActionType;
    payload: any;
}



