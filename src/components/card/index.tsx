import { memo, useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { editPost, removePost } from '../../modules/_redux/postsActions'

const Card = (props: any) => {
  const { act, post, left, loader, index } = props
  const dispatch = useDispatch()
  const [userId, setUser] = useState<number>(0)
  const [body, setBody] = useState(post.body)
  const [showghost, setGhost] = useState(false)
  const { users, userId: userIdentity, posts } = useSelector((state: RootStateOrAny) => state.posts)

  const getUser = (user: any): any => {
    let userObject = {}
    if (post) {
      const userFilter = users.filter((item: { id: any }) => parseInt(item.id) === parseInt(user))
      userObject = userFilter[0]
    }
    return userObject
  }

  const copyPaste = (post: any) => {
    const dom = <div>Title<p>{post.title}</p> Body<p>{post.body}</p></div>
    toast.success(dom)
  }

  const submit = (e: { preventDefault: () => void, target: any }) => {
    e.preventDefault()
    const title = body.length <= 5 ? body : body.substring(0, 5)
    const values = {
      userId: post.userId,
      id: post.id,
      title: title,
      body: body

    }
    if (post.userId) {
      dispatch(editPost(values))
      setGhost(false)
    } else {
      alert('no user id')
    }
  }

  const editForm = () => {
    return (
      <div className="app__addpost">
        <form className="app__addpostform" onSubmit={submit}>
          <div className="app__addposttexarea">
            <textarea required name="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Type body of post here...'></textarea>
            <input className="button" value="Edit" type="submit"></input>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      id={(index === 99 ? 'post last-item' : 'post')}
      className="post"
      style={props.style}
    >
      <div className="post-user">
        <span className="post-user-name">Username: </span>
        {getUser(post?.userId)?.name} {parseInt(userIdentity) === post.userId ? '(You)' : ''}
      </div>
      <div className='ghostform' style={{ display: `${showghost ? 'block' : 'none'}` }}>
        {editForm()}
      </div>
      <h2 className="post-title">Title: {post.title}</h2>
      <p className="post-body">Body : {post.body}</p>
      <div className="post-floatinactions">
        <button onClick={() => copyPaste(post)} style={{ backgroundColor: '#5f9ea0' }} disabled={loader} className="button">
          Copy
        </button>
        {parseInt(userIdentity) === post.userId
          ? <>
            <button style={{ backgroundColor: '#5f9ea0' }} disabled={loader} className="button" onClick={() => setGhost(!showghost)}>
              Edit
            </button>
            <button style={{ backgroundColor: '#5f9ea0' }} disabled={loader} className="button" onClick={() => dispatch(removePost(post))}>
              Delete
            </button>
          </>

          : ''}
      </div>
    </div>
  )
}

export const MemoizedCard = memo(Card)
