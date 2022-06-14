type Comments = {
  created_at: Date
  id: number
  post_id: number
  text: string
  username: string
}

type Vote = {
  created_at: Date
  id: number
  post_id: number
  upvote: boolean
  username: string
}

type Subreddit = {
  created_at: Date
  id: number
  topic: string
}

type Post = {
  body: string
  created_at: Date
  id: number
  image: string
  subreddit_id: number
  title: string
  username: string
  votes: Vote[]
  comments: Comments[]
  subreddit: Subreddit[]
}
