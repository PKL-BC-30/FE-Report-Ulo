import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

const RevenueChart = () => {
  onMount(() => {
    console.log("Mounting RevenueChart");

    const root = am5.Root.new("revenueChart");

    // Remove amCharts watermark if exists
    if (root._logo) {
      root._logo.dispose();
    }

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    // Sample data
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

    // Create X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30 // Adjusts the distance between grid lines
        })
      })
    );

    // Set font and color for X-axis labels
    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#7B91B0"), // Color of the labels
      fontFamily: "Inter",        // Set font family to Inter
      fontSize: "12px"           // Font size for X-axis labels
    });

    // Hide vertical grid lines
    xAxis.get("renderer").grid.template.setAll({
      forceHidden: true
    });

    // Create Y-axis with custom label formatter
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0,
        max: 25000,
        strictMinMax: true
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#7B91B0"),
      fontSize: "12px",
      fontFamily: "Inter", // Set font family for Y-axis labels
      dx: -50              // Move labels slightly to the left (adjust to fit design)
    });

    // Apply a custom number format for Y-axis labels
    yAxis.get("renderer").labels.template.adapters.add("text", function (text, target) {
      const value = target.dataItem ? target.dataItem.get("value") : 0;
      return value >= 1000 ? (value / 1000) + "K" : value; // Convert to 'K' notation
    });

    // Set horizontal grid lines color (Y-axis grid)
    yAxis.get("renderer").grid.template.setAll({
      stroke: am5.color("#464E5F"), // Set the stroke color
      strokeOpacity: 0.3            // 30% opacity
    });

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "revenue",
        categoryXField: "month",
        fill: am5.color("#7B91B0")
      })
    );

    // Set properties for columns (including gradient, reduced width, and corner radius)
    series.columns.template.setAll({
      fillOpacity: 0.8,
      width: am5.percent(50), // Reduce the width of the bars
      cornerRadiusTL: 4,     // Top-left corner radius
      cornerRadiusTR: 4,     // Top-right corner radius
      cornerRadiusBL: 4,      // Bottom-left corner radius
      cornerRadiusBR: 4,      // Bottom-right corner radius
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: am5.color("#455EFF"), offset: 0.2 }, // 20% gradient start
          { color: am5.color("#8957FE"), offset: 1 }    // 100% gradient end
        ]
      }),
      tooltipText: "{categoryX}: {valueY}" // Tooltip content
    });

    // Enable tooltips
    series.columns.template.set("tooltipText", "{categoryX}: {valueY}");

    // Set data
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Clean up on component unmount
    return () => {
      root.dispose();
    };
  });

  return <div id="revenueChart" class="revenue-chart" style={{ width: '917px', height: '250px', 'margin-top': '17px' }}></div>;
};

export default RevenueChart;
