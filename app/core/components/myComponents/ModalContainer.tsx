import React, { Suspense } from "react"
import { LoginModal } from "../Auth/LoginModal"
import SignupModal from "../Auth/SignupModal"
import JoinGameModal from "../gameDashboard/JoinGameModal"

interface Props {}

const ModalContainer = (props: Props) => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <LoginModal />
        <SignupModal />
        <JoinGameModal />
      </Suspense>
    </div>
  )
}

export default ModalContainer
