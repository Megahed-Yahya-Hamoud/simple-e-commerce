import { Box } from '@mantine/core'
import classes from './Line.module.css'
export default function Line(color) {
        
  return (
    <Box display={"flex"} style={{ justifyContent: "center" }}>
        {
            color.color == 'white' ? 
            <Box className={classes.lineOne}></Box>
            :
            <Box className={classes.lineTwo}></Box>
        }
  </Box>
  )
}
