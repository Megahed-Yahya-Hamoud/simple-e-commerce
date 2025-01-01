import { Box } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import classes from './User.module.css'
export default function User() {
  return (
    <Box>
          <IconUser className={classes.iconUser} style={{ height: "28px", width: "28px" }} stroke={2.0} />
    </Box>
  )
}
