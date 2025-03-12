import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store/store'
import { decrement, increment } from './redux/slice/CounterSlice'
import './App.css'
import AppRouter from './router/AppRouter'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <AppRouter />
      {/* <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div> */}
    </div>
  )
}

export default App
