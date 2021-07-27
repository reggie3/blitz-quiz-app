import React, { Suspense } from "react"
import { LoginModal } from "../Auth/LoginModal"

interface Props {}

const ModalContainer = (props: Props) => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <LoginModal />
      </Suspense>
    </div>
  )
}

export default ModalContainer
