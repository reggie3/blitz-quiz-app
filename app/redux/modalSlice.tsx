import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ModalNames {
  LOGIN = "LOGIN",
}

export interface ModalData {
  isOpen: boolean
  modalName: ModalNames
}

export type ModalState = Record<ModalNames, ModalData>

const initialState: ModalState = {
  [ModalNames.LOGIN]: {
    isOpen: false,
    modalName: ModalNames.LOGIN,
  },
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeAllModals: (state: ModalState) => {
      const newState = {} as ModalState
      Object.keys(state).forEach((key) => {
        newState[key] = { ...state[key], isOpen: false }
      })
      return newState
    },
    closeModal: (state, action: PayloadAction<ModalNames>) => {
      state[action.payload].isOpen = false
    },
    showModal: (state, action: PayloadAction<ModalNames>) => {
      state[action.payload].isOpen = true
    },
  },
})

export const { closeAllModals, closeModal, showModal } = modalSlice.actions

export default modalSlice.reducer
