import React from "react";
import { Spin } from "antd";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
