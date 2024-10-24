import { onMount, onCleanup } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';

const AudienceActivityChart = () => {
  let chartDiv;
  let root;
  let chart;

  onMount(() => {
    // Create root element
    root = am5.Root.new(chartDiv);

    // Set themes
    root.setThemes([am5themes_Dark.new(root)]);

    // Create chart
    chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        paddingRight: 20,
        paddingLeft: 0,
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 30 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          strokeOpacity: 0.1
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0, // Set nilai minimum yang sesuai
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Viewers",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          background: am5.Rectangle.new(root, {
            fill: am5.color(0x000000),
            fillOpacity: 0.8
          })
        })
      })
    );

    // Style the series
    series.strokes.template.setAll({
      strokeWidth: 3,
      strokeGradient: am5.LinearGradient.new(root, {
        stops: [{
          color: am5.color(0x67B8F7) // Warna gradien pertama
        }, {
          color: am5.color(0x915EFF) // Warna gradien kedua
        }]
      })
    });

    // Add static data for testing
    const data = [
      { date: new Date('2023-10-01T00:00:00'), value: 3500 },
      { date: new Date('2023-10-01T00:30:00'), value: 3700 },
      { date: new Date('2023-10-01T01:00:00'), value: 3600 },
      { date: new Date('2023-10-01T01:30:00'), value: 3900 },
      { date: new Date('2023-10-01T02:00:00'), value: 4100 },
      { date: new Date('2023-10-01T02:30:00'), value: 3800 }
    ];

    console.log("Data yang diterapkan ke seri:", data);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  });

  onCleanup(() => {
    root?.dispose();
  });

  return (
    <div 
      ref={chartDiv} 
      class="h-[400px] bg-[#1C1C1C] rounded-lg p-4" 
      style={{ width: '1305px', position: 'relative', overflow: 'hidden' }} // Set width here
    />
  );  
};

export default AudienceActivityChart;
