
import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const reduxNew = () => {
  return (
    <Layout>
      <Head>
        <title>Redux新版介紹</title>
      </Head>

      <a href="https://hackmd.io/@RobinTsai/rkb4oPZGs#createSlice" target="_blank" rel="noopener" className="m-3">網路上不錯的筆記</a>
      <a href="https://redux-toolkit.js.org/api/configureStore" rel="noopener" target="_blank" className="m-3">官方文件</a>
      <a href="https://cn.redux.js.org/usage/structuring-reducers/structuring-reducers" rel="noopener" target="_blank" className="m-3">官方文件(中文版)</a>

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
      <p>而這邊的RootState則是用來取得目前的state，而AppDispatch則是用來dispatch action</p>
      <p className="border border-title p-2 text-title font-bold">白話：這兩步驟(RootState和AppDispatch)是為了之後的型別推論 保證型別的正確性</p>

      <h1 className="text-3xl my-3">定義Hook(Define Typed Hooks​)</h1>
      <p>由於Redux store的dispatch和selector函數都需要使用RootState和AppDispatch類型，因此我們可以為它們定義一個hook，以便可以在需要的地方使用它們。</p>
      <p>在每個組件中導入RootState和AppDispatch類型是可行的，但最好在你的應用程序中創建具有類型定義的useDispatch和useSelector hooks。這有幾個原因：<br />
        對於useSelector，它可以省去每次輸入(state: RootState)的麻煩。<br />
        使用默認Dispatch類型的useDispatch並不知道thunk。為了正確地分發thunk，需要在store中使用特定的自定義AppDispatch類型，該類型包括thunk middleware類型，並使用它來替換useDispatch。添加預先定義的useDispatch hook可以避免忘記在需要時導入AppDispatch。</p>
      <p>由於這些都是實際變量而不是類型，因此將它們定義在單獨的文件中（例如app/hooks.ts），而不是儲存設置文件中非常重要。<br />
        這使你可以將它們導入到任何需要使用hooks的組件文件中，並避免潛在的循環引入依賴問題。</p>

      <p className="border border-title p-2 text-title font-bold">白話：自定義hook 這樣就可以在其他地方使用useAppDispatch和useAppSelector 同時使用前面的型別推論<br />
        可以確保我們使用useAppDispatch和useAppSelector的時候都只會使用到我們在store裡面定義的型別</p>
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
      <p className="text-xl text-title bg-black">接著是Slice(更改Reducer和Action的寫法)</p>
      <p>那因為我在前面 說要使用兩個reducer (兩個slice的意思) 所以我們這邊會寫兩個slice.tsx</p>
      <p>在 createSlice() 這個函式中可以帶入 reducer function、slice name 和 initial state，將自動產生對應的 slice reducer，並包含對應的 action creators 和 action types 在內。
        在使用 createSlice 或 createReducer 撰寫 reducer 的時候可以不用再用 switch case 語法，它們的語法底層加入了 immer，因此可以使用會有 side effect 的寫法去變更 state（直接修改 state），它背後會再幫你轉成 「immutable」的方式。</p>

      <p className="border border-title p-2 text-title font-bold bg-black">補充：它們的語法底層加入了 immer，因此可以使用會有 side effect 的寫法去變更 state（直接修改 state），它背後會再幫你轉成 「immutable」。</p>

      <p>Redux Toolkit 裡的 createSlice 和 createReducer 函式底層採用了 immer 這個函式庫去實現直接修改 state 的方式，並且背後會幫你轉成 immutable 的方式。
        因此開發者在使用 createSlice 和 createReducer 撰寫 reducer 的時候可以使用有 side effect 的方式去變更 state。
        例如：可以直接將 state 裡的物件、陣列等「直接修改」，而不需要像以前一樣必須「複製整個物件／陣列」然後再修改某一個值。</p>
      <p>immer 是一個 JavaScript 函式庫，它可以讓你使用基於物件的程式碼來修改深層次的 state 物件，而不需要使用傳統的複製和粘貼方式。
        immer 使用起來比傳統 Immutable Library 更加簡潔，並且可以讓你的程式碼更易讀、更容易維護。</p>

      <p className="border border-title p-2 text-title font-bold">補充：必須「複製整個物件／陣列」然後再修改某一個值意思</p>
      <p>在傳統的 JavaScript 上，如果你想要修改一個物件裡面的某個值，必須先使用 Object.assign() 或是 spread operator (...) 這些方法複製一份全新的物件，然後再修改其中的屬性。例如：</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// 這是一個簡單的物件
const myObj = { a: 1, b: 2 };
const newObj = Object.assign({}, myObj, {b: 3});
// 或是 const newObj = {...myObj, b: 3};
console.log(myObj); // {a: 1, b: 2}
console.log(newObj); // {a: 1, b: 3}`}
      </Prism>
      <p>這樣做的問題在於，當物件變得很大時，複製整個物件會佔用大量的記憶體，並且容易導致效能問題。</p>

      <p>在使用 immer 時，你可以直接修改物件裡面的值，而不需要複製整個物件，例如：</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`import produce from 'immer';

const myObj = { a: 1, b: 2 };

const newObject = produce(myObj, draft => {
  draft.b = 3;
});

console.log(myObj); // { a: 1, b: 2 }
console.log(newObject); // { a: 1, b: 3 }`}
      </Prism>

      <p>在上面的範例中，使用 produce() 函数從傳入的 state 物件創建一份 immutable 的複本（也就是 draft 物件），然後你可以直接修改 draft 物件裡面的屬性值，這樣就不需要額外地創建和更新新的物件了。</p>

      <p className="text-2xl border border-title p-2 text-title font-bold bg-black my-3">回歸到我們的主題</p>
      <p className="text-xl">第一個slice：counterSlice.tsx</p>
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
        //  slice 會自動產生 action creators 和 action types
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

      <p className="text-xl">第二個slice：userSlice.tsx</p>
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

      <p>你可以這樣使用，這邊就只顯示加與減的code，詳細的請點連結去看~</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`function Counter() {
// const count = useAppSelector((state) => state.counterReducer.value)
// 因為我們前面有建立好了selectCount，所以我們可以這樣使用
const count = useAppSelector(selectCount)
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

      <p className="text-xl text-title">首先是安裝，如果你有安裝toolkit就不用再安裝了</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`npm install redux-thunk`}
      </Prism>

      <p className="text-xl text-title">接著是修改store，但現在基本上預設都有thunk了，所以根本不用修改</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`// component/redux/store/store.tsx
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "../reducer/reducer";

export const store = configureStore({
    reducer: {
        firstReducer: reducer
    },
    // middleware: [thunk]
    // 預設就是true，但是如果你要自己設定的話，可以這樣寫(根本沒影響 除非你要關閉)
    // 關閉就會
    // Error: Actions must be plain objects. Use custom middleware for async actions.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: true
    })
})`}
      </Prism>

      <p className="text-xl text-title">接著是寫一個非同步的action，我們會使用兩個API元件，一個是createAsyncThunk，一個是createSlice(然後加上extraReducers)</p>
      <p>createAsyncThunk可以協助我們管理異步的狀態，createAsyncThunk 接收兩個參數：typePrefix 和 payloadCreator。<br />
        typePrefix 是字串，在你指定的名稱前都會加上字首（通常是動詞），以便創建有意義的 Redux action 類型。(白話的說就是取一個方便你閱讀的名字)<br />
        而 payloadCreator 是一個函式，負責處理異步邏輯並返回一個 Promise 物件，當該 Promise 物件解析完成時，將其值傳遞給 Redux store。</p>

      <p>createAsyncThunk 函式會自動創建相應的 Redux reducer，以處理異步 action。這些 reducer 會將異步 action 的狀態儲存在 Redux store 中，並且會自動創建三個 action creator：pending、fulfilled 和 rejected。</p>
      <p className="text-xl text-title">接著是createSlice，這邊我們要注意的是，我們要在createSlice的extraReducers裡面去寫pending、fulfilled、rejected，用來接收createAsyncThunk的回傳值</p>
      <p>extraReducers意思是允許 createSlice 去針對非此 createSlice 所創建的 actions 做出回應。extraReducers 就是用來參照 「外部」的 actions，它們不會出現在 sliceObject.actions 中。</p>

      <p>extraReducers是用來接收非此createSlice所創建的actions，像是createAsyncThunk的回傳值。<br />
        寫法是綁住builder，而builder又有三個方法分別是addCase、addMatcher、addDefaultCase。<br />
        ！！請注意這三個method有順序限制，一定要是addCase、addMatcher、addDefaultCase。
      </p>

      <p>簡短的介紹一下</p>
      <p className="border border-title p-2">addCase：添加一個可變 reducer，用於匹配指定 action type。
        最常用的方法，用於匹配指定的 action type，並對 state 進行更新。
      </p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], userNames: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }
})`}
      </Prism>
      <p className="border border-title p-2">addMatcher：添加一個自定義 matcher 函數，用於匹配特定條件下的 action。
        addMatcher()可以用於針對特定條件下的action做出回應，例如當一個 action 的 payload 符合某些特定的條件時才進行相應的狀態更新。
        這意味著，相比使用addCase()，使用addMatcher()能夠更細粒度地控制 reducer 如何響應 action，從而使得代碼更加具有可讀性和可维護性。

        舉個例子，假設我們有一個Redux store來保存用戶列表，當新增用戶時，不僅要更新state中的users列表，還要在另一個state中的userNames列表中增加此用戶的名字。
        此時就可以利用addMatcher()函式根據action的payload來判斷是否需要對應處理：
        <a href="https://react-redux-example-02.vercel.app/User" rel="noopener" target="_blank">實作範例連結</a>
      </p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], userNames: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type === 'users/addUser' && action.payload.user.age > 18, // 條件：新增用戶的年齡大於18歲
      (state, action) => {
        state.users.push(action.payload.user); // 在users列表中添加新用戶
        state.userNames.push(action.payload.user.name); // 在userNames列表中添加新用户的名字
      }
    )
  }
})`}
      </Prism>

      <p className="border border-title p-2">addDefaultCase：添加一個默認的回傳語句，用於當創建的 reducer 未找到對應的 action type 時使用。
        addDefaultCase()可以用於當創建的 reducer 未找到對應的 action type 時使用，這個方法的參數是一個函數，該函數的參數是state和action，返回值是state。
        這個方法的用法和addCase()類似，但是它是用於處理所有未匹配到的action，因此它的優先級最低。
      </p>

      <Prism language="javascript" style={vscDarkPlus}>
        {`const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], userNames: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    builder.addMatcher(
      action => action.type === 'users/addUser' && action.payload.user.age > 18, // 條件：新增用戶的年齡大於18歲
      (state, action) => {
        state.users.push(action.payload.user); // 在users列表中添加新用戶
        state.userNames.push(action.payload.user.name); // 在userNames列表中添加新用户的名字
      }
    )
    builder.addDefaultCase((state, action) => {
      // 未匹配到的action
    })
  }
})`}
      </Prism>

      <h1 className="text-3xl text-title">寫好的完整createAsyncThunk和createSlice如下：</h1>

      <Prism language="javascript" style={vscDarkPlus}>
        {`// component/redux/slice/asyncSlice.tsx
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { asyncInitialState } from "../state/stateType"
import { RootState } from "../store/store"

export const fetchFirstData = createAsyncThunk(
    'first/fetchData',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        return data
    }
)

const asyncSlice = createSlice({
    name: 'asyncData',
    initialState: asyncInitialState,
    reducers: {
    },

    // extraReducers是用來接收非此createSlice所創建的actions，像是createAsyncThunk的回傳值
    // 寫法是綁住builder，而builder又有三個方法分別是addCase、addMatcher、addDefaultCase
    // 請注意這三個method有順序限制，一定要是addCase、addMatcher、addDefaultCase

    // 這邊使用addCase就可以了，因為我們只有一個action，也沒有其他的特殊需求
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirstData.pending, (state) => {
                state.isLoaded = true
            })
            // fulfilled是當action成功執行時的回傳值 就去更新state
            .addCase(fetchFirstData.fulfilled, (state, action) => {
                state.isLoaded = false
                state.isComplete = true
                state.AsyncStateList = action.payload
            })
            .addCase(fetchFirstData.rejected, (state) => {
                state.isLoaded = false
                state.isComplete = false
            })
    }
})

export const selectAsync = (state: RootState) => state.async

export default asyncSlice.reducer`}
      </Prism>

      <p>當然你必須修改State，要符合你的需求，完整版都在下方連結中。</p>
      <a href="https://react-redux-example-02.vercel.app/" rel="noopener" target="_blank">體驗我們寫好的redux</a>
      <a href="https://github.com/Bobo100/React-Redux-Example-02 " rel="noopener" target="_blank">完整程式碼</a>

      <h1 className="text-3xl text-title my-3">你以為結束了，但還沒有。接下來我們還可以在優化一下。</h1>
      <a href="https://cn.redux.js.org/usage/structuring-reducers/structuring-reducers" rel="noopener" target="_blank">官方的reducer介紹(裡面也有優化)</a>
      <p>我們寫好的slice，可以把裡面的reducer拆成多個function，然後使用，這樣的好處是不會讓createSlice變得太長，也可以讓你的程式碼更好維護。</p>

      <a href="https://github.com/Bobo100/React-Redux-Example-03 " rel="noopener" target="_blank">完整程式碼</a>


    </Layout>
  )
}

export default reduxNew