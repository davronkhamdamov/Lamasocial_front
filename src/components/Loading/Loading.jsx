import React from "react";
import { Dna } from "react-loader-spinner";
import c from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={c.loaderWrap}>
      <Dna
        visible={true}
        height="150"
        width="150"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
