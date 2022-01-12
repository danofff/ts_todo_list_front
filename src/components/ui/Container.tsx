import React from "react";

import classes from "./Container.module.scss";

const Container: React.FC = (props) => {
  return <main className={classes.container}>{props.children}</main>;
};

export default Container;
