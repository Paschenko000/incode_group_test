import React, { createContext, useReducer, useEffect } from "react";
import { Text } from "react-native";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";

export const GameContext = createContext({
  data: {},
  addGuessedCharacters: ({
    attempt,
    id,
  }: {
    attempt: boolean;
    id: string;
  }) => {},
  updateGuessedCharacters: ({
    attempt,
    id,
  }: {
    attempt: boolean;
    id: string;
  }) => {},
  resetGame: () => {},
});

// TODO: delete
type TState = {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  guessedCharacters: { id: string; attempts: boolean[] }[];
  characters: any[];
};

const initialState = {
  totalAttempts: 0,
  successfulAttempts: 0,
  failedAttempts: 0,
  guessedCharacters: [],
  characters: [],
};

enum EGameReducerAction {
  Add = "ADD",
  Set = "SET",
  Reset = "RESET",
  Update = "UPDATE",
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      state.totalAttempts++;
      state.successfulAttempts += action.payload.attempts ? 1 : 0;
      state.failedAttempts += action.payload.attempts ? 0 : 1;
      state.guessedCharacters.push({
        id: action.payload.id,
        attempts: [action.payload.attempts],
      });
      return state;
    case "UPDATE":
      if (action.payload.attempts) {
        state.successfulAttempts += 1;
        state.failedAttempts -= 1;
      } else {
        state.successfulAttempts -= 1;
        state.failedAttempts += 1;
      }

      const charIToUpdate = state.guessedCharacters.findIndex(
        (char) => char.id === action.payload.id,
      );
      state.guessedCharacters[charIToUpdate].attempt.push(
        action.payload.attempts,
      );
      return state;
    case "RESET":
      return (initialState.characters = state.characters);
    case "SET":
      return (state.characters = action.payload);
  }
};

export function GameContextProvider({ children }: React.ReactNode) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    async function getAllCharacters() {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters/students",
        );

        const data = await response.json();
        dispatch({ type: EGameReducerAction.Set, payload: data });
      } catch (e) {
        console.log(e);
      }
    }

    getAllCharacters();
  }, []);

  function addGuessedCharacters({
    attempt,
    id,
  }: {
    attempt: boolean;
    id: string;
  }) {
    dispatch({
      type: EGameReducerAction.Add,
      payload: { attempt, id },
    });
  }

  function updateGuessedCharacters({
    attempt,
    id,
  }: {
    attempt: boolean;
    id: string;
  }) {
    dispatch({
      type: EGameReducerAction.Update,
      payload: { attempt, id },
    });
  }

  function resetGame() {
    dispatch({
      type: EGameReducerAction.Reset,
    });
  }

  const value = {
    data: gameState,
    addGuessedCharacters: addGuessedCharacters,
    updateGuessedCharacters: updateGuessedCharacters,
    resetGame: resetGame,
  };

  // if (!gameState) {
  return <LoadingOverlay />;
  // }

  // return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
