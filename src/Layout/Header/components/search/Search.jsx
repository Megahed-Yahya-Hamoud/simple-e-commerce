import { Box, Button, Image, Modal, Text } from "@mantine/core";
import classes from "./Search.module.css";
import { IconBasket, IconSearch, IconZoomCancel } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Line from "../line/Line";
import { useDisclosure } from "@mantine/hooks";

const mainColor = "white";
export default function Search() {
  const [value, setValue] = useState("");
  const [single, setSingle] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);


  // ============      fetch product in modal    ===================

  const [showSingleProduct, setShowSingleProduct] = useState({});
  
  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/${single}`)
      .then((res) => res.json())
      .then((data) => setShowSingleProduct(data.product));
  }, [single]);

  // ============     Discount in modal    ===================

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

  // ============  data   ===================


  const [firstData, setFirstData] = useState([]);
  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=1`)
      .then((res) => res.json())
      .then((data) => setFirstData(data.products))
      .catch((error) => console.log(error));
  }, []);

  const [secondData, setSecondData] = useState([]);
  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=2`)
      .then((res) => res.json())
      .then((data) => setSecondData(data.products))
      .catch((error) => console.log(error));
  }, []);

  const [thirdData, setThirdData] = useState([]);
  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=3`)
      .then((res) => res.json())
      .then((data) => setThirdData(data.products))
      .catch((error) => console.log(error));
  }, []);

  let data = [];
  data.push(firstData, secondData, thirdData);
  let newArr = data.flat(Infinity);
  let newData = newArr.filter((ele) =>
    ele.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );

  return (
    <Box className={classes.search}>
      <IconSearch style={{ height: "20px", width: "20px" }} stroke={1.8} />
      <input
        type="search"
        placeholder="Search"
        className={classes.inputSearch}
        onChange={(e) => setValue(e.target.value)}
      />

      <Box display={value && opened == false ? "" : "none"} className={classes.popup}>
        {newData && newData.length > 0 ? (
          <Box className={classes.ProductsSearch}>
            {newData.map((ele, index) => (
              <>
                <Box
                  onClick={() => {
                    open(),setSingle(ele.id);
                  }}
                  key={ele.id}
                  className={classes.containerProduct}
                >
                  <Box className={classes.productCard}>
                    <Box>
                      <Image className={classes.productImage} src={ele.image} />
                    </Box>
                    <Box className={classes.details}>
                      <Text className={classes.productTitle}>{ele.title}</Text>
                      <Text fz={18}>
                        <span style={{ fontWeight: 500, color: "#22C45E" }}>
                          $
                        </span>
                        {ele.price}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                {newData.length === index + 1 ? null : (
                  <Line color={mainColor} />
                )}
              </>
            ))}
          </Box>
        ) : (
          <Box mx={"auto"} my={50} className={classes.notFound}>
            <IconZoomCancel
              style={{ width: "80px", height: "80px", color: "white" }}
            />
            <Text c={"white"}>No Item Found !</Text>
          </Box>
        )}
      </Box>

      <Box>
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
              <Button
                px={50}
                className={classes.btaAddCart}
                style={{ borderRadius: "50px" }}
                color="#3F4E4F"
              >
                <IconBasket stroke={1.5} style={{ marginRight: "8px" }} />
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>

    </Box>
  );
}
