<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  type InteractionMode = "view" | "edit";

  let mode = $state<InteractionMode>(
    $page.url.searchParams.get("edit") === "true" ? "edit" : "view"
  );
</script>

<main class="p-3">
  <h1 class="text-2xl font-bold">Journal</h1>
</main>
