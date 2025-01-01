import { Image } from "@mantine/core";
import classes from "./Logo.module.css";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={'/'} className={classes.logo}>
      <Image src={logo} w={50} h={50} />
    </Link>
  );
}
