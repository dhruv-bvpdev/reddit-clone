import Link from 'next/link'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon
} from '@heroicons/react/outline'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import Avatar from './Avatar'
import Loader from './Loader'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'
import { ADD_VOTE } from '../graphql/mutations'

TimeAgo.addDefaultLocale(en)

type Props = {
  post: Post
}

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      id: post?.id
    }
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVoteUsingPost_id']
  })

  const upvote = async (isUpVote: boolean) => {
    if (!session) {
      toast('You need to be signed in to vote')
      return
    }

    if (vote && isUpVote) return
    if (vote == false && !isUpVote) return

    console.log('Voting...', isUpVote)

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpVote
      }
    })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVoteUsingPost_id
    const vote = votes?.find(
      vote => vote.username == session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVoteUsingPost_id
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if (votes?.length === 0) return 0
    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNumber
  }

  if (!post) return <Loader />

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upvote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-black text-xs font-bold">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upvote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote == false && 'text-blue-400'
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{' '}
              &#x000B7; Posted by u/
              {post.username}{' '}
              <ReactTimeAgo date={post.created_at} locale="en-IN" />
            </p>
          </div>

          {/* Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* Image */}
          <img
            className="w-full"
            src={post.image}
            alt={!post.image ? '' : post.title}
          />

          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="w-6 h-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>

            <div className="postButtons">
              <GiftIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Award</p>
            </div>

            <div className="postButtons">
              <ShareIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Share</p>
            </div>

            <div className="postButtons">
              <BookmarkIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Save</p>
            </div>

            <div className="postButtons">
              <DotsHorizontalIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
