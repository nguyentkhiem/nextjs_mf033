import { isEqual } from "lodash";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
interface Props {
  data: Array<any>;
  layout: any;
}

const PlotlyChart: React.FC<Props> = ({ data, layout }) => {
  return (
    <Plot
      style={{ height: "259px" }}
      onInitialized={(configure) => {
        console.log("plotly initialized", configure);
      }}
      data={structuredClone(data)}
      layout={structuredClone(layout)}
      config={{ responsive: true }}
    />
  );
};

export default PlotlyChart;
