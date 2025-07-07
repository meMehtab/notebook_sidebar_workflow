'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, DatabaseConnection, Schema, QueryResult, ChatMessage, SidebarTab } from '../types';

interface AppContextType {
  state: AppState;
  setConnection: (connection: DatabaseConnection) => void;
  setSchema: (schema: Schema) => void;
  setCurrentTab: (tab: SidebarTab) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setQueryResult: (result: QueryResult | null) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_CONNECTION'; payload: DatabaseConnection }
  | { type: 'SET_SCHEMA'; payload: Schema }
  | { type: 'SET_CURRENT_TAB'; payload: SidebarTab }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_QUERY_RESULT'; payload: QueryResult | null }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_ERROR' };

const initialState: AppState = {
  connection: null,
  schema: null,
  currentTab: 'connect',
  isLoading: false,
  error: null,
  queryResult: null,
  chatMessages: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CONNECTION':
      return { ...state, connection: action.payload };
    case 'SET_SCHEMA':
      return { ...state, schema: action.payload };
    case 'SET_CURRENT_TAB':
      return { ...state, currentTab: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_QUERY_RESULT':
      return { ...state, queryResult: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setConnection = (connection: DatabaseConnection) => {
    dispatch({ type: 'SET_CONNECTION', payload: connection });
  };

  const setSchema = (schema: Schema) => {
    dispatch({ type: 'SET_SCHEMA', payload: schema });
  };

  const setCurrentTab = (tab: SidebarTab) => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: tab });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setQueryResult = (result: QueryResult | null) => {
    dispatch({ type: 'SET_QUERY_RESULT', payload: result });
  };

  const addChatMessage = (message: ChatMessage) => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setConnection,
        setSchema,
        setCurrentTab,
        setLoading,
        setError,
        setQueryResult,
        addChatMessage,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}