import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { Post } from '../../data/interfaces'
import { MemoizedCard } from '../card'
import { addPost, getAllPosts } from '../../modules/_redux/postsActions'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

export const PostContainer = (props: any) => {
  const perfectScrollbarOptions = {
    wheelSpeed: 2,
    wheelPropagation: false
  }
  const dispatch = useDispatch()
  const { listLoading, actionsLoading, posts } = props
  const { newPostIndex } = useSelector((state: RootStateOrAny) => state.posts)

  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [scrollIndex, setScroll] = useState(undefined)

  useEffect(() => {
    setScroll(newPostIndex)
  }, [newPostIndex])

  const [error, setError] = useState(null)
  const prevY = useRef(0) // storing the last intersection y position

  const observer: any = useRef()

  const setTargetElement = useCallback((node) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(prevState => {
          return prevState + 1
        })
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 200
  }))

  useEffect(() => {
    // get all posts the data amounts to 100
    if (pageNumber < 6) {
      fetchI(pageNumber)
    }
  }, [dispatch, pageNumber])

  const fetchI = (val: number) => {
    dispatch(getAllPosts(val))
    setIsFirstLoad(false)
    setIsLoading(false)
  }

  return (
    <div className="post-container__main">
      {isFirstLoad
        ? (
          <p></p>
          )
        : (
          <>
            {posts.length
              ? (
                <div style={{ width: '100%', height: '80vh' }}>
                  <AutoSizer>
                    {({ width, height }) => (
                      <List
                      width={width}
                      scrollToIndex={scrollIndex}
                      height={height}
                      deferredMeasurementCache={cache.current} rowHeight={cache.current.rowHeight} rowCount={posts.length}
                        rowRenderer={({ key, index, style, parent }): any => {
                          const post = posts[index]
                          if (posts.length === index + 1) {
                            return (
                            <CellMeasurer columnIndex={0} rowIndex={index} key={key} cache={cache.current} parent={parent}>
                              <div style={style} ref={setTargetElement}>
                                <MemoizedCard index={index} key={post.id} loader={actionsLoading} left={true} act={() => addPost(post)} post={post}></MemoizedCard>
                              </div>
                            </CellMeasurer>
                            )
                          } else {
                            return (
                              <CellMeasurer columnIndex={0} rowIndex={index} key={key} cache={cache.current} parent={parent}>
                              <div style={style}>
                                <MemoizedCard index={index} key={post.id} loader={actionsLoading} left={true} act={() => addPost(post)} post={post}></MemoizedCard>
                              </div>
                            </CellMeasurer>
                            )
                          }
                        }}
                      />
                    )}
                  </AutoSizer>
                </div>
                )
              : null}
          </>
          )}

      {(posts.length === 0 && !actionsLoading) && (
        <div>
          <p>No data</p>
        </div>
      )}
    </div>
  )
}

export const MemoizedpostContainer = memo(PostContainer)
