import { AnimatePresence, motion } from "framer-motion"
import React from "react"

interface Props {}

const BackdropComponent = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.23 }}
        exit={{ opacity: 0 }}
        style={{ backgroundColor: "blue", width: "100vw", height: "100vh" }}
      ></motion.div>
    </AnimatePresence>
  )
}

export default BackdropComponent
