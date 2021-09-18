import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./modalSlice"
import debuggingReducer from "./debuggingSlice"
import uiReducer from "./uiSlice"
import gameReducer from "./gameSlice"

export const combinedReducers = {
  modals: modalReducer,
  debugging: debuggingReducer,
  ui: uiReducer,
  game: gameReducer,
}

export const store = configureStore({
  reducer: combinedReducers,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type Store = typeof store
