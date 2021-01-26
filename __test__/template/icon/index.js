module.exports = function indexTpl(data) {
    const tpl = `import React from "react";
import {Icons} from "./type";
import "./index.css";

interface Icon {
    type: Icons;
  w: number;
  h: number;
  className?: string;
}

export default function IconPro(props: Icon) {
  const { w, h, className } = props;
  const style = {
    width: w,
    height: h,
  };
  return <span style={style} className={\`icon $\{props.type} $\{className || ''}\`} />;
}`;

    return tpl;
};
