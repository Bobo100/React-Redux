
import Head from "next/head";
import Layout from '../components/layout';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../components/redux/action/actionType";
import { item } from "../components/redux/state/stateType";
import { CopyToClipboard } from "../components/Code/CopyToClipboard";

const reduxOld = () => {

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
            <h1 className="text-4xl mb-3 mt-3">Redux介紹 這是舊版(For Next.js)</h1>
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
            <CopyToClipboard>
                {`export type state = {
    itemList: item[],
} `}
            </CopyToClipboard>
            <p>這裡我宣告了一個item的型別，裡面有name和price兩個屬性</p>
            <CopyToClipboard>
                {`export type item = {
    name: string
    price: number,
}`}
            </CopyToClipboard >
            <p>那我還寫一個State的初始值，裡面的itemList是空的</p>
            <CopyToClipboard>
                {`export const initialState: state = {
    itemList: []
}`}
            </CopyToClipboard>

            <h3 className="text-2xl mb-3 mt-3">接下來是Action</h3>
            <p>這裡我宣告了一個Action會執行的動作的名稱</p>
            <CopyToClipboard>
                {`export enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
}`}
            </CopyToClipboard>
            <p>之後在下面宣告了一個Action的型別，裡面有type和payload兩個屬性</p>
            <CopyToClipboard>
                {`export interface action {
    type: ActionType;
    payload: any;
}`}
            </CopyToClipboard>

            <h3 className="text-2xl mb-3 mt-3">接著我們來寫action的規則，也就是reducer</h3>
            <p>我宣告了reducer function</p>
            <CopyToClipboard>
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
            </CopyToClipboard>
            <p className="border border-title p-2 text-title font-bold bg-black">值得一提的是redux是不允許直接修改state的，redux是immutable的，所以我們要用到...state，這個是展開運算子，它會把state的所有屬性都展開，這樣我們才能修改裡面的屬性。之後返回的會是一個新的state，這樣才能讓redux知道我們有修改state</p>

            <h3 className="text-2xl mb-3 mt-3">最後就是store</h3>
            <p>我們要把reducer和state放到store裡面，你可以在這邊去更改reducer的名稱，我這邊就更改成firstReducer，如果你有多個reducer的話，可以在這邊一起放進去</p>
            <CopyToClipboard>
                {`import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "../reducer/reducer";

const store = configureStore({
    reducer: {
        firstReducer: reducer
    },
    // 我們這裡其實不需要使用非同步的action，但是我們還是引入了redux-thunk，如果你要使用非同步的action，可以在這邊引入
    // 最近得知這裡可以直接使用redux-toolkit的createAsyncThunk來寫非同步的action，所以這裡就不需要引入thunk了
    middleware: [thunk]
});

export default store;`}
            </CopyToClipboard>
            <p>這樣就完成了，就可以使用useSelector來取得狀態，而透過store則可以使用useDispatch來更改狀態</p>
            <p>補充：如果你要使用非同步的action，可以使用redux-thunk，這裡我們在store裡面引入了thunk，所以可以在action裡面使用非同步的action</p>
            <p>因為redux-toolkit已經幫我們寫好了非同步的action，所以我們只要在action裡面使用createAsyncThunk就可以了</p>

            <h2 className="text-2xl mb-3 mt-3">Redux的使用</h2>
            <p>首先我們要先在pages/_app.tsx裡面引入Provider</p>
            <p>然後在return裡面包上Provider</p>

            <CopyToClipboard>
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
            </CopyToClipboard>

            <p>接著就可以在我們想要的component裡面使用useSelector和useDispatch</p>

            <h3 className="text-2xl mb-3 mt-3">useSelector</h3>
            <p>useSelector可以取得我們在store裡面的state</p>
            <CopyToClipboard>
                {`    const itemList = useSelector((state: any) => state.firstReducer.itemList);`}
            </CopyToClipboard>

            <h3 className="text-2xl mb-3 mt-3">useDispatch</h3>
            <p>useDispatch可以更改我們在store裡面的state</p>
            <CopyToClipboard>
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
            </CopyToClipboard>

            <h2 className="text-2xl mb-3 mt-3">完成的成品</h2>

            <p>使用一個button去觸發reducer的規則</p>
            <CopyToClipboard>
                {`<button className="p-2 border rounded text-[#61dafb]"
    onClick={() => addItem({ name: '蘋果' + Math.random().toFixed(1), price: 10 })}>
    新增蘋果
</button>`}
            </CopyToClipboard>
            <p>再透過useSelector取得的state來顯示</p>
            <CopyToClipboard>
                {` {
    itemList.map((item, index) => (
        <div key={index} className="flex justify-between items-center border p-1">
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button className="rounded border p-3 border-title text-title" onClick={() => removeItem(item.name)}>刪除名字相同的</button>
        </div>
    ))
}`}
            </CopyToClipboard>
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

export default reduxOld