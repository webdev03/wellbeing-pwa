<script lang="ts">
  import Delete from "./delete.svelte";
  import { Eye, Pencil, Trash2 } from "lucide-svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { toast } from "svelte-sonner";
  import { Textarea } from "$lib/components/ui/textarea";

  let { data }: { data: PageData } = $props();

  const entry = $state(structuredClone(data.entry));

  let savedText = $state(data.entry.text);

  type InteractionMode = "view" | "edit";

  let mode = $state<InteractionMode>(
    $page.url.searchParams.get("edit") === "true" ? "edit" : "view"
  );

  function autoSave() {
    let currentText = entry.text;
    setTimeout(() => {
      if (currentText === entry.text) {
        toast.promise(
          (async function () {
            const req = await fetch(`/app/journal/${data.entry.id}/api`, {
              method: "PUT",
              body: JSON.stringify({
                text: currentText
              })
            });
            if (!req.ok) throw Error("Req not ok " + req.status);
            savedText = currentText;
          })(),
          {
            loading: "Saving...",
            success: "Saved!",
            error: "Auto-save failed!"
          }
        );
      }
    }, 1000);
  }

  if (browser) {
    window.addEventListener("beforeunload", (e) => {
      if (savedText !== entry.text) {
        e.preventDefault();
        e.returnValue = "";
      }
    });
  }

  let isDeleteOpen = $state(false);

  async function deleteEntry() {
    isDeleteOpen = false;
    toast.promise(
      async function () {
        const req = await fetch(`/app/journal/${data.entry.id}/api`, {
          method: "DELETE"
        });
        if (!req.ok) throw Error("Delete not OK! " + req.status);
        goto("/app/journal");
      },
      {
        loading: "Deleting...",
        success: "Deleted!",
        error: "An error has occurred! Please try again later :("
      }
    );
  }
</script>

<Delete bind:open={isDeleteOpen} onSubmit={deleteEntry} />

<main class="h-full p-3">
  <div class="flex items-center justify-between">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">Journal Entry</h1>
      <p>
        {entry.createdAt.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}
      </p>
    </div>
    <div class="flex space-x-4">
      <button onclick={() => (mode = mode === "view" ? "edit" : "view")}>
        {#if mode === "view"}
          <Pencil />
        {:else}
          <Eye />
        {/if}
      </button>
      <button onclick={() => (isDeleteOpen = true)}>
        <Trash2 class="text-red-500" />
      </button>
    </div>
  </div>

  <hr class="my-3" />

  {#if mode === "view"}
    <span class="whitespace-pre-line">{entry.text}</span>
  {:else}
    <Textarea
      bind:value={entry.text}
      oninput={autoSave}
      placeholder="Type your journal entry in this box..."
      class="w-full flex-grow"
      maxlength={5000}
    />
  {/if}
</main>
