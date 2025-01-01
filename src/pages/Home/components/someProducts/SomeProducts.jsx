import { Box, Button, Image, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./SomeProducts.module.css";
import { IconBasket } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
export default function SomeProducts() {
  const [someProducts, setSomeProducts] = useState([]);
  const [someProductsTwo, setSomeProductsTwo] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products")
      .then((res) => res.json())
      .then((data) => {
        setSomeProducts(data.products.slice(22, 24)),
          setSomeProductsTwo(data.products.slice(24, 26));
      })
      .catch((error) => console.log(error));
  }, []);

  function showDiscount(discount, price) {
    let percentage = (discount / 100) * price;

    const newPrice = price - percentage;

    const newDiscount = Math.round(newPrice);

    return (
      <Box pl={3} className={classes.off}>
        <Box className={classes.containerPrice}>
          <Text pt={1} c={"#A5A5AD"} fz={14} fw={500}>
            <del>{price}</del>
          </Text>
          <Text fw={600} fz={17}>
            <span style={{ color: "#22C55E" }}>$</span>
            {newDiscount}
          </Text>
        </Box>
        <Box display={"flex"}>
          <Box mr={5} className={classes.discountBox}>
            {discount}%
          </Box>
          <Text pt={3} fz={14} fw={500}>
            off
          </Text>
        </Box>
      </Box>
    );
  }

  const [opened, { open, close }] = useDisclosure(false);

  const [single, setSingle] = useState(0);
  const [showSingleProduct, setShowSingleProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/+${single}`)
      .then((res) => res.json())
      .then((data) => setShowSingleProduct(data.product));
  }, [single]);

  function showDiscountModal(discount, price) {
    let percentage = (discount / 100) * price;

    const newPrice = price - percentage;

    const newDiscount = Math.round(newPrice);

    return (
      <Box mb={15} className={classes.containerPrice}>
        <Text pt={6} c={"#A5A5AD"} fz={18} fw={500}>
          <del>{price}</del>
        </Text>
        <Text fw={600} fz={28} className={classes.discountINModal}>
          <span style={{ color: "#22C55E" }}>$</span>
          {newDiscount}
        </Text>
        <Box className={classes.discountBox}>{discount}%</Box>
        <Text fz={19} fw={500}>
          off
        </Text>
      </Box>
    );
  }





  
  async function add(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const res = await fetch(`https://fakestoreapi.in/api/products/${id}`);
    const data = await res.json();
    const addProducts = data.product;

    const found = cart.find((ele) => ele.id === addProducts.id);

    if (!found) {
      cart.push(addProducts);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Added");
      notifications.show({
        message: "Added",
        color: "green",
      });

    } else {
      console.log("found it");
      notifications.show({
        message: "found it",
        color: "blue",
      });
    }
  }

  const forCheck = JSON.parse(localStorage.getItem("cart")) || [];

  const [btn, setBtn] = useState(false);

  function checkAddedProduct(id) {

    const foundId = forCheck.find((ele) => ele.id == id);

    if (!foundId  || localStorage.length <=0){
       setBtn(false);
    } else {
       setBtn(true);
    }
  }


  return (
    <Box pr={20}>
      <Box className={classes.containerProducts}>
        {someProducts.map((ele) => (
          <Box className={classes.productCard} key={ele.id} >
            <Box
              onClick={() => {
                open(), setSingle(ele.id) ,  checkAddedProduct(ele.id);
              }}
              className={classes.containerImage}
            >
              <Image className={classes.productImage} src={ele.image} />
            </Box>
            <Box pl={6}>
              <Text className={classes.title}>{ele.title}</Text>

              {ele.discount ? (
                <>{showDiscount(ele.discount, ele.price)}</>
              ) : (
                <>
                  <Text fw={600} fz={16} ta={"start"}>
                    <span style={{ color: "#22C55E" }}>$</span>
                    {ele.price}
                  </Text>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box mt={25} className={classes.containerProducts}>
        {someProductsTwo.map((ele) => (
          <Box className={classes.productCard} key={ele.id}>
            <Box
              onClick={() => {
                open(), setSingle(ele.id) , checkAddedProduct(ele.id); ;
              }}
              className={classes.containerImage}
            >
              <Image className={classes.productImage} src={ele.image} />
            </Box>
            <Box pl={6}>
              <Text className={classes.title}>{ele.title}</Text>

              {ele.discount ? (
                <>{showDiscount(ele.discount, ele.price)}</>
              ) : (
                <>
                  <Text fw={600} fz={16} ta={"start"}>
                    <span style={{ color: "#22C55E" }}>$</span>
                    {ele.price}
                  </Text>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 3,
        }}
        size="70rem"
        styles={{
          content: { borderRadius: "15px" },
          header: { paddingBottom: "0px", paddingTop: "0px" },
          close: { border: "0px", outline: "none", color: "red" },
        }}
      >
        <Box className={classes.modal} p={10} pt={0}>
          <Box className={classes.boxImageModal}>
            <Image
              className={classes.imageModal}
              src={showSingleProduct.image}
            />
          </Box>
          <Box className={classes.boxContentModal}>
            <Text className={classes.productTitleModal}>
              {showSingleProduct.title}
            </Text>
            {showSingleProduct.discount ? (
              <>
                {showDiscountModal(
                  showSingleProduct.discount,
                  showSingleProduct.price
                )}
              </>
            ) : (
              <>
                <Text fw={600} fz={19} ta={"start"}>
                  <span style={{ color: "#22C55E" }}>$</span>
                  {showSingleProduct.price}
                </Text>
              </>
            )}
            <Box mb={10}>
              <Box display={"flex"} style={{ gap: "2rem" }}>
                <Text fw={600}>Brand:</Text>
                <span
                  style={{
                    fontWeight: 400,
                    color: "#1F1F1F",
                    fontSize: "17px",
                  }}
                >
                  {showSingleProduct.brand}
                </span>
              </Box>
              <Box display={"flex"} style={{ gap: "1.7rem" }}>
                <Text fw={600}>Model:</Text>
                <span
                  style={{
                    fontWeight: 400,
                    color: "#1F1F1F",
                    fontSize: "17px",
                  }}
                >
                  {showSingleProduct.model}
                </span>
              </Box>

              {showSingleProduct.color ? (
                <Box display={"flex"} style={{ gap: "2rem" }}>
                  <Text fw={600}>Color:</Text>
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#1F1F1F",
                      fontSize: "17px",
                    }}
                  >
                    {showSingleProduct.color}
                  </span>
                </Box>
              ) : (
                <></>
              )}
            </Box>

            <Box mb={15}>
              <Text mb={1} fw={600}>
                About this product:
              </Text>
              <Text className={classes.descriptionModal} pr={5}>
                {showSingleProduct.description}
              </Text>
            </Box>
            <Box display={"flex"} style={{ justifyContent: "center" }}>

            {btn == false   ? (
                <>
                  <Button
                    px={50}
                    className={classes.btaAddCart}
                    style={{ borderRadius: "50px" }}
                    color="#3F4E4F"
                    onClick={() =>{ add(showSingleProduct.id) , setBtn(true)}}
                  >
                    <IconBasket stroke={1.5} style={{ marginRight: "8px" }} />
                    Add to Cart
                  </Button>
                </>
              ) : (
                <Button
                    px={50}
                    className={classes.btaAddCart}
                    style={{ borderRadius: "50px" }}
                    color="green"
                    onClick={() => add(showSingleProduct.id)}
                  >
                    <IconBasket stroke={1.5} style={{ marginRight: "8px" }} />
                    Added to Cart
                  </Button>
              )}


              {/* <Button
                px={50}
                className={classes.btaAddCart}
                style={{ borderRadius: "50px" }}
                color="#3F4E4F"
              >
                <IconBasket stroke={1.5} style={{ marginRight: "8px" }} />
                Add to Cart
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
