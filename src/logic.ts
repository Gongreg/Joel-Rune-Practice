import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  counters: Record<string, number>;
}

export type GameActions = {
  changeCounter: (params: {
    playerId: string;
    amount: number;
  }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (playerIds) => {
    return {
      counters: Object.fromEntries(playerIds.map(playerId => [playerId, 0])),
    };
  },
  actions:{
    changeCounter({playerId, amount}, {game}) {
      if (game.counters[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.counters[playerId] += amount;
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.counters[playerId] = 0;
    },
    playerLeft(playerId, {game}) {
      delete game.counters[playerId];
    },
  }
});