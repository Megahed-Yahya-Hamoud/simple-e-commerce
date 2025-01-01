import { Box, Image, Text } from "@mantine/core";
import classes from "./ProductsPay.module.css";
import { IconArrowLeft, IconBuildingStore } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function ProductsPay() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = JSON.parse(localStorage.getItem("total")) || "";

  function showDiscount(discount, price) {
    let percentage = (discount / 100) * price;

    const newPrice = price - percentage;

    const newDiscount = Math.round(newPrice);

    return products.length > 1 ? (
      <Box className={classes.containerPrice}>
        <Text fw={500} fz={14}>
          ${newDiscount}.00
        </Text>
      </Box>
    ) : (
      <Box className={classes.containerPrice}>
        <Text className={classes.singleProductPrice} fw={600}>
          ${newDiscount}.00
        </Text>
      </Box>
    );
  }

  return (
    <Box className={classes.parent}>
      <Box className={classes.containerProducts}>
        <Box className={classes.containerBack}>
          <Link to={"/favorite"} className={classes.btnBack}>
            <IconArrowLeft className={classes.arrow} />
            <Box className={classes.boxIcon}>
              <IconBuildingStore className={classes.store} />
              <Text className={classes.back}>Back</Text>
            </Box>
          </Link>
          <Box className={classes.title}>TEST MODE</Box>
        </Box>
        {products.length > 1 ? (
          <Box className={classes.containerBtnBack} mt={"2rem"}>
            <Text ta={"start"} fw={500} c={"hsl(0deg 0% 10% / 60%)"}>
              Pay
            </Text>
            <Text fw={600} fz={36}>
              ${totalPrice}.00
            </Text>
          </Box>
        ) : (
          <></>
        )}
        <Box className={classes.containerProductsCard}>
          {products.length > 1
            ? products.map((ele) => (
                <Box className={classes.productCard} key={ele.id}>
                  <Image src={ele.image} w={50} h={50} />
                  <Box>
                    <Text className={classes.productTitle}>{ele.title}</Text>
                    <Text ta={"start"} c={"#1a1a1a80"} fw={400} fz={12}>
                      Qyt 1
                    </Text>
                  </Box>
                  <Box>{showDiscount(ele.discount, ele.price)}</Box>
                </Box>
              ))
            : products.map((ele) => (
                <Box className={classes.singleProductCard} key={ele.id}>
                  <Text className={classes.singleProductTitle}>
                    {ele.title}
                  </Text>
                  <Box className={classes.singlePrice}>
                    {showDiscount(ele.discount, ele.price)}
                  </Box>
                  <Text
                    className={classes.singleProductQyt}
                    c={"#1a1a1a99"}
                    fw={500}
                    fz={14}
                  >
                    Qyt 1, ${totalPrice}.00 each{" "}
                  </Text>
                  <Box
                    className={classes.singleProductImage}
                    display={"flex"}
                    style={{ justifySelf: "center" }}
                  >
                    <Image
                      src={ele.image}
                      className={classes.singleImage}
                      mt={15}
                    />
                  </Box>
                  <Box></Box>
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  );
}
