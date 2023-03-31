
import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../components/redux/action/actionType";
import { item } from "../components/redux/state/stateType";

const UseRedux = () => {

    const itemList = useSelector((state: any) => state.firstReducer.itemList);
    console.log(itemList)

    const dispatch = useDispatch();

    const addItem = (item: item) => {
        console.log("addItem")
        dispatch({
            type: ActionType.ADD_ITEM,
            payload: item
        })
    }
    const removeItem = (name: string) => dispatch({ type: ActionType.REMOVE_ITEM, payload: name });

    return (
        <Layout>
            <Head>
                <title>Redux介紹</title>
            </Head>

            <p>就根據Redux的四個主要元素來介紹</p>
            <ul className="list-disc list-inside ml-3">
                <li>State：狀態</li>
                <li>Action：狀態的變化</li>
                <li>Reducer：狀態的變化規則，接收到不同的 action 指令時該對 state 做什麼動作的函數。</li>
                <li>Store：儲存狀態的地方</li>
            </ul>
            <h3 className="text-2xl mb-3 mt-3">首先是State</h3>
            <p>State就是存放狀態的地方，它是一個物件，裡面可以放任何你想要的東西。</p>
            <p>這裡我宣告了一個State，裡面有一個itemList的陣列，而裡面只給存放item這個型別的物件</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`export type state = {
    itemList: item[],
} `}
            </Prism>
            <p>這裡我宣告了一個item的型別，裡面有name和price兩個屬性</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`export type item = {
    name: string
    price: number,
}`}
            </Prism >
            <p>那我還寫一個State的初始值，裡面的itemList是空的</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`export const initialState: state = {
    itemList: []
}`}
            </Prism>

            <h3 className="text-2xl mb-3 mt-3">接下來是Action</h3>
            <p>這裡我宣告了一個Action會執行的動作的名稱</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`export enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
}`}
            </Prism>
            <p>之後在下面宣告了一個Action的型別，裡面有type和payload兩個屬性</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`export interface action {
    type: ActionType;
    payload: any;
}`}
            </Prism>

            <h3 className="text-2xl mb-3 mt-3">接著我們來寫action的規則，也就是reducer</h3>
            <p>我宣告了reducer function</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`import { action, ActionType } from "../action/actionType";
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
}`}
            </Prism>

            <h3 className="text-2xl mb-3 mt-3">最後就是store</h3>
            <p>我們要把reducer和state放到store裡面</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "../reducer/reducer";

const store = configureStore({
    reducer: {
        firstReducer: reducer
    },
    middleware: [thunk]
});

export default store;`}
            </Prism>
            <p>這樣就完成了，就可以使用useSelector來取得狀態，而透過store則可以使用useDispatch來更改狀態</p>

            <h2 className="text-2xl mb-3 mt-3">Redux的使用</h2>
            <p>首先我們要先在pages/_app.tsx裡面引入Provider</p>
            <p>然後在return裡面包上Provider</p>

            <Prism language="javascript" style={vscDarkPlus}>
                {`import { Provider } from 'react-redux';
import '../styles/global.scss'
import store from '../components/redux/store/store';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}
function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App`}
            </Prism>

            <p>接著就可以在我們想要的component裡面使用useSelector和useDispatch</p>

            <h3 className="text-2xl mb-3 mt-3">useSelector</h3>
            <p>useSelector可以取得我們在store裡面的state</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`    const itemList = useSelector((state: any) => state.firstReducer.itemList);`}
            </Prism>

            <h3 className="text-2xl mb-3 mt-3">useDispatch</h3>
            <p>useDispatch可以更改我們在store裡面的state</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`const dispatch = useDispatch();

const addItem = (item: item) => {
    console.log("addItem")
    dispatch({
        type: ActionType.ADD_ITEM,
        payload: item
    })
}
const removeItem = (name: string) => dispatch({ type: ActionType.REMOVE_ITEM, payload: name });
`}
            </Prism>

            <h2 className="text-2xl mb-3 mt-3">完成的成品</h2>

            <p>使用一個button去觸發reducer的規則</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {`<button className="p-2 border rounded text-[#61dafb]"
    onClick={() => addItem({ name: '蘋果' + Math.random().toFixed(1), price: 10 })}>
    新增蘋果
</button>`}
            </Prism>
            <p>再透過useSelector取得的state來顯示</p>
            <Prism language="javascript" style={vscDarkPlus}>
                {` {
    itemList.map((item, index) => (
        <div key={index} className="flex justify-between items-center border p-1">
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button className="rounded border p-3 border-title text-title" onClick={() => removeItem(item.name)}>刪除名字相同的</button>
        </div>
    ))
}`}
            </Prism>
            <button className="p-2 border rounded text-[#61dafb]"
                onClick={() => addItem({ name: '蘋果' + Math.random().toFixed(1), price: 10 })}>
                新增蘋果
            </button>

            {
                itemList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border p-1">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <button className="rounded border p-3 border-title text-title" onClick={() => removeItem(item.name)}>刪除名字相同的</button>
                    </div>
                ))
            }
        </Layout>
    )
}

export default UseRedux