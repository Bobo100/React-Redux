import Head from "next/head";
import Layout from '../components/layout';

import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function HomePage() {
    return (
        <Layout>
            <Head>
                <title>Redux介紹</title>
            </Head>
            <div>
                <h1 className="text-3xl font-bold mb-3 mt-3">
                    Redux介紹
                </h1>

                <a href="https://react-redux.js.org/" target="_blank" rel="noopener" className="m-3">官方文件</a>
                <a href="https://react-redux.js.org/tutorials/typescript-quick-start" target="_blank" rel="noopener" className="m-3">官方文件(快速開始)</a>

                <p className="text-xl">
                    Redux是一個狀態管理工具，它可以讓你的狀態在不同的元件之間共享。
                    非常像是React的Context和Reducer或是我們所說的全域變數。
                </p>
                <p>可以說組合拳法就是Redux</p>

                <h2 className="text-2xl mb-3 mt-3">為什麼要用Redux</h2>
                <p>Redux的優點有以下幾點</p>
                <ul className="list-disc list-inside ml-3">
                    <li className="p-3">中央化的狀態管理：Redux的Store可以集中管理所有的應用狀態，從而使應用的狀態管理更加清晰和易於維護。這可以避免在應用中出現多個狀態源的情況，因為Redux將所有的狀態存儲在一個統一的Store中。</li>
                    <li className="p-3">可預測的狀態變化：Redux使用純函數Reducer來處理狀態變化，這使得狀態變化變得可預測且容易測試。Reducer只是根據先前的狀態和一個操作來生成一個新的狀態，因此不會有副作用。</li>
                    <li className="p-3">易於開發人員協作：Redux提供了一些工具和技術，使得不同的開發人員可以方便地協作開發一個大型的應用。例如，Redux DevTools可以幫助開發人員跟蹤應用的狀態變化，以及可以使用中間件來定義和處理一系列的異步操作。</li>
                    <li className="p-3">可移植性：Redux可以在不同的平台上使用，包括Web、React Native、Electron等。</li>
                    <li className="p-3">可擴展性：Redux可以通過中間件來擴展其功能，例如，可以通過中間件來處理異步操作，或者將Redux的狀態存儲在本地存儲中。</li>
                    <li className="p-3">Time Traveling：Redux DevTools可以幫助開發人員跟蹤應用的狀態變化，並且可以在不同的狀態之間進行切換，這使得開發人員可以更好地理解應用的狀態變化。</li>
                </ul>

                {/* 可預測的狀態變化：Redux使用純函數Reducer來處理狀態變化，這使得狀態變化變得可預測且容易測試。而在使用React的Context和Reducer時，可以在Reducer中進行相同的純函數狀態變化，但Redux的Action和State的設計可以更好地達到這個目的。
                    易於開發人員協作：Redux提供了一些特殊的工具和技術，使得開發人員可以方便地協作開發一個大型的應用。例如，Redux DevTools可以幫助開發人員跟蹤應用的狀態變化，以及可以使用中間件來定義和處理一系列的異步操作。這些工具和技術使得多個開發人員可以更好地協作開發一個複雜的應用。 */}

                <p>總之，雖然React的Context和Reducer可以用於狀態管理，但Redux提供了更多的功能和優勢，可以讓狀態管理變得更加清晰、可預測和易於開發人員協作。當應用變得越來越複雜時，Redux將會成為一個非常有用的工具。</p>

                <h2 className="hightlight">但是根據我查的很多資料，我並不覺得context和reducer加起來用會比單純使用redux複雜，所以這能說是優勢嗎？我不太確定</h2>
                <p>但有一點我很確定是優勢：Redux有time travel功能，可以讓你在開發時可以回到過去的狀態，這個功能在開發時非常有用，但在正式上線時，這個功能就會被關閉。</p>
                <p>time travel功能的實現原理是：Redux會將每個狀態都保存下來，當你回到過去的狀態時，Redux會將狀態還原到你選擇的那個狀態。</p>
                <p>你可以透過Redux DevTools來使用time travel功能，這是一個Chrome(Edge也可以)的擴展，你可以在這裡下載：<a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-TW" target="_blank" rel="noreferrer">Redux DevTools</a></p>

                <h2 className="text-2xl mb-3 mt-3">Redux的元素</h2>
                <p>Redux的元素有三個，但我自己覺得是四個，分別是</p>
                <ul className="list-disc list-inside ml-3">
                    <li>State：狀態</li>
                    <li>Action：狀態的變化</li>
                    <li>Reducer：狀態的變化規則，接收到不同的 action 指令時該對 state 做什麼動作的函數。</li>
                    <li>Store：儲存狀態的地方</li>
                </ul>

                <p>目前，新版的元素則是</p>
                <ul className="list-disc list-inside ml-3">
                    <li>State：狀態</li>
                    <li>Slice：由 reducer 和 action 組成的一個邏輯，用於管理狀態中某個特定部分的相關邏輯。</li>
                    <li>Store：整個應用唯一的數據存儲庫，包含應用中所有state。</li>
                </ul>

                <h3>直白地說主要就是在reducer的寫法上有調整，改成用createSlice來寫，這樣就不用自己寫action和reducer了(當然你還是可以自己寫)。</h3>

                <p>在舊版Redux中，通常由三個主要元素組成：action、reducer和state。但是，在新版Redux中，還引入了其他一些概念和工具，例如Redux Toolkit和createSlice函數，以簡化Redux代碼並提高開發效率。 Redux Toolkit 是一個官方建議使用的工具包，幫助你在Redux應用程序中更快地編寫代碼並減少樣板代碼的量。createSlice函數是Redux Toolkit提供的一種方法，它使你更輕鬆地創建redux slice（包含reducer和actions）。</p>

                <h2 className="text-2xl mb-3 mt-3">Redux的安裝</h2>
                <p>Redux的安裝非常簡單，只需要安裝兩個套件就可以了，分別是</p>
                <ul className="list-disc list-inside ml-3">
                    <li>react-redux：Redux的React綁定套件</li>
                    <li>reduxjs/toolkit：主要用於簡化 Redux 的開發流程和增強 Redux 的功能。是可以不用安裝的，但我的範例都會用到，所以我還是建議你安裝。</li>
                </ul>
                <p>安裝方式如下：</p>
                <Prism language="plaintext" style={vscDarkPlus}>
                    {`npm install react-redux @react-redux @reduxjs/toolkit`}
                </Prism>

                <p>那因為Redux算是非常複雜的東西，所以我會分成幾個章節來介紹，這個章節主要是介紹Redux的基本概念，下一章節會介紹Redux舊版使用。接著是新版使用，最後會是一些詳細介紹每個API元件</p>

            </div>
        </Layout>
    )
}

export default HomePage