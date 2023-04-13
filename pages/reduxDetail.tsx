
import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const reduxDetail = () => {
  return (
    <Layout>
      <Head>
        <title>Redux Toolkit的詳細介紹</title>
      </Head>

      <a href="https://redux-toolkit.js.org/api/configureStore" rel="noopener" target="_blank" className="m-3">官方文件</a>
      <h1 className="text-3xl mt-2">Redux Toolkit的詳細介紹</h1>
      <p>根據官方分類</p>
      <h2>Store Setup主要有</h2>
      <ul>
        <li>configureStore：包裝 createStore 以提供簡化的配置選項和良好的默認預設。它可以自動組合你的切片 reducers，添加您提供的任何 Redux 中間件，默認情況下包含 redux-thunk ，並允許使用 Redux DevTools 擴展。</li>
        <li>getDefaultMiddleware：返回一個包含默認中間件列表的數組。默認情況下，configureStore 會自動將一些中間件(Middleware)添加到 Redux 存儲設置中。</li>
        <li>Immutability Middleware</li>
        <li>Serializability Middleware</li>
        <li>createListenerMiddleware</li>
        <li>autoBatchEnhancer</li>
      </ul>
      <h2>Reducers和Actions則有</h2>
      <ul>
        <li>createReducer：為 case reducer 函數提供 action 類型的查找表，而不是編寫switch語句。此外，它會自動使用immer 庫來讓您使用普通的可變代碼編寫更簡單的 immutable 更新，例如 state.todos [3] .completed = true 。</li>
        <li>createAction：為給定的 action type string 生成一個 action creator 函數。函數本身定義了 toString()，因此它可以用來代替 type 常量。</li>
        <li>createSlice：接受一個 reducer 函數的對象、切片名稱和初始狀態值，並且自動生成具有相應 action creators 和 action 類型的切片reducer。</li>
        <li>createAsyncThunk：接受一個 action type string 和一個返回 promise 的函數，並生成一個發起基於該 promise 的pending/fulfilled/rejected action 類型的 thunk。</li>
        <li>createEntityAdapter：生成一組可重用的 reducers 和 selectors，以管理存儲中的規範化數據</li>
      </ul>

      <h2>其他</h2>
      <ul>
        <li>createSelector：Reselect 提供了一個名為 createSelector 的函數來生成記憶化 Selector。createSelector 接收一個或多個 input selector 函數，外加一個 output selector 作為參數，並返回一個新的 Selector 函數作為結果。</li>
      </ul>

      <h2>configureStore</h2>
      <p>configureStore 接受一個 Redux store 配置對象，並返回一個 Redux store 實例。它可以自動組合你的切片 reducers，添加您提供的任何 Redux 中間件，默認情況下包含 redux-thunk ，並允許使用 Redux DevTools 擴展。</p>

      <h2>getDefaultMiddleware</h2>

      <h2>createReducer</h2>

      <h2>createAction</h2>

      <h2>createSlice</h2>

      <h2>createAsyncThunk</h2>

      <h2>createEntityAdapter</h2>

      <h2>createSelector</h2>
      <p>Reselect 提供了一個名為 createSelector 的函數來生成記憶化 Selector。createSelector 接收一個或多個 input selector 函數，外加一個 output selector 作為參數，並返回一個新的 Selector 函數作為結果。</p>
      <p>直接舉例比較能夠理解：</p>
      <Prism language="javascript" style={vscDarkPlus}>
        {`const selectA = state => state.a
const selectB = state => state.b
const selectC = state => state.c

const selectABC = createSelector([selectA, selectB, selectC], (a, b, c) => {
  // 對 a、b 和 c 執行操作，並返回一個結果
  return a + b + c
})

// 調用 Selector 並得到結果
const abc = selectABC(state)

// 也可以寫成單獨的參數，結果完全一樣
const selectABC2 = createSelector(selectA, selectB, selectC, (a, b, c) => {
  // 對 a、b 和 c 執行操作，並返回一個結果
  return a + b + c
})`}
      </Prism>

    </Layout>
  )
}

export default reduxDetail