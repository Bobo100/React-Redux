import { action, ActionType } from "../action/actionType";
import { initialState, state } from "../state/stateType";

// Next.js中 需要幫state加上一個初始化值
export const reducer = (state: state = initialState, action: action) => {
    const { type, payload } = action;
    switch (type) {
        // 這裡是我們要執行的動作 
        case ActionType.ADD_ITEM:
            return {
                ...state,
                itemList: [...state.itemList, payload]
            }
        case ActionType.REMOVE_ITEM:
            return {
                ...state,
                itemList: state.itemList.filter(item => item.name !== payload)
            }
        default:
            return state;
    }
}