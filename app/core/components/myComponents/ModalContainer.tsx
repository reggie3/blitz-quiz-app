import React, { Suspense } from "react"
import { LoginModal } from "../Auth/LoginModal"
import SignupModal from "../Auth/SignupModal"

interface Props {}

const ModalContainer = (props: Props) => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <LoginModal />
        <SignupModal />
      </Suspense>
    </div>
  )
}

export default ModalContainer
