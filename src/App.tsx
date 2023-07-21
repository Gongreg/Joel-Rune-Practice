import React, { useEffect, useState } from "react"

import "./App.css"
import type { Players, PlayerId } from "rune-games-sdk/multiplayer"

import { GameState } from "./logic.ts"

function App() {
  const [game, setGame] = useState<GameState>()
  const [players, setPlayers] = useState<Players>([])
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, players, yourPlayerId }) => {
        setGame(newGame)
        setPlayers(players)
        setYourPlayerId(yourPlayerId)
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
          <h1>
            {yourPlayerId ? (
              <>My count: {game.counters[yourPlayerId]}</>
            ) : (
              <>I am a spectator, so I don't have count</>
            )}
          </h1>

          <h2>Other Player counts</h2>
          {Object.keys(players)
            .filter((playerId) => playerId !== yourPlayerId)
            .map((playerId) => (
              <React.Fragment key={playerId}>
                {players[playerId].displayName} count: {game.counters[playerId]}
              </React.Fragment>
            ))}
        </div>
        {yourPlayerId ? (
         <>
           <button
             className="increment"
             onClick={() =>
               Rune.actions.changeCounter({ amount: 1, playerId: yourPlayerId })
             }
           >
             +
           </button>

           <button
             className="decrement"
             onClick={() =>
               Rune.actions.changeCounter({ amount: -1, playerId: yourPlayerId })
             }
           >
             -
           </button>

         </>
        ): <>Spectators are not able to call actions</>}
      </div>
    </>
  )
}

export default App
