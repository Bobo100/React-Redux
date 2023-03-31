import Head from "next/head";
import Layout from '../components/layout';
import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../components/redux/action/actionType";
import { item } from "../components/redux/state/stateType";


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
                <p className="text-xl">
                    Redux是一個狀態管理工具，它可以讓你的狀態在不同的元件之間共享。
                    非常像是React的Context和Reducer或是我們所說的全域變數，但是Redux的狀態管理更加的彈性。
                </p>
                <p>可以說組合拳法就是Redux</p>

                <h2 className="text-2xl mb-3 mt-3">為什麼要用Redux</h2>
                <p>Redux的優點有以下幾點</p>
                <ul className="list-disc list-inside ml-3">
                    <li>狀態管理更加彈性</li>
                </ul>
                
                <h2 className="text-2xl mb-3 mt-3">Redux的元素</h2>
                <p>Redux的元素有三個，但我自己覺得是四個，分別是</p>
                <ul className="list-disc list-inside ml-3">
                    <li>State：狀態</li>
                    <li>Action：狀態的變化</li>
                    <li>Reducer：狀態的變化規則</li>
                    <li>Store：儲存狀態的地方，Reducer 在 Redux 中是用來保管 state ，以及在接收到不同的 action 指令時該對 state 做什麼動作的函數。</li>
                </ul>



            </div>
        </Layout>
    )
}

export default HomePage