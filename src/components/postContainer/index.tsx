import React, { memo, useEffect, useRef, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Post } from '../../data/interfaces'
import { MemoizedCard } from '../card'
import { addPost, getAllPosts, setRange } from '../../modules/_redux/postsActions'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

export const PostContainer = (props: any) => {
  const perfectScrollbarOptions = {
    wheelSpeed: 2,
    wheelPropagation: false
  }
  const dispatch = useDispatch()
  const { range } = useSelector((state: RootStateOrAny) => state.posts)

  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [st, setNewRange] = useState([0, 20])

  const [error, setError] = useState(null)
  const [targetElement, setTargetElement] = useState(null)
  const prevY = useRef(0) // storing the last intersection y position

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  // useEffect(() => {
  //   // get all posts
  //   console.log(range)
  //   setNewRange(range)
  //   console.log(st)
  // }, [range])

  console.log(st)

  const handleObserver = (entities: any, observer: any) => {
    const y = entities[0].boundingClientRect.y
    if (prevY.current > y) {
      const arr = Array.from(st, x => x + 20)

      console.log(st)
      setNewRange(arr)
      console.log('lets fetch again')
      console.log(st)

      fetchI(range[0], range[1])
      dispatch(setRange(range[0], range[1]))
    }

    prevY.current = y
    const arr = Array.from(st, x => x + 20)
    console.log(arr)
  }

  useEffect(() => {
    // get all posts
    fetchI(range[0], range[1])
  }, [dispatch])

  const fetchI = (start: number, end: number) => {
    dispatch(getAllPosts(start, end))
    setIsFirstLoad(false)
    setIsLoading(false)
  }

  useEffect(() => {
    if (targetElement) {
      observer.current.observe(targetElement)
    }
  }, [targetElement])

  const observer = useRef(new IntersectionObserver(handleObserver, options))

  const { posts, listLoading, actionsLoading } = props

  return (
    <div className="post-container__main">

          <PerfectScrollbar
            options={perfectScrollbarOptions}
            className="scroll pr-7 mr-n7"
            style={{ maxHeight: '80vh', position: 'relative' }}
          >
            {isFirstLoad
              ? (
                <p>;load</p>
                )
              : (
                <>
                  {posts.length
                    ? (
                      <>
                        {posts.map((post: Post, index: number) => {
                          return <MemoizedCard index={index} key={post.id} loader={actionsLoading} left={true} act={() => addPost(post)} post={post}></MemoizedCard>
                        })}
                      </>
                      )
                    : null}
                </>
                )}

            <p style={{ display: `${isLoading ? 'none' : ''}` }}
              ref={setTargetElement as unknown as React.RefObject<HTMLDivElement>} className="loading-new-images">Loading New Images ...</p>
            {(posts.length === 0) && (
              <div>
                <p>No data</p>
              </div>
            )}
          </PerfectScrollbar>

    </div>
  )
}

export const MemoizedpostContainer = memo(PostContainer)
