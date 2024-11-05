import React, { createContext, useReducer, useEffect, useContext } from "react";
import { Text } from "react-native";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";

type TState = {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  guessedCharacters: { id: string; attempts: boolean[] }[];
  characters: any[];
};

type TGameContext =
  | {
      data: TState;
      addGuessedCharacters: ({ attempt: boolean, id: string }) => void;
      updateGuessedCharacters: ({ attempt: boolean, id: string }) => void;
      resetGame: () => void;
    }
  | undefined;

export const GameContext = createContext<TGameContext>({
  data: {
    ...initialState,
  },
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

const initialState = {
  totalAttempts: 0,
  successfulAttempts: 0,
  failedAttempts: 0,
  guessedCharacters: [],
  characters: [],
  gameId: 0,
};

enum EGameReducerAction {
  Add = "ADD",
  Set = "SET",
  Reset = "RESET",
  Update = "UPDATE",
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const newState = { ...state };
      newState.totalAttempts++;
      newState.successfulAttempts += action.payload.attempt ? 1 : 0;
      newState.failedAttempts += action.payload.attempt ? 0 : 1;
      newState.guessedCharacters = [
        ...newState.guessedCharacters,
        { id: action.payload.id, attempts: [action.payload.attempt] },
      ];

      return newState;
    }
    case "UPDATE": {
      const newState = { ...state };
      if (action.payload.attempt) {
        newState.successfulAttempts += 1;
        newState.failedAttempts -= 1;
      }

      const charIToUpdate = newState.guessedCharacters.findIndex(
        (char) => char.id === action.payload.id,
      );
      newState.guessedCharacters = [...newState.guessedCharacters];
      newState.guessedCharacters[charIToUpdate] = {
        ...newState.guessedCharacters[charIToUpdate],
        attempts: [
          ...newState.guessedCharacters[charIToUpdate].attempts,
          action.payload.attempt,
        ],
      };

      return newState;
    }
    case "RESET":
      return {
        ...initialState,
        characters: state.characters,
        gameId: state.gameId + 1,
      };
    case "SET":
      return { ...state, characters: action.payload };
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

  // console.log(gameState.characters, "gameState");
  if (gameState.characters.length === 0) {
    return <LoadingOverlay />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }

  return context;
};
