import { useQuery } from '@apollo/client'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'
import SubredditRow from './SubredditRow'

function SubredditList() {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10
    }
  })

  const subreddits: Subreddit[] = data?.getSubredditListByLimit

  return (
    <div>
      {subreddits?.map((subreddit, i) => (
        <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
      ))}
    </div>
  )
}

export default SubredditList
