import { useRef, useState, type ComponentType, type MouseEvent, type RefObject } from "react"
import styles from "./index.module.css"

export const WithCustomCursor = <
  P extends object,
  T extends HTMLElement = HTMLElement,
  CursorProps extends Record<string, unknown> = Record<string, unknown>
>(
  WrappedComponent: ComponentType<P>,
  CursorComponent: ComponentType<{ ref: RefObject<T> } & CursorProps>
  ) => {
     // Exclude 'ref' from CursorProps since the library handles it internally
    type PublicCursorProps = Omit<CursorProps, 'ref'>

    return function CustomCursor(props: P & PublicCursorProps) {
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
  
      // Create cursor props object with ref ommited to the parent component, 
      // only the cursor props and wrapped props can be passed ahead
      const cursorPropsWithRef = {
        ref: cursor,
        ...(props as Omit<CursorProps, 'ref'>)
      } as unknown as { ref: RefObject<T> } & CursorProps
  

      return (
        <div className={styles.wrapper} 
          onMouseEnter={() => setIsCursorvisible(true)}
          onMouseLeave={() => setIsCursorvisible(false)}
        >
            <div className={styles.cursor} style={{ opacity: isCursorVisible ? 1 : 0, pointerEvents: 'none' }}>
              <CursorComponent {...cursorPropsWithRef} />
            </div>
            <div onMouseMove={mouseMove} style={{ cursor: 'none' }}>
              <WrappedComponent {...(props as P)} />
            </div> 
        </div>
      )
    }
  }