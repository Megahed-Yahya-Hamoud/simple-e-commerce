import { Box , Loader } from '@mantine/core'

export default function Loading() {
  return (
    <Box h={"100vh"} style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
        <Loader color="blue" size="xl" type="dots" />
    </Box>
  )
}
