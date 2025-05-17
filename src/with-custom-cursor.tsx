import { useRef, type ComponentType, type ForwardRefExoticComponent, type MouseEvent, type RefAttributes } from "react"
import styles from "./index.module.css"

export type WithCustomCursorProps = {
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void
}

export const WithCustomCursor = <P extends WithCustomCursorProps>(
    WrappedComponent: ComponentType<P>,
    CursorComponent: ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>
  ) => {
    return function CustomCursor({ ...props }: WithCustomCursorProps) {
      const cursor = useRef<HTMLDivElement>(null)
  
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
        <div className={styles.wrapper}>
            <div className={styles.cursor}>
                <CursorComponent ref={cursor} />
            </div>
            <WrappedComponent {...(props as P)} onMouseMove={mouseMove} />
        </div>
      )
    }
  }