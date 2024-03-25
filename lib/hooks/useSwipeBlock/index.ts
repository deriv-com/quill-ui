import { useEffect, useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'
import { useMediaQuery } from 'usehooks-ts'

type SwipeBlockType = {
  show?: boolean
  onClose?: () => void
}

export const useSwipeBlock = ({ show, onClose }: SwipeBlockType) => {
  const [height, setHeight] = useState('auto')
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // TODO: replace this with useScreens when @aizad-deriv is done with it.
  const isLg = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isLg) {
      setHeight('100%')
    }
    if (!isLg && show) {
      setHeight('auto')
    }
  }, [show, isLg])

  // Check element is scrolled or not
  useEffect(() => {
    const element = containerRef.current

    const handleScroll = () => {
      if (element) {
        const scrolled =
          element.scrollTop > 0 &&
          element.scrollTop + element.clientHeight < element.scrollHeight
        setIsScrolled(scrolled)
      }
    }

    if (element) {
      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [show])

  const bindHandle = useDrag(
    ({ dragging, distance, initial, xy }) => {
      // TODO: @hasan-deriv, we might have to rethink this logic a little bit. for now I'm going to move the windowHeight here
      const windowHeight =
        typeof window !== 'undefined' ? window.innerHeight : 0

      const clientHeight = containerRef.current?.clientHeight || 0
      let draggingPoint = clientHeight
      const isGoingDown = initial[1] < xy[1]

      if (isGoingDown) {
        draggingPoint = draggingPoint - distance[1]
      } else {
        draggingPoint = draggingPoint + distance[1]
      }

      if (dragging) {
        setHeight(`${draggingPoint}px`)
      } else {
        if (distance[1] === 0) return
        if (!isGoingDown) {
          if (draggingPoint >= 0 && draggingPoint <= windowHeight * 0.3) {
            setHeight('30vh')
          } else if (
            draggingPoint >= windowHeight * 0.3 &&
            draggingPoint <= windowHeight * 0.5
          ) {
            setHeight('50vh')
          } else {
            setHeight('90vh')
          }
        } else {
          if (draggingPoint <= windowHeight * 0.3) {
            setHeight('0px')
            onClose?.()
          } else if (draggingPoint <= windowHeight * 0.5) {
            setHeight('30vh')
          } else {
            setHeight('50vh')
          }
        }
      }
    },
    {
      filterTaps: true,
      rubberband: true,
    },
  )
  return { height, containerRef, bindHandle, isScrolled, isLg }
}
