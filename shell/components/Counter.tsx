import React from "react";

type MyCounter = React.FunctionComponent<({ count: number, onIncrement: () => void, onDecrement: () => void })>;

const Counter: MyCounter = ({ count, onIncrement, onDecrement }: { count: number, onIncrement: () => void, onDecrement: () => void }) => (
  <>
    <h2>Counter: {count}</h2>
    <button
      onClick={onIncrement}
    >Plus 1</button>
    <br />
    <button
      onClick={onDecrement}
    >Minus 1</button>
  </>
)

export default Counter;