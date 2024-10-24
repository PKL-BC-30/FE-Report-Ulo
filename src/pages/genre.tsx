import { onMount } from 'solid-js';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import './genre.css';

const GenreChart = () => {
  onMount(() => {
    const root = am5.Root.new("genreChart");
    root._logo.dispose(); // Menghapus logo amCharts jika ada

    const pieChart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    const pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      })
    );

    const chartData = [
      { category: "Action", value: 30, color: "#455EFF" },
      { category: "Drama", value: 25, color: "#878EFE" },
      { category: "Comedy", value: 20, color: "#5819DE" },
      { category: "Horror", value: 15, color: "#7159FE" },
      { category: "Documentary", value: 10, color: "#0E00A2" }
    ];

    pieSeries.data.setAll(chartData);

    pieSeries.slices.template.setAll({
      fill: (target) => {
        const category = target.dataItem.get("category");
        const sliceColor = chartData.find(item => item.category === category)?.color;
        return am5.color(sliceColor); // Pastikan warna tidak undefined
      },
      strokeWidth: 0,
      stroke: am5.color(0x00000000)
    });

    pieSeries.labels.template.setAll({
      forceHidden: true
    });

    pieSeries.ticks.template.setAll({
      forceHidden: true
    });
  });

  return (
    <div>
      <div id="genreChart" class="genre-chart"></div>
      <ul class="legend">
        <li><span class="legend-dot action-dot"></span> Action</li>
        <li><span class="legend-dot drama-dot"></span> Drama</li>
        <li><span class="legend-dot comedy-dot"></span> Comedy</li>
        <li><span class="legend-dot horror-dot"></span> Horror</li>
        <li><span class="legend-dot documentary-dot"></span> Documentary</li>
      </ul>
    </div>
  );
};

export default GenreChart;
