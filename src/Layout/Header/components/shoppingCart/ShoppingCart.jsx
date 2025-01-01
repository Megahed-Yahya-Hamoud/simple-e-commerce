import classes from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { IconShoppingCart } from "@tabler/icons-react";
import { Box } from "@mantine/core";

export default function ShoppingCart() {

  const products = JSON.parse( localStorage.getItem("cart")) || [];
  

  return (
    <Link className={classes.favoriteLink} to={"/favorite"}>
      {products.length > 0 ? (
        <Box className={classes.numberOfProducts}>{products.length}</Box>
      ) : (
        <></>
      )}
      <IconShoppingCart
        style={{ height: "28px", width: "28px" }}
        stroke={2.0}
      />
    </Link>
  );
}
