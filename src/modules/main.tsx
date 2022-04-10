import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { MemoizedpostContainer } from '../components/postContainer/index'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getAllPosts, getAllUsers } from './_redux/postsActions'
import { User } from '../data/interfaces'

const Main = () => {
  const [search, setSearch] = useState<string>('')
  const [searchable, setSearchable] = useState<string>('')
  const [content, setContent] = useState([])

  const { posts, listLoading, actionsLoading, users } = useSelector((state: RootStateOrAny) => state.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    setContent(posts)
  }, [posts])

  // set search value after 1000 ms
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        if (val.trim().length === 0) {
          setContent(posts)
        } else {
          setSearchable(val)
          const searched = content?.filter((item: { title: string }) => item?.title?.toLowerCase().includes(val.toLowerCase()))
          console.log(searched)
          setContent(searched)
        }
      }, 1000),
    [dispatch]
  )
  // handle cahnge
  const handleChange = useCallback(
    e => {
      setSearch(e.target.value)
      debouncedSearch(e.target.value.trim())
    },
    [debouncedSearch]
  )

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // dispatch()
  }

  return (
    <div className="app">
      <div className="app__input">
        <form>
          <input
            placeholder="Type for searcing..."
            value={search}
            onChange={handleChange}
          />
          <input value='reset' type="reset"></input>
        </form>
      </div>
      <div className="app__containers">
        <MemoizedpostContainer listLoading={listLoading} actionsLoading={actionsLoading} posts={posts} search={searchable}></MemoizedpostContainer>
      </div>
      <div className="app__addpost">
        <div className="app__addpostselect">
          <select name="user" id="user">
            <option value="">Select current user</option>
            {users.map((item: User) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="app__addposttexarea">
          <form onSubmit={submit}>
            <textarea placeholder='Type body of post here...'></textarea>
            <input value="submit" type="submit"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export const MemoizedMain = memo(Main)
