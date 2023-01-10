import { useRef, FC } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { MOVE_INGREDIENT } from 'services/actions/order'

import { DragType, TileType } from 'utils/types'

import constructorTileStyles from './constructor-tile.module.scss'

type IConstructorTileProps = {
  name: string
  price: number
  image: string
} & (
  | {
      type: TileType.Bottom | TileType.Top
      index?: number
      deleteHandler?: () => void
    }
  | {
      type: TileType.Center
      index: number
      deleteHandler: () => void
    }
)

const ConstructorTile: FC<IConstructorTileProps> = ({
  name,
  price,
  image,
  type,
  index,
  deleteHandler,
}) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLLIElement>(null)

  const [, dropRef] = useDrop({
    accept: DragType.Tile,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index!
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()!
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch({ type: MOVE_INGREDIENT, from: dragIndex, to: hoverIndex })

      item.index = hoverIndex
    },
  })

  const [{ isDragged }, dragRef] = useDrag({
    type: DragType.Tile,
    item: { index },
    collect: monitor => ({
      isDragged: monitor.isDragging(),
    }),
  })

  dragRef(dropRef(ref))

  const opacity = isDragged ? 0 : 1

  return (
    <li
      className={`${constructorTileStyles.tile} pl-4`}
      style={{ opacity }}
      ref={type === TileType.Center ? ref : undefined}
    >
      {type === 'center' && <DragIcon type='primary' />}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        {...(type === TileType.Center
          ? { handleClose: deleteHandler }
          : { type: type, isLocked: true })}
      />
    </li>
  )
}

export default ConstructorTile
