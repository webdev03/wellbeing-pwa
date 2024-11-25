<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
  import { Label } from "$lib/components/ui/label";
  import { Slider } from "$lib/components/ui/slider";
  import type { PageData } from "./$types";
  const labels = ["0", "1", "2", "3", "4", "5"];
  let { data }: { data: PageData } = $props();

  let q1 = $state([0]);
  let q2 = $state([0]);
  let q3 = $state([0]);
  let q4 = $state([0]);
  let q5 = $state([0]);
</script>

<main class="p-2">
  <h1 class="text-2xl font-bold">Create a Journal Entry</h1>

  <form class="mt-4 p-4" method="POST" use:enhance>
    <ol class="list-outside list-decimal">
      <li>
        <label for="q1" class="pb-6">I feel cheerful in good spirits.</label>
        <div class="ml-3 mt-3 max-w-80 space-y-3">
          <Slider id="q1" min={0} max={5} step={1} class="w-full" bind:value={q1} />
          <div class="flex justify-between">
            {#each labels as label}
              <span class={`text-sm ${q1[0].toString() === label ? "font-bold" : ""}`}>{label}</span
              >
            {/each}
          </div>
        </div>
      </li>
      <li>
        <label for="q2" class="pb-6">I feel calm and relaxed.</label>
        <div class="ml-3 mt-3 max-w-80 space-y-3">
          <Slider id="q2" min={0} max={5} step={1} class="w-full" bind:value={q2} />
          <div class="flex justify-between">
            {#each labels as label}
              <span class={`text-sm ${q2[0].toString() === label ? "font-bold" : ""}`}>{label}</span
              >
            {/each}
          </div>
        </div>
      </li>
      <li>
        <label for="q3" class="pb-6">I feel active and healthy.</label>
        <div class="ml-3 mt-3 max-w-80 space-y-3">
          <Slider id="q3" min={0} max={5} step={1} class="w-full" bind:value={q3} />
          <div class="flex justify-between">
            {#each labels as label}
              <span class={`text-sm ${q3[0].toString() === label ? "font-bold" : ""}`}>{label}</span
              >
            {/each}
          </div>
        </div>
      </li>
      <li>
        <label for="q4" class="pb-6">I wake up feeling fresh and rested.</label>
        <div class="ml-3 mt-3 max-w-80 space-y-3">
          <Slider id="q4" min={0} max={5} step={1} class="w-full" bind:value={q4} />
          <div class="flex justify-between">
            {#each labels as label}
              <span class={`text-sm ${q4[0].toString() === label ? "font-bold" : ""}`}>{label}</span
              >
            {/each}
          </div>
        </div>
      </li>
      <li>
        <label for="q5" class="pb-6">I am able to do things that interest me.</label>
        <div class="ml-3 mt-3 max-w-80 space-y-3">
          <Slider id="q5" min={0} max={5} step={1} class="w-full" bind:value={q5} />
          <div class="flex justify-between">
            {#each labels as label}
              <span class={`text-sm ${q5[0].toString() === label ? "font-bold" : ""}`}>{label}</span
              >
            {/each}
          </div>
        </div>
      </li>
    </ol>
    <Button type="submit" class="bg-purple-400 text-gray-950 hover:bg-purple-500">Create</Button>
  </form>
</main>
