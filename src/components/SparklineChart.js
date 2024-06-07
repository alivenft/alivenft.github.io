import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const SparklineChart = ({ data }) => (
  <div className="sparkline-chart-container">
    <Sparklines data={data} width={100} height={20}>
      <SparklinesLine color="orange" style={{ strokeWidth: 2, fill: "none" }} />
    </Sparklines>
  </div>
);

export default SparklineChart;
