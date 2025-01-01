import { Box } from '@mantine/core'
import classes from './Bell.module.css'
import { IconBellFilled } from '@tabler/icons-react'
export default function Bell() {
  return (
    <Box className={classes.parentBell}>
      <IconBellFilled
            style={{ height: "28px", width: "28px" }}
            stroke={2.0}
            color="gold"
            className={classes.bell}
          />
    </Box>
  )
}
