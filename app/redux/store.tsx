import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./modalSlice"
import debuggingReducer from "./debuggingSlice"
import uiReducer from "./uiSlice"

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    debugging: debuggingReducer,
    ui: uiReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
