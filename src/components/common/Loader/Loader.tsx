import React from "react";
import { LoaderProps } from "./Loader.types";
import { loaderConsts } from "./LoaderConsts";
import { loaderStyles, getLoaderClasses } from "./Loader.styles";

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  message = loaderConsts.LoadingMessage,
  className = "",
  fullScreen = false,
}) => {
  return (
    <div className={getLoaderClasses.container(className)}>
      <div className={loaderStyles.wrapper}>
        <div className={loaderStyles.header.container}>
          <h1 className={loaderStyles.header.title}>{message}</h1>
        </div>
        <div className={loaderStyles.card}>
          <div className={loaderStyles.content.container}>
            <div className={loaderStyles.content.spinner} />
            <p className={loaderStyles.content.message}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
