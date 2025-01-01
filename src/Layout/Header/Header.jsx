import { Box } from "@mantine/core";
import classes from "./Header.module.css";
import User from "./components/user/User";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Bell from "./components/bell/Bell";
import Search from "./components/search/Search";
import Logo from "./components/logo/Logo";
export default function Header() {
  return (
    <Box className={classes.containerHeader}>
      <Box className={classes.parent}>
        <Logo/>
        <Box>
          <Search/>
        </Box>
        <Box className={classes.icons}>
          <Bell/>
          <ShoppingCart/>
          <User/>
        </Box>
      </Box>
    </Box>
  );
}
