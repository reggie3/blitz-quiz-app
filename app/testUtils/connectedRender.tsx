// test-utils.jsx
import React, { ReactElement } from "react"
import { render as rtlRender } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { combinedReducers, RootState, Store } from "app/redux/store"
import { RenderOptions } from "test/utils"

interface RenderOptionsWithRedux extends Omit<RenderOptions, "queries"> {
  preloadedState: RootState
  store: Store
}

const render = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: combinedReducers, preloadedState }),
    ...renderOptions
  }: RenderOptionsWithRedux
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react"

// override render method
export { render }
