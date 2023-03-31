import Head from "next/head";
import Layout from '../components/layout';

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
                </ul>

                {/* 可預測的狀態變化：Redux使用純函數Reducer來處理狀態變化，這使得狀態變化變得可預測且容易測試。而在使用React的Context和Reducer時，可以在Reducer中進行相同的純函數狀態變化，但Redux的Action和State的設計可以更好地達到這個目的。
                    易於開發人員協作：Redux提供了一些特殊的工具和技術，使得開發人員可以方便地協作開發一個大型的應用。例如，Redux DevTools可以幫助開發人員跟蹤應用的狀態變化，以及可以使用中間件來定義和處理一系列的異步操作。這些工具和技術使得多個開發人員可以更好地協作開發一個複雜的應用。 */}

                <p>總之，雖然React的Context和Reducer可以用於狀態管理，但Redux提供了更多的功能和優勢，可以讓狀態管理變得更加清晰、可預測和易於開發人員協作。當應用變得越來越複雜時，Redux將會成為一個非常有用的工具。</p>

                <h2 className="text-2xl mb-3 mt-3">Redux的元素</h2>
                <p>Redux的元素有三個，但我自己覺得是四個，分別是</p>
                <ul className="list-disc list-inside ml-3">
                    <li>State：狀態</li>
                    <li>Action：狀態的變化</li>
                    <li>Reducer：狀態的變化規則，接收到不同的 action 指令時該對 state 做什麼動作的函數。</li>
                    <li>Store：儲存狀態的地方</li>
                </ul>



            </div>
        </Layout>
    )
}

export default HomePage