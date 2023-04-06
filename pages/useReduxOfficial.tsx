
import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const useReduxOfficial = () => {
  return (
    <Layout>
      <Head>
        <title>Redux新版介紹</title>
      </Head>

      <h1 className="text-3xl mt-2">官方的教學 (最新版) For Next.js用</h1>
      <h1 className="text-3xl my-3">定義Root State和Dispatch Types(Define Root State and Dispatch Types​)</h1>
      <p>Redux Toolkit的configureStore API不需要任何額外的typing。但是，你需要提取RootState類型和Dispatch類型，以便可以根據需要進行引用。<br />
        從store本身推斷這些類型意味著當你添加更多state slices或修改middleware設置時，它們會正確更新。</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// components/redux/store/store.tsx
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counterSlice'
import userReducer from '../slice/userSlice'

export const store = configureStore({
    reducer: {
       // 我寫了兩個reducer, 一個是counterReducer, 一個在使用上我還改名為user
        counterReducer,
        user: userReducer
    }
})

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch`}
      </Prism>
      <p>configureStore() 會自動組合你的 reducer，並建立 Redux store。它會回傳一個 Redux store 物件，你可以使用它來呼叫 getState() 取得目前的 state，或是 dispatch(action) 來更新 state。</p>
      <p>而這邊新增的兩個部分則是RootState和AppDispatch，這兩個型別是用來幫助我們在使用Redux時，可以更方便的使用型別推論，而不用每次都要自己去宣告型別。</p>
      <p>而這邊的RootState則是用來取得目前的state，而AppDispatch則是用來dispatch action，而這邊的action則是在actionType.tsx中宣告的</p>

      <h1 className="text-3xl my-3">定義Hook(Define Typed Hooks​)</h1>
      <p>由於Redux store的dispatch和selector函數都需要使用RootState和AppDispatch類型，因此我們可以為它們定義一個hook，以便可以在需要的地方使用它們。</p>
      <p>在每個組件中導入RootState和AppDispatch類型是可行的，但最好在你的應用程序中創建具有類型定義的useDispatch和useSelector hooks。這有幾個原因：<br />
        對於useSelector，它可以省去每次輸入(state: RootState)的麻煩。<br />
        使用默認Dispatch類型的useDispatch並不知道thunk。為了正確地分發thunk，需要在store中使用特定的自定義AppDispatch類型，該類型包括thunk middleware類型，並使用它來替換useDispatch。添加預先定義的useDispatch hook可以避免忘記在需要時導入AppDispatch。</p>
      <p>由於這些都是實際變量而不是類型，因此將它們定義在單獨的文件中（例如app/hooks.ts），而不是存儲設置文件中非常重要。<br />
        這使你可以將它們導入到任何需要使用hooks的組件文件中，並避免潛在的循環引入依賴問題。</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// components/redux/hook/hook.tsx
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

// Use throughout your app instead of plain \`useDispatch\` and \`useSelector\`
export const useAppDispatch: () => AppDispatch = useDispatch
        export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector`}
      </Prism>

      <h1 className="text-3xl my-3">定義Slice State和Action Types​(Define Slice State and Action Types​)</h1>
      <p>現在，我們已經定義了RootState和AppDispatch類型，接下來我們要定義State、Action與reducer(當然做法會與舊版的不同)</p>
      <p className="text-xl text-title">首先是State</p>
      <p>我們宣告了兩個State，一個是計算器的State，一個是使用者的State，並且我們也都給予了初始值</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// components/redux/state/stateType.tsx
// Define a type for the slice state
export interface CounterState {
    value: number
}

// Define the initial state using that type
export const initialState: CounterState = {
    value: 0,
}

/////////////////////////////////////// 第二個State 
export interface UserState {
    username: string
    age: number
    email: string
}

export const userInitialState: UserState = {
    username: '',
    age: 0,
    email: ''
}`}
      </Prism>
      <p className="text-xl text-title">接著是Slice(更改Reducer和Action的寫法)</p>
      <p>那因為我在前面 說要使用兩個reducer (兩個slice的意思) 所以我們這邊會寫兩個slice.tsx</p>
      <p className="text-base text-title">counterSlice.tsx</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// component/redux/slice/counterSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "../state/stateType"
import { RootState } from "../store/store"

export const counterSlice = createSlice({
    name: 'counter',
    // \`createSlice\` will infer the state type from the \`initialState\` argument
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of \`action.payload\`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported \`RootState\` type
export const selectCount = (state: RootState) => state.counterReducer.value

export default counterSlice.reducer`}
      </Prism>
      <p className="text-base text-title">userSlice.tsx</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// component/redux/slice/userSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userInitialState } from "../state/stateType"
import { RootState } from "../store/store"

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setUserAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        }
    }
})

export const { setUsername, setUserAge, setUserEmail } = userSlice.actions

export const selectUsername = (state: RootState) => state.user.username
export const selectAge = (state: RootState) => state.user.age
export const selectEmail = (state: RootState) => state.user.email

export default userSlice.reducer`}
      </Prism>


      <p>這樣就完成了，就可以透過useAppSelector來取得State的值了以及透過useAppDispatch來分發Action了</p>

      <p>你可以這樣使用</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`function Counter() {
const count = useAppSelector((state) => state.counterReducer.value)
const dispatch = useAppDispatch()

return (
    <div>
        <div>{count}</div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
    </div>
)}`}
      </Prism>

      <p>上面的範例與程式碼連結：</p>
      <a href="https://react-redux-example-01.vercel.app/" rel="noopener" target="_blank">體驗我們寫好的redux</a>
      <a href="https://github.com/Bobo100/React-Redux-Example-01" rel="noopener" target="_blank">完整程式碼</a>

      <h1 className="text-3xl mt-2">非同步怎麼處理</h1>
      <p>這邊我們使用redux-thunk來處理非同步</p>
      

    </Layout>
  )
}

export default useReduxOfficial