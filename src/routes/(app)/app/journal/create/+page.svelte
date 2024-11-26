<script lang="ts">
  import { toast } from "svelte-sonner";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Slider } from "$lib/components/ui/slider";
  const labels = ["0", "1", "2", "3", "4", "5"];

  let q1 = $state([0]);
  let q2 = $state([0]);
  let q3 = $state([0]);
  let q4 = $state([0]);
  let q5 = $state([0]);

  function submit() {
    const formData = new FormData();
    formData.append("q1", q1[0].toString());
    formData.append("q2", q2[0].toString());
    formData.append("q3", q3[0].toString());
    formData.append("q4", q4[0].toString());
    formData.append("q5", q5[0].toString());

    toast.promise(
      async function () {
        const req = await fetch("/app/journal/create/api", {
          method: "POST",
          body: formData
        });
        if (!req.ok) throw Error("Request not ok!");
        const url = (await req.text()).trim();
        await goto(url);
      },
      {
        loading: "Creating...",
        success: "Created!",
        error: "Oh no! An error has occurred! Please try again later :("
      }
    );
  }
</script>

<main class="p-2">
  <h1 class="text-2xl font-bold">Create a Journal Entry</h1>
  <p class="mt-2">
    Please answer relating to the last 24 hours. Your answers to these questions will be used to
    analyse your wellbeing over time. These questions are based on the <a
      class="text-blue-600 underline"
      href="https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01">WHO-5</a
    >, which is licensed under the CC-BY-NC-SA 3.0.
  </p>

  <div class="ml-1 p-4">
    <ol class="list-outside list-decimal">
      <li>
        <label for="q1" class="pb-6">I feel cheerful in good spirits.</label>
        <div class="ml-3 mt-3 w-full space-y-3 md:max-w-80">
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
        <div class="ml-3 mt-3 w-full space-y-3 md:max-w-80">
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
        <div class="ml-3 mt-3 w-full space-y-3 md:max-w-80">
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
        <div class="ml-3 mt-3 w-full space-y-3 md:max-w-80">
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
        <div class="ml-3 mt-3 w-full space-y-3 md:max-w-80">
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
    <Button onclick={submit} class="mt-3 w-full bg-sky-400 text-gray-950 hover:bg-sky-500 md:w-48"
      >Create</Button
    >
  </div>
</main>
