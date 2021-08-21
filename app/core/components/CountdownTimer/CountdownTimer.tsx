import { Box, Paper, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { differenceInSeconds, differenceInMinutes } from "date-fns"

interface Props {
  endTimeMillis: number
  onComplete?: () => void
}

const CountdownTimer = ({ endTimeMillis, onComplete }: Props) => {
  const [minutes, setMinutes] = useState<number | null>(null)
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.max(differenceInSeconds(new Date(endTimeMillis), Date.now()), 0)
      const minutes = Math.max(differenceInMinutes(new Date(endTimeMillis), Date.now()), 0)
      setSeconds(seconds)
      setMinutes(minutes)
    }, 1000)

    return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      onComplete && onComplete()
    }
  }, [seconds, minutes, onComplete])
  return (
    <Paper>
      <Box
        px={2}
        py={1}
        width={66}
        height={42}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {seconds !== null && minutes !== null && (
          <Typography>{`${minutes}:${
            (seconds + "").length === 2 ? seconds : "0" + seconds
          }`}</Typography>
        )}
      </Box>
    </Paper>
  )
}

export default CountdownTimer
