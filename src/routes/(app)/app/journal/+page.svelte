<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { NotebookPen, Gauge } from "lucide-svelte";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<main class="p-3">
  <h1 class="text-2xl font-bold">Journal</h1>
  <p class="italic">
    You can record your thoughts and emotions here. You may want to use this as a <a
      class="text-blue-600 underline"
      target="_blank"
      href="https://en.wikipedia.org/wiki/Gratitude_journal">gratitude journal</a
    >.
  </p>
  <a href="/app/journal/create">
    <Button class="mt-2 w-full bg-sky-400 text-gray-950 hover:bg-sky-500">
      <NotebookPen />
      Write an entry
    </Button>
  </a>
  <hr class="my-3" />
  {#each data.entries as entry}
    <a href={`/app/journal/${entry.id}`}>
      <Button
        class="mb-1 flex h-auto w-full flex-col bg-purple-400 text-left text-gray-950 hover:bg-purple-500"
      >
        <div class="justify- flex w-full flex-row items-center gap-2">
          <span class="flex w-full gap-2 text-lg font-bold"
            >{entry.createdAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </span>
          <Gauge />
          <span>{entry.emotionScore * 4}% Score</span>
        </div>
        <p
          class={`w-full overflow-hidden text-ellipsis whitespace-nowrap ${entry.text ? "" : "italic"}`}
        >
          {entry.text.slice(0, 100) + (entry.text.length > 100 ? "..." : "") ||
            "Empty; add some writing here!"}
        </p>
      </Button>
    </a>
  {:else}
    <p>You ({data.auth.user.username}) haven't written any journal entries yet!</p>
  {/each}
</main>
