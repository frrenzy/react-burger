import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { MOVE_INGREDIENT } from 'services/actions/order'

import { DRAG_TYPES } from 'utils/constants'

import constructorTileStyles from './constructor-tile.module.scss'

const ConstructorTile = ({
  name,
  price,
  image,
  type,
  index,
  deleteHandler,
}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const [, dropRef] = useDrop({
    accept: DRAG_TYPES.TILE,
    hover: (item, monitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch({ type: MOVE_INGREDIENT, from: dragIndex, to: hoverIndex })

      item.index = hoverIndex
    },
  })

  const [{ isDragged }, dragRef] = useDrag({
    type: DRAG_TYPES.TILE,
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
      {...(type === 'center' && { ref })}
    >
      {type === 'center' && <DragIcon type='primary' />}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        {...(type === 'center'
          ? { handleClose: deleteHandler }
          : { type: type, isLocked: true })}
      />
    </li>
  )
}

ConstructorTile.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  deleteHandler: PropTypes.func,
}

export default ConstructorTile
