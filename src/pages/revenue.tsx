// RevenueChart.jsx
import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

const RevenueChart = () => {
  onMount(() => {
    console.log("Mounting RevenueChart"); // Check if component is mounted
    const root = am5.Root.new("revenueChart");

    // Remove amCharts watermark
    root._logo.dispose();

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    const data = [
      { month: "Jan", revenue: 14000 },
      { month: "Feb", revenue: 11000 },
      { month: "Mar", revenue: 15000 },
      { month: "Apr", revenue: 13000 },
      { month: "May", revenue: 17000 },
      { month: "Jun", revenue: 19000 },
      { month: "Jul", revenue: 20000 },
      { month: "Aug", revenue: 22000 },
      { month: "Sep", revenue: 24000 },
      { month: "Oct", revenue: 21000 },
      { month: "Nov", revenue: 18000 },
      { month: "Dec", revenue: 23000 },
    ];

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0,
        max: 25000,
        strictMinMax: true
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "revenue",
        categoryXField: "month",
        fill: am5.color("#7B91B0"),
        stroke: am5.color("#7B91B0"),
        strokeWidth: 2,
        columns: {
          template: {
            fillOpacity: 0.8,
          }
        }
      })
    );

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Set color for Y-axis labels
    yAxis.renderer.labels.template.setAll({
      fill: am5.color("#7B91B0"), // Color for Y-axis labels
    });

    // Set color for X-axis labels
    xAxis.renderer.labels.template.setAll({
      fill: am5.color("#7B91B0"), // Color for X-axis labels
    });

    console.log("Chart created", chart); // Check if the chart was created successfully
  });

  return <div id="revenueChart" class="revenue-chart" style={{ width: '932px', height: '359px' }}></div>;
};

export default RevenueChart;
