import { useState } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { User } from '../../data/interfaces'
import { addPost, setGlobalUser } from '../../modules/_redux/postsActions'

export const AddPostForm = () => {
  const { posts, listLoading, actionsLoading, users } = useSelector((state: RootStateOrAny) => state.posts)

  const dispatch = useDispatch()
  const [userId, setUser] = useState<number>(0)
  const [body, setBody] = useState('')

  const userOnchange = (e: any) => {
    const { value } = e.target.value
    setUser(parseInt(e.target.value))
    dispatch(setGlobalUser(e.target.value))
  }
  const submit = (e: { preventDefault: () => void, target: any }) => {
    e.preventDefault()
    const title = body.length <= 5 ? body : body.substring(0, 5)
    const values = {
      userId: userId,
      title: title,
      body: body

    }
    if (userId) {
      dispatch(addPost(values))
      e.target.reset()
    } else {
      alert('no user id')
    }
  }

  return (
        <div className="app__addpost">
            <form className="app__addpostform" onSubmit={submit}>
                <div className="app__addpostselect">
                    <select required value={userId} onChange={(e) => userOnchange(e)} name="userId">
                        <option value="">Select current user</option>
                        {users && users.map((item: User) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="app__addposttexarea">
                    <textarea required name="body" onChange={(e) => setBody(e.target.value)} placeholder='Type body of post here...'></textarea>
                    <input className="button" value="submit" type="submit"></input>
                </div>
            </form>

        </div>

  )
}
