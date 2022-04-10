import { memo } from 'react'
import { differenceInDays, fromUnixTime } from 'date-fns'
import { useDispatch } from 'react-redux'

const Card = (props: any) => {
  const { act, post, left, loader, index } = props
  const dispatch = useDispatch()

  return (
        <div
            id={(index === 99 ? 'post last-item' : 'post') }
            className="post"
            onMouseOver={(e) => {
              const el = e.currentTarget
              let l = 0
              function updateColor (newl: number) {
                l = newl
                el.style.backgroundColor = `${left ? '#64c864' : '#c86464'}${20 + l * 5}`
                if (l < 10) {
                  setTimeout(() => updateColor(l + 1), 25)
                }
              }
              setTimeout(() => updateColor(l + 1), 25)
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = `${left ? '#64c86420' : '#c864642'}`)
            }
        >
            <div className="post-image" style={{ backgroundImage: `url(${post.poster})` }}>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-release">
                <span className="post-release-date">Release date:{' '}</span>
                {differenceInDays(new Date(), fromUnixTime(post.release_date))}{' '}
                 <span className="post-release-days">days ago</span>
            </div>
            <button style={{ backgroundColor: `${left ? '#5f9ea0' : 'red'}` }} disabled={loader} className="button" onClick={() => dispatch(act(post))}>
                {left ? 'Add' : 'Remove'}
            </button>
        </div>
  )
}

export const MemoizedCard = memo(Card)
