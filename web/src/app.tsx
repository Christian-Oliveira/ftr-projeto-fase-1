import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { Slide, ToastContainer } from 'react-toastify'

export function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable={false}
        pauseOnFocusLoss={false}
        theme="light"
        transition={Slide}
      />
    </>
  )
}

export default App
