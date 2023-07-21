import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
     
      <h1>Counter-Test-Undestanding Rune</h1>
      <div className="card">
        <div>
          <h1>{game.count}</h1>
        </div>
        <button className="increment" onClick={() => Rune.actions.increment({ amount: 1 })}>+</button>

        <button className="decrement" onClick={() => Rune.actions.decrement({ amount: 1 })}>-</button>
        <p>
          Edit <code>src/App.tsx</code> or <code>src/logic.ts</code> and save to
          test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and Rune logos to learn more
      </p>
    </>
  )
}

export default App
