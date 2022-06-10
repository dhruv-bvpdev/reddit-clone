import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post Box */}
      <PostBox />

      <div className="">{/* Feed */}</div>
    </div>
  )
}

export default Home
