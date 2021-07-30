import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DebuggingState {
  showBorders: boolean
}

const initialState: DebuggingState = {
  showBorders: true,
}

export const debuggingSlice = createSlice({
  name: "debugging",
  initialState,
  reducers: {
    toggleBorders: (state: DebuggingState) => {
      state.showBorders = !state.showBorders
    },
  },
})

export const { toggleBorders } = debuggingSlice.actions

export default debuggingSlice.reducer
