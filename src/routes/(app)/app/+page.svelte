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
  {#if data.entries.length > 3}
    <div class="my-3">
      <Chart
        type="line"
        data={{
          datasets: [
            {
              label: "Journal Emotion Scores",
              data: data.entries,
              borderColor: "#3b82f6",
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
  {:else}
    <p>
      For data related to your wellbeing to appear here, you will need to write some journal
      entries.
    </p>
  {/if}
</main>
