<script lang="ts">
  import Chart from "./chart.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<main class="p-3">
  <h1 class="text-2xl font-medium">Hi, <span class="font-bold">{data.auth.user.username}</span></h1>
  <p class="mt-3">
    We recommend using the app every day. Each day you use it, go through some of the <a
      class="text-sky-500 underline"
      href="/app/mindfulness">Mindfulness</a
    >
    activities and then record a <a class="text-sky-500 underline" href="/app/journal">Journal</a> entry.
  </p>
  <div class="my-3">
    <Chart
      type="line"
      data={{
        datasets: [
          {
            label: "Journal Emotion Scores",
            data: data.entries,
            borderColor: "red",
            tension: 0.1
          }
        ]
      }}
      options={{
        scales: {
          x: {
            type: "time"
          },
          y: {
            min: 0,
            max: 100
          }
        }
      }}
    />
  </div>
</main>
