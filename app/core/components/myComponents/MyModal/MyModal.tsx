import { makeStyles, Modal, Paper } from "@material-ui/core"
import React, { ReactElement } from "react"
import { MyCloseIconButton } from "../MyCloseIconButton"
import BackdropComponent from "./BackdropComponent"

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
      BackdropComponent={BackdropComponent}
    >
      <Paper className={paper} elevation={5}>
        {shouldShowExitButton && <MyCloseIconButton onClick={onClickClose} />}
        {title && <h2 id="simple-modal-title">{title}</h2>}
        {description && <p id="simple-modal-description">{description}</p>}
        {children}
      </Paper>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: { display: "flex", justifyContent: "center", alignItems: "center" },
  paper: {
    position: "absolute",
    minWidth: 400,
    padding: theme.spacing(2, 4, 3),
  },
}))
