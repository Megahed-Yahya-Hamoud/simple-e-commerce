import { Box, Button, Image, Modal, Pagination, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { useDisclosure } from "@mantine/hooks";
import { IconBasket, IconX } from "@tabler/icons-react";
import Performances from "./components/performances/Performances";
import SomeProducts from "./components/someProducts/SomeProducts";
import Line from "../../Layout/Header/components/line/Line";
import { notifications } from "@mantine/notifications";

const mainColor = "black";
export default function HomePage() {
  // ============     open modal    ===================

  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);

  // ============   get products  & get products by category =========

  const [categ, setCateg] = useState(``);

  const [products, setProducts] = useState([]);
  const [productsPageOne, setProductsOne] = useState([]);
  const [productsPageTwo, setProductsTwo] = useState([]);
  const [productsPageThree, setProductsThree] = useState([]);
  const limitData = 20;
  let endPoint = `?limit=${limitData}&page=${activePage}`;

  function newProducts() {
    if (categ == "") {
      return endPoint;
    } else {
      return "";
    }
  }
  let newEndPoint = newProducts();

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products` + newEndPoint + categ)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.log(error));
  }, [categ, activePage]);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=1`)
      .then((res) => res.json())
      .then((data) => setProductsOne(data.products))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=2`)
      .then((res) => res.json())
      .then((data) => setProductsTwo(data.products))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=3`)
      .then((res) => res.json())
      .then((data) => setProductsThree(data.products))
      .catch((error) => console.log(error));
  }, []);

  // ============     Pagination    ===================

  const count =
    (productsPageTwo.length +
      productsPageThree.length +
      productsPageOne.length) /
    limitData;
  const newCount = Math.ceil(count);
  // console.log(newCount);
  // console.log(activePage);

  // ============     Discount    ===================

  function showDiscount(discount, price) {
    let percentage = (discount / 100) * price;

    const newPrice = price - percentage;

    const newDiscount = Math.round(newPrice);

    return (
      <Box className={classes.containerPrice}>
        <Text pt={1} c={"#A5A5AD"} fz={15} fw={500}>
          <del>{price}</del>
        </Text>
        <Text fw={600} fz={19}>
          <span style={{ color: "#22C55E" }}>$</span>
          {newDiscount}
        </Text>
        <Box className={classes.discountBox}>{discount}%</Box>
        <Text fz={15} fw={500}>
          off
        </Text>
      </Box>
    );
  }

  // ============   get product in modal    ===================

  const [single, setSingle] = useState(0);
  const [showSingleProduct, setShowSingleProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/+${single}`)
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

  // ============   active Categories    ===================

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.log(error));
  }, []);

  const cat = categories.map((ele) => (
    <Box
      key={ele}
      className={classes.category}
      data-active={categ == `/category?type=${ele}` || undefined}
      onClick={() => {
        `/category?type=${ele}` == categ
          ? setCateg("")
          : setCateg(`/category?type=${ele}`);
      }}
    >
      <Text fw={500} fz={17}>
        {ele}
      </Text>
      <IconX
        stroke={2.5}
        style={{
          display: categ == `/category?type=${ele}` ? "" : "none",
        }}
        className={classes.iconX}
      />
    </Box>
  ));

  // ================   add to cart   ==========
  
  
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
    <Box my={20} className={classes.parent}>
      <Box display={"grid"}>
        <Box mb={25} mt={10} className={classes.firstContainer}>
          <Box>
            <Text className={classes.hotSale}>HOT SALE</Text>
            <Performances />
          </Box>
          <Box pb={2} className={classes.someProducts}>
            <SomeProducts />
          </Box>
        </Box>

        <Text mt={25} fw={700} fz={30}>
          Category
        </Text>

        {/*   =========    category  ========= */}
        <Box mt={20} mb={35} className={classes.containerCategory}>
          {cat}
        </Box>

        {/*   =========    products  ========= */}

        <Box className={classes.containerProducts}>
          {products &&
            products.map((ele) => (
              <Box key={ele.id} className={classes.productCard}>
                <Box
                  onClick={() => {
                    open(), setSingle(ele.id), checkAddedProduct(ele.id);
                  }}
                  className={classes.containerImage}
                >
                  <Image src={ele.image} className={classes.productImage} />
                </Box>
                <Box>
                  <Text mb={-3} className={classes.productTitle}>
                    {ele.title}
                  </Text>
                  {ele.discount ? (
                    <>{showDiscount(ele.discount, ele.price)}</>
                  ) : (
                    <>
                      <Text fw={600} fz={19} ta={"start"}>
                        <span style={{ color: "#22C55E" }}>$</span>
                        {ele.price}
                      </Text>
                    </>
                  )}
                </Box>
              </Box>
            ))}
        </Box>

        {categ ? (
          <>
            <Box mt={50} h={100}></Box>
          </>
        ) : (
          <>
            <Line color={mainColor} />
            <Box
              mb={50}
              mt={20}
              display={"flex"}
              style={{ justifyContent: "center" }}
            >
              <Pagination
                size={"sm"}
                total={newCount}
                value={activePage}
                onClick={(e) => console.log(+e.target.innerText)}
                onChange={setPage}
                color="black"
              />
            </Box>
          </>
        )}
      </Box>

      {/*   =========    modal  ========= */}
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
                onClick={() => add(showSingleProduct.id)}
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
