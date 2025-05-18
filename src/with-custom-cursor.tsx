import { useRef, useState, type ComponentType, type MouseEvent, type RefObject } from "react"
import styles from "./index.module.css"

export type WithCustomCursorProps = {
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void
}

export const WithCustomCursor = <P extends object, T extends HTMLElement = HTMLElement>(
    WrappedComponent: ComponentType<P & WithCustomCursorProps>,
    CursorComponent: ComponentType<{ ref: RefObject<T | null> }>
  ) => {
    return function CustomCursor(props: P) {
      const cursor = useRef<T>(null)
      const [ isCursorVisible, setIsCursorvisible ] = useState(false)

      const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const axisX = e.clientX - rect.left
        const axisY = e.clientY - rect.top
        if (cursor && cursor.current) {
          const { x, y } = getCenterOfCursor(
            cursor.current.clientWidth,
            cursor.current.clientHeight,
            axisX,
            axisY
          )
          cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
      }
  
      const getCenterOfCursor = (
        widthElement: number,
        heightElement: number,
        xAxis: number,
        yAxis: number
      ) => {
        const x = xAxis - widthElement / 2
        const y = yAxis - heightElement / 2
  
        return { x, y }
      }
  
      return (
        <div className={styles.wrapper} 
          onMouseEnter={() => setIsCursorvisible(true)}
          onMouseLeave={() => setIsCursorvisible(false)}
        >
            <div className={styles.cursor} style={{ opacity: isCursorVisible ? 1 : 0, pointerEvents: 'none' }}>
                <CursorComponent ref={cursor} />
            </div>
            <WrappedComponent {...(props as P) } onMouseMove={mouseMove} />
        </div>
      )
    }
  }