import { onCleanup, onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import './genre.css';

const GenreChart = () => {
  let chartDiv: HTMLDivElement;
  const movieGenres = [
    { genre: "Documentary", value: 20, color: am5.color("#0E00A2") },
    { genre: "Horror", value: 40, color: am5.color("#7159FE") },
    { genre: "Comedy", value: 80, color: am5.color("#581E9D") },
    { genre: "Drama", value: 135, color: am5.color("#878EFE") },
    { genre: "Action", value: 275, color: am5.color("#455EFF") },
  ];

  onMount(() => {
    let root = am5.Root.new(chartDiv);

    // Remove amCharts watermark if exists
    if (root._logo) {
      root._logo.dispose();
    }

    // Add theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'genre',
      })
    );

    // Add data to series
    series.data.setAll(movieGenres);

    // Set color for each slice based on the data's color field
    series.slices.template.adapters.add("fill", function (fill, target) {
      return target.dataItem?.dataContext.color || fill;
    });

    // Disable labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Create a tooltip for the slices
    series.slices.template.set("tooltipText", "{category}: {value}");

    // Add hover effect for slices
    series.slices.template.events.on("pointerover", (event) => {
      const slice = event.target;
      slice.set("scale", 1.1); // Scale up the slice
      slice.set("fillOpacity", 0.8); // Change opacity for hover effect

      // Change fill color and stroke on hover
      slice.set("fill", am5.color("#FF4081")); // Change to desired hover color
      slice.set("stroke", am5.color("#000000")); // Change to desired stroke color
      slice.set("strokeWidth", 2); // Change to desired stroke thickness
    });

    series.slices.template.events.on("pointerout", (event) => {
      const slice = event.target;
      slice.set("scale", 1); // Reset scale
      slice.set("fillOpacity", 1); // Reset opacity

      // Reset fill color and stroke
      slice.set("fill", event.target.dataItem?.dataContext.color); // Back to original color
      slice.set("stroke", am5.color(0x000000)); // Reset to original stroke color
      slice.set("strokeWidth", 0); // Reset stroke width
    });

    // Cleanup chart on unmount
    onCleanup(() => {
      root.dispose();
    });
  });

  return (
    <div>
      <div ref={el => (chartDiv = el!)} style={{ height: '300px', width: '300px', "margin-left": '20px' }}></div>
      <div class="genre-legend">
        <div class="genre-column">
          {movieGenres.slice(0, 3).map((genre, index) => (
            <div class="genre-item">
              <div class={`legend-circle legend-circle-${index}`} />
              <span>{genre.genre}</span>
            </div>
          ))}
        </div>
        <div class="genre-column">
          {movieGenres.slice(3).map((genre, index) => (
            <div class="genre-item">
              <div class={`legend-circle legend-circle-${index + 3}`} />
              <span>{genre.genre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreChart;
