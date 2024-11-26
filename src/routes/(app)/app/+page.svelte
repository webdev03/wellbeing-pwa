<script lang="ts">
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
</main>
