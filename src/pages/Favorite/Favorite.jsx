import { Box, Text } from "@mantine/core";
import classes from "./Favorite.module.css";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import LogoEmpty from "./components/logoEmpty/LogoEmpty";
import ProductsCart from "./components/productsCart/ProductsCart";
// import { useEffect, useState } from "react";

export default function Favorite() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(products.length);

  // const [val , setVal]=useState("")

  // useEffect(() => {
  //   fetch(`https://fakestoreapi.in/api/users`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.users.filter(e =>  e.email.toLocaleLowerCase().includes(val.toLocaleLowerCase()))))
  //     .catch((error) => console.log(error));
  // }, [val]);

  //  <input type="text" onChange={e => setVal(e.target.value)}/>

  return (
    <Box>
      <Box className={classes.up}>
        <Box className={classes.parent}>
          <Box className={classes.boxHeader}>
            <Text className={classes.title}>Shopping Cart</Text>
            <Text className={classes.counter}>
              {"("} {products.length} items {")"}
            </Text>
          </Box>
          {products.length <= 0 ? (
            <></>
          ) : (
            <>
              <Box display={""} className={classes.boxLink}>
                <Link to={"/"} className={classes.btnShopping}>
                  <IconChevronLeft
                    style={{ width: "20px", height: "20px" }}
                    className={classes.arrow}
                  />
                  <Text className={classes.TextBtn}>Go Shopping</Text>
                </Link>
              </Box>
              <Box display={""} className={classes.twoBoxLink}>
                <Link to={"/"} className={classes.btnShopping}>
                  <IconChevronLeft
                    style={{ width: "20px", height: "20px" }}
                    className={classes.arrow}
                  />
                  <Text className={classes.TextBtn}>Go Shopping</Text>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box>
        {products.length == 0 ? (
          <>
            <LogoEmpty />
          </>
        ) : (
          <>
          <ProductsCart/>
            </>
        )}
      </Box>
    </Box>
  );
}
