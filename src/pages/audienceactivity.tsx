import { onMount } from 'solid-js';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

const AudienceActivity = () => {
    let chartDiv;

    onMount(() => {
        // Create root element
        const root = am5.Root.new(chartDiv);
        if (root._logo) {
            root._logo.dispose();
        }

        // Set themes
        root.setThemes([am5themes_Dark.new(root)]);

        // Create chart
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                paddingRight: 20,
                paddingLeft: 0,
            })
        );

        // Create x-axis
        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            opposite: false,
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "time",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        // Create y-axis
        const yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 30
        });

        // Define manual y-axis values
        const yAxisLabels = [{
            value: 0,
            text: "0"
        }, {
            value: 2500,
            text: "2,500"
        }, {
            value: 5000,
            text: "5,000"
        }, {
            value: 7500,
            text: "7,500"
        }, {
            value: 10000,
            text: "10,000"
        }];

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: yRenderer,
                min: 0,
                max: 10000
            })
        );

        // Configure y-axis with manual labels
        yRenderer.labels.template.setAll({
            fontSize: 12,
            fill: am5.color(0x808080),
            paddingRight: 10
        });

        yAxis.setAll({
            numberFormat: "####",
            maxPrecision: 0,
            strictMinMax: true
        });

        // Add custom labels
        yRenderer.labels.template.adapters.add("text", function(text, target) {
            const value = target.dataItem?.value;
            const label = yAxisLabels.find(l => l.value === value);
            return label ? label.text : text;
        });

        // Configure grid lines (remove vertical and horizontal lines)
        yRenderer.grid.template.setAll({
            strokeWidth: 1,
            stroke: am5.color(0x2A2A2A),
            location: 0,
            strokeOpacity: 0
        });

        xRenderer.grid.template.setAll({
            strokeWidth: 1,
            stroke: am5.color(0x2A2A2A),
            location: 0,
            strokeOpacity: 0
        });

        // Add padding to labels
        xRenderer.labels.template.setAll({
            paddingTop: 5,
            fontSize: 12,
            fontFamily: "Inter",
            fill: am5.color(0x848397)
        });

        // Create series
        const series = chart.series.push(
            am5xy.SmoothedXLineSeries.new(root, {
                name: "Viewers",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "viewers",
                categoryXField: "time",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY} viewers",
                    getFillFromSprite: false,
                    autoTextColor: false,
                    forceHidden: false
                })
            })
        );

        // Style tooltips
        series.get("tooltip").get("background").setAll({
            fill: am5.color(0xFFFFFF),
            fillOpacity: 0.8,
            stroke: am5.color(0x67B7DC),
            strokeWidth: 1
        });

        // Style the series with a solid color for the stroke (line) and shadow (fill)
        series.strokes.template.setAll({
            strokeWidth: 2,
            stroke: am5.color(0xFFFFFF)
        });

        // Add gradient fill for the series (shadow)
        series.fills.template.setAll({
            visible: true,
            fillOpacity: 0.3,
            fillGradient: am5.LinearGradient.new(root, {
                stops: [{
                    color: am5.color(0x67B7DC),
                    opacity: 0.5
                }, {
                    color: am5.color(0x67B7DC),
                    opacity: 0
                }]
            })
        });

        // Add data
        const data = [
            { time: "00:00", viewers: 4000 },
            { time: "01:00", viewers: 3600 },
            { time: "02:00", viewers: 2500 },
            { time: "03:00", viewers: 4000 },
            { time: "04:00", viewers: 5000 },
            { time: "05:00", viewers: 4800 },
            { time: "06:00", viewers: 2800 },
            { time: "07:00", viewers: 4200 },
            { time: "08:00", viewers: 2700 },
            { time: "09:00", viewers: 3700 },
            { time: "10:00", viewers: 2500 },
            { time: "11:00", viewers: 4600 },
            { time: "12:00", viewers: 4400 },
            { time: "13:00", viewers: 3400 },
            { time: "14:00", viewers: 3000 },
            { time: "15:00", viewers: 1000 },
            { time: "16:00", viewers: 2000 },
            { time: "17:00", viewers: 3200 },
            { time: "18:00", viewers: 5000 },
            { time: "19:00", viewers: 3700 },
            { time: "20:00", viewers: 3500 },
            { time: "21:00", viewers: 2900 },
            { time: "22:00", viewers: 7000 },
            { time: "23:00", viewers: 7000 }
        ];

        // Filter data to only include hours that are multiples of 2
        const filteredData = data.filter((_, index) => index % 2 === 0);
        xAxis.data.setAll(filteredData);
        series.data.setAll(filteredData);

        // Add cursor
        const cursor = am5xy.XYCursor.new(root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis,
            tooltip: am5.Tooltip.new(root, {
                labelText: "",
                getFillFromSprite: false,
                autoTextColor: false,
                forceHidden: false
            })
        });

        // Enable vertical line on hover
        cursor.lineY.setAll({
            stroke: am5.color(0xFFFFFF),
            strokeWidth: 2,
            strokeOpacity: 0.5
        });
        
        // Disable the horizontal line on hover
        cursor.lineX.set("visible", true);
        cursor.lineY.set("visible", false);

        // Add cursor to the chart
        chart.set("cursor", cursor);

        // Clean up on component unmount
        return () => {
            root.dispose();
        };
    });

    return (
        <div class="audience-activity" style="margin-top: 10px; margin-left: 5px;">
            <div ref={chartDiv} style="width: 940px; height: 290px;" />
        </div>
    );
};

export default AudienceActivity;