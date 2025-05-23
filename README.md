# with-custom-cursor

A Higher-Order Component (HOC) library for React that enables you to easily add a custom cursor to any component.

![with-custom-cursor logo](with-custom-cursor.png)

## Features
- Wrap any component with a custom cursor that follows mouse movement.
- Fully typed with TypeScript.
- Easy integration and customization.

## Installation

```bash
npm install with-custom-cursor
# or
yarn add with-custom-cursor
```

## Usage

### 1. Create Your Custom Cursor Component

```tsx
import { type RefObject } from "react"

type CursorProps = {
    ref: RefObject<HTMLDivElement>
}
export const Cursor = ({ ref }: CursorProps) => {
    return (
        <div className="cursor" ref={ref}>
            <label>see more</label>
        </div>
    )
}
```
### 2. Styling

```css
.cursor {
    width: 16rem;
    height: 16rem;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    z-index: 9;
    display: flex;
}

.cursor label {
  color: #252525;    
  font-size: 1.8rem;
  font-weight: 400;
}

```

### 3. Wrap Your Component

```tsx
import { WithCustomCursor } from "with-custom-cursor"
import { Cursor } from "./cursor"

const Card = () => {
    return (
        <div className="card">
            <h1>Card</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
        </div>
    )
}

export const CardWithCursor = WithCustomCursor(Card, Cursor)
```

## API

### `WithCustomCursor(WrappedComponent, CursorComponent)`
- `WrappedComponent`: The component you want to enhance with a custom cursor.
- `CursorComponent`: The cursor component (must accept a `ref` prop).

Returns a new component that renders your cursor and the wrapped component.

## Example

<img src="cursor-min.gif" alt="Custom Cursor Example" style="width:50%;max-width:320px;min-width:160px;" />

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

A special thanks to my friend Gabriel Chelles!

## License

MIT © Andre Quintero dos Santos
