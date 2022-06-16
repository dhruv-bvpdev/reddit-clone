import { useQuery } from '@apollo/client'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'
import Loader from './Loader'
import SubredditRow from './SubredditRow'

function SubredditList() {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10
    }
  })

  const subreddits: Subreddit[] = data?.getSubredditListByLimit

  if (!subreddits) return <Loader />

  return (
    <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
      <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
      <div>
        {subreddits?.map((subreddit, i) => (
          <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
        ))}
      </div>
    </div>
  )
}

export default SubredditList
