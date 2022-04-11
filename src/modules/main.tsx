import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { debounce, isEmpty } from 'lodash'
import { MemoizedpostContainer } from '../components/postContainer/index'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from './_redux/postsActions'
import { AddPostForm } from '../components/form/form'

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
        if (isEmpty(val)) {
          setContent(posts)
        } else {
          setSearchable(val)
          const getUser = users.filter((item: { company: { name: string } }) => item.company.name.toLowerCase().includes(val.toLowerCase()))
          const output = posts.filter((x: any) => getUser.find((y: { id: any;}) => (y.id === x.userId)))
          setContent(output)
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

  const reset = () => {
    setSearch('')
    setContent(posts)
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
          <button onClick={reset} className='outlined' value='reset' type="reset">Reset</button>
        </form>
      </div>
      <div className="app__containers">
        <MemoizedpostContainer listLoading={listLoading} actionsLoading={actionsLoading} posts={content} search={searchable}></MemoizedpostContainer>
      </div>
      <AddPostForm/>
    </div>
  )
}

export const MemoizedMain = memo(Main)
