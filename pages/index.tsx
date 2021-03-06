import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditList from '../components/SubredditList'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post Box */}
      <PostBox />

      <div className="flex">
        <Feed />

        <SubredditList />
      </div>
    </div>
  )
}

export default Home
