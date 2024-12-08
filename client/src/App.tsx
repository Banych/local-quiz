import { useCallback } from 'react'
import './App.css'
import { useWebsockets } from "./hooks/useWebsockets"

function App() {
  const ws = useWebsockets()

  const handleClick = useCallback(() => {
    ws.sendJsonMessage({ message: "Hello from client" })
  }, [ws])

  return (
    <main className="flex justify-center items-center">
      Hello Vite + React!

      <button onClick={handleClick}>Click me</button>
    </main>
  )
}

export default App
