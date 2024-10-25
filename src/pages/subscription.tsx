import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

const SubscriptionChart = () => {
  onMount(() => {
    console.log("Mounting SubscriptionChart");

    const root = am5.Root.new("subscriptionChart");

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
      { subscription: "ULO LITE", users: 11000 },
      { subscription: "ULO PLUS", users: 9000 },
      { subscription: "ULO MAX", users: 11000 },
      { subscription: "ULO FAMILY", users: 16000 },
      { subscription: "ULO INFINITY", users: 11000 },
    ];

    // Create X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "subscription",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30 // Adjusts the distance between grid lines
        })
      })
    );

    // Set font and color for X-axis labels
    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color("#7B91B0"),    
      fontFamily: "Inter",           
      fontSize: "10px",              
    });

    // Hide vertical grid lines
    xAxis.get("renderer").grid.template.setAll({
      forceHidden: true
    });

    // Create Y-axis
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
      fontSize: "10px",
      fontFamily: "Inter",
      dx: -50
    });

    // Apply a custom number format for Y-axis labels
    yAxis.get("renderer").labels.template.adapters.add("text", function (text, target) {
      const value = target.dataItem ? target.dataItem.get("value") : 0;
      return value >= 1000 ? (value / 1000) + "k" : value; // Convert to 'k' notation
    });

    // Set horizontal grid lines color (Y-axis grid)
    yAxis.get("renderer").grid.template.setAll({
      stroke: am5.color("#464E5F"),   
      strokeOpacity: 0.3              
    });

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "users",
        categoryXField: "subscription",
        fill: am5.color("#7B91B0")
      })
    );

    // Set properties for columns
    series.columns.template.setAll({
      fillOpacity: 0.8,
      width: am5.percent(50),
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      cornerRadiusBL: 2,
      cornerRadiusBR: 2,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: am5.color("#455EFF"), offset: 0.2 },
          { color: am5.color("#8957FE"), offset: 1 }
        ]
      }),
      tooltipText: "{categoryX}: {valueY}", // Add this line for tooltip text
    });

    // Set up tooltips
    series.columns.template.set("tooltipText", "{categoryX}: {valueY} users");
    series.columns.template.set("tooltipY", 0); // Position the tooltip above the column

    // Set data
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Clean up on component unmount
    return () => {
      root.dispose();
    };
  });

  return <div id="subscriptionChart" class="subscription-chart" style={{ width: '390px', height: '300px', 'margin-top': '17px', "margin-left": "-30px" }}></div>;
};

export default SubscriptionChart;
