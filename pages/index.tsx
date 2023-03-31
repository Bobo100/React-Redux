import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../components/redux/action/actionType";
import { item } from "../components/redux/state/stateType";


function HomePage() {

    const itemList = useSelector((state: any) => state.reducer.itemList);
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
            <div>
                <h1 className="text-3xl font-bold mb-3 mt-3">
                    Redux介紹
                </h1>
                <p className="text-xl">
                    Redux是一個狀態管理工具，它可以讓你的狀態在不同的元件之間共享。
                    非常像是React的Context和Reducer或是我們所說的全域變數，但是Redux的狀態管理更加的彈性。
                </p>
                <p>可以說組合拳法就是Redux</p>

                <h2 className="text-2xl mb-3 mt-3">Redux的元素</h2>
                <p>Redux的元素有三個，但我自己覺得是四個</p>
                <ul className="list-disc list-inside">
                    <li>State：狀態</li>
                    <li>Action：狀態的變化</li>
                    <li>Reducer：狀態的變化規則</li>
                    <li>Store：儲存狀態的地方</li>
                </ul>

                <h3 className="text-2xl mb-3 mt-3">首先是State</h3>
                <p>State就是存放狀態的地方，它是一個物件，裡面可以放任何你想要的東西。</p>
                <p>這裡我宣告了一個State，裡面有一個itemList的陣列，而裡面只給存放item這個型別的物件</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`type state = {
    itemList: item[],
} `}
                </Prism>
                <p>這裡我宣告了一個item的型別，裡面有name和price兩個屬性</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`type item = {
    name: string,
    price: number,
}`}
                </Prism >
                <p>那我還寫一個State的初始值，裡面的itemList是空的</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`const initialState: state = {
    itemList: []
}`}
                </Prism>

                <h3 className="text-2xl mb-3 mt-3">接下來是Action</h3>
                <p>這裡我宣告了一個Action會執行的動作的名稱</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
}`}
                </Prism>
                <p>之後在下面宣告了一個Action的型別，裡面有type和payload兩個屬性</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`interface action = {
    type: ActionType,
    payload: any,
}`}
                </Prism>

                <h3 className="text-2xl mb-3 mt-3">接著我們來寫action的規則，也就是reducer</h3>
                <p>我宣告了reducer function</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`const reducer = (state: state=initialState, action: action) => {
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
                    {`const store = createStore(reducer);`}
                </Prism>
                <p>這樣就完成了，就可以使用useSelector來取得狀態，而透過store則可以使用useDispatch來更改狀態</p>

                <h2 className="text-2xl mb-3 mt-3">Redux的使用</h2>
                <p>首先我們要先在pages/_app.tsx裡面引入Provider</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`import { Provider } from 'react-redux';
import store from '../store';`}
                </Prism>

                <p>然後在return裡面包上Provider</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
)`}
                </Prism>

                <p>接著就可以在我們想要的component裡面使用useSelector和useDispatch</p>

                <h3 className="text-2xl mb-3 mt-3">useSelector</h3>
                <p>useSelector可以取得我們在store裡面的state</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`const itemList = useSelector((state: state) => state.itemList);`}
                </Prism>

                <h3 className="text-2xl mb-3 mt-3">useDispatch</h3>
                <p>useDispatch可以更改我們在store裡面的state</p>
                <Prism language="javascript" style={vscDarkPlus}>
                    {`const dispatch = useDispatch();
const addItem = (item: item) => dispatch({ type: ActionType.ADD_ITEM, payload: item });
const removeItem = (name: string) => dispatch({ type: ActionType.REMOVE_ITEM, payload: name });`}
                </Prism>

                <h2 className="text-2xl mb-3 mt-3">完成的成品</h2>

                <button className="p-2 border rounded text-[#61dafb]"
                    onClick={() => addItem({ name: '蘋果' + Math.random(), price: 10 })}>
                    新增蘋果</button>
                {itemList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <button onClick={() => removeItem(item.name)}>刪除</button>
                    </div>
                ))}





            </div>
        </Layout>
    )
}

export default HomePage