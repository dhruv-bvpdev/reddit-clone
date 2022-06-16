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

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <SubredditList />
        </div>
      </div>
    </div>
  )
}

export default Home
