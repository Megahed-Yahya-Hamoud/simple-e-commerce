/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Checkbox, Image, Text } from "@mantine/core";
import classes from "./ProductsCart.module.css";
import { useCounter } from "@mantine/hooks";
import {
  IconMinus,
  IconPlus,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
// import { Container } from "postcss";

export default function ProductsCart() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];

  function deleteItemHandler(id) {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = storedCart.filter((ele) => ele.id != id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const foundIt=storedCart.find((ele) => ele.id == id)

    if (foundIt) {
      notifications.show({
              message: "Deleted",
              color: "blue",
            });
    }else{
      notifications.show({
        message: "This item deleted",
        color: "blue",
      });
    }
    

  }

  function counterHandler(id) {
    const [count, handlers] = useCounter(0, { min: 1 });

    return (
      <Box className={classes.qty}>
        <Text className={classes.qtyText}>Qty:</Text>
        <Box className={classes.containerCounter}>
          <IconPlus
            className={classes.counterIcons}
            onClick={handlers.increment}
          />

          <Text className={classes.counter}>{count}</Text>

          <IconMinus
            className={classes.counterIcons}
            onClick={handlers.decrement}
          />
        </Box>
        <IconRefresh
          className={classes.counterIcons}
          onClick={handlers.reset}
        />
        <Box className={classes.remove}>
          <IconTrash style={{ width: "18px", height: "18px" }} />
          <Text
            className={classes.textRemove}
            onClick={() => {
              deleteItemHandler(id);
            }}
          >
            Remove
          </Text>
        </Box>
      </Box>
    );
  }

  // ========== Discount summary order and check ========

  const [arr, setArr] = useState([]);

  function check(id, checkbox) {
    if (!checkbox) {
      setArr((prevArr) => prevArr.filter((item) => item !== id));
    } else {
      setArr((prevArr) => [...prevArr, id]);
    }
  }

  function checkedHandler(id) {
    const [checked, setChecked] = useState(true);

    return (
      <Checkbox
        styles={{ input: { cursor: "pointer" } }}
        size="xs"
        checked={checked}
        onChange={(event) => {
          check(id, checked);
          // setPriceTotal(total)
          setChecked(event.currentTarget.checked);
        }}
      />
    );
  }

  let oldPrice = products.map((ele) => {
    if (arr.find((item) => item == ele.id)) {
      return 0;
    } else {
      return ele.price;
    }
  });

  let newPrice = oldPrice.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);

  let oldDiscount = products.map((ele) => {
    if (arr.find((item) => item == ele.id)) {
      return 0;
    } else {
      return (ele.discount / 100) * ele.price < 1
        ? Math.ceil((ele.discount / 100) * ele.price)
        : Math.round((ele.discount / 100) * ele.price);
    }
  });

  let newDiscount = oldDiscount.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);

  let total = newPrice - newDiscount;

  localStorage.setItem("total", JSON.stringify(total));

  const [path , setPath]=useState("")
  function checkIsEmpty() {
    
  const checkPro = JSON.parse(localStorage.getItem("cart")) || [];

  if (checkPro.length <= 0) {
    setPath("/")
    // location.href='/'
    console.log("no");
  }else{
    setPath("/payment")
    console.log("yes");
    // location.href='/payment'
    console.log(window.location.pathname);
    if (path == '/payment') {
      notifications.show({
        message: "Thanks",
        color: "green",
      });
    }else{
      notifications.show({
        message: "Please click again",
        color: "blue",
      });
    }
    

    
  }
  }


  return (
    <Box mt={50} mb={20} className={classes.parent}>
      <Box className={classes.containerProducts}>
        {products &&
          products.map((ele) => (
            <Box key={ele.id} className={classes.productsCard}>
              <Box>
                <Image src={ele.image} w={180} h={180} />
              </Box>
              <Box>
                <Text className={classes.productTitle}>{ele.title}</Text>
                <Text className={classes.details}>Color: {ele.color}</Text>
                <Text className={classes.details}>Price: ${ele.price}</Text>
                <Text className={classes.stock}>In Stock</Text>
                <Box>{counterHandler(ele.id)}</Box>
                <Box mt={10} display={"flex"} style={{ justifyContent: "end" }}>
                  {checkedHandler(ele.id)}
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box className={classes.summary}>
        <Text fw={500} fz={20}>
          Order Summary
        </Text>
        <Box className={classes.line}></Box>

        <Box pl={15} pt={5}>
          <Box display={"flex"} justifyContent={{ justifyContent: "start" }}>
            <Text mr={100}>Price:</Text>
            <Text key={""}>${newPrice}</Text>
          </Box>
          <Box display={"flex"} justifyContent={{ justifyContent: "start" }}>
            <Text mr={73}>Delivery:</Text>
            <Text c={"green"}>Free</Text>
          </Box>
          <Box display={"flex"} justifyContent={{ justifyContent: "start" }}>
            <Text mr={68}>Discount:</Text>
            <Text c={"red"}>-${newDiscount}</Text>
          </Box>
        </Box>
        <Box className={classes.line}></Box>
        <Box
          pl={15}
          pt={5}
          display={"flex"}
          justifyContent={{ justifyContent: "start" }}
        >
          <Text fz={20} fw={500} mr={60}>
            Subtotal:
          </Text>
          <Text fz={20} fw={500}>
            ${total}
          </Text>
        </Box>
        <Box
          pl={15}
          pt={10}
          display={"flex"}
          style={{ justifyContent: "start" }}
        >
          <Link to={path} onClick={()=>{checkIsEmpty()}} className={classes.payBtn}>
            procced to pay
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
