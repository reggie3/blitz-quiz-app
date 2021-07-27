import { IconButton, makeStyles, Modal } from "@material-ui/core"
import React, { ReactElement } from "react"
import CloseIcon from "@material-ui/icons/Close"
import { MyCloseIconButton } from "./MyCloseIconButton"

interface Props {
  children: ReactElement
  description?: string
  isOpen: boolean
  onClickClose: () => void
  shouldShowExitButton?: boolean
  title?: string
}

export const MyModal = ({
  children,
  description,
  isOpen,
  onClickClose,
  shouldShowExitButton = true,
  title,
}: Props) => {
  const { modalRoot, paper } = useStyles()
  return (
    <Modal
      open={isOpen}
      onClose={onClickClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={modalRoot}
    >
      <div className={paper}>
        {shouldShowExitButton && <MyCloseIconButton onClick={onClickClose} />}
        {title && <h2 id="simple-modal-title">{title}</h2>}
        {description && <p id="simple-modal-description">{description}</p>}
        {children}
      </div>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: { display: "flex", justifyContent: "center", alignItems: "center" },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
