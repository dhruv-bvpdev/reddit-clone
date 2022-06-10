import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post Box */}
      <PostBox />

      <div className="flex">{/* Feed */}</div>
    </div>
  )
}

export default Home
