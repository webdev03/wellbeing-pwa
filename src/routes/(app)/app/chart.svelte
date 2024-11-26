<script lang="ts">
  import { Chart } from "chart.js/auto";
  import "chartjs-adapter-luxon";

  import { onMount } from "svelte";
  let chartEl: HTMLCanvasElement;

  let {
    type,
    data,
    options
  }: {
    type: "bar" | "bubble" | "doughnut" | "line" | "pie" | "polarArea" | "radar" | "scatter";
    data: any;
    options: any;
  } = $props();

  onMount(() => {
    const chart = new Chart(chartEl, {
      type,
      data,
      options
    });
  });
</script>

<canvas bind:this={chartEl}></canvas>
