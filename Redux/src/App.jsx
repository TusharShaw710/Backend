import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useSelector,useDispatch } from 'react-redux'
import { decrement, increment } from './redux/features/counterSlice';


function App() {
  let num=useSelector((state)=>state.counter.value);
  let dispatch=useDispatch();

  return (
    <>
      <h1>{num}</h1>
      <button onClick={()=>{
        dispatch(increment());
      }}>Increment</button>
      <button onClick={()=>{
        dispatch(decrement());
      }}>Decrement</button>
    </>
  )
}

export default App
