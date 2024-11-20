import { onCleanup, onMount, createSignal } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./genre.css";

interface GenreData {
  genre: string;
  count: number;
}

const GenreChart = () => {
  let chartDiv: HTMLDivElement;
  const [genres, setGenres] = createSignal<GenreData[]>([]);

  // Color mapping for genres
  const colorMap: { [key: string]: string } = {
    Documentary: "#0E00A2",
    Horror: "#7159FE",
    Comedy: "#581E9D",
    Drama: "#6771DC",
    Action: "#455EFF",
    Petualangan: "#6771DC",
    Aksi: "#581E9D",
  };

  // Fetch genre data from backend
  const fetchGenreData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/chartgenre");
      if (!response.ok) {
        throw new Error("Failed to fetch genre data");
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genre data:", error);
    }
  };

  onMount(async () => {
    // Fetch data first
    await fetchGenreData();

    // Create chart only after we have data
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
        valueField: "count",
        categoryField: "genre",
      })
    );

    // Transform the data to include colors
    const chartData = genres().map((item) => ({
      genre: item.genre,
      count: item.count,
      color: am5.color(colorMap[item.genre] || "#000000"),
    }));

    // Add data to series
    series.data.setAll(chartData);

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
      slice.set("scale", 1.1);
      slice.set("fillOpacity", 0.8);
      slice.set("fill", am5.color("#FF4081"));
      slice.set("stroke", am5.color("#000000"));
      slice.set("strokeWidth", 2);
    });

    series.slices.template.events.on("pointerout", (event) => {
      const slice = event.target;
      slice.set("scale", 1);
      slice.set("fillOpacity", 1);
      slice.set("fill", event.target.dataItem?.dataContext.color);
      slice.set("stroke", am5.color(0x000000));
      slice.set("strokeWidth", 0);
    });

    // Cleanup chart on unmount
    onCleanup(() => {
      root.dispose();
    });
  });

  return (
    <div>
      <div ref={(el) => (chartDiv = el!)} style={{ height: "300px", width: "300px", "margin-left": "20px" }}></div>
      <div class="genre-legend">
        <div class="genre-column">
          {genres()
            .slice(0, Math.ceil(genres().length / 2))
            .map((genre, index) => (
              <div class="genre-item">
                <div class={`legend-circle legend-circle-${index}`} style={{ background: colorMap[genre.genre] || "#67B7DC" }} />
                <span>{genre.genre}</span>
              </div>
            ))}
        </div>
        <div class="genre-column">
          {genres()
            .slice(Math.ceil(genres().length / 2))
            .map((genre, index) => (
              <div class="genre-item">
                <div class={`legend-circle legend-circle-${index + Math.ceil(genres().length / 2)}`} style={{ background: colorMap[genre.genre] || "#000000" }} />
                <span>{genre.genre}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GenreChart;
