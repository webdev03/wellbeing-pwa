<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<main class="p-3">
  <h1 class="text-2xl font-bold">Cute Animals</h1>
  <p class="my-2">
    Some studies suggest that watching cute animal videos can improve your mood. This is why we have
    included two videos below that you can watch. Of course, you can go on the internet and find
    some more.
  </p>
  <p class="my-2 italic">
    Notice: These videos are not owned by us. We have embedded links to the videos in this document.
  </p>
  <iframe
    class="my-3 rounded"
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/tpiyEe_CqB4"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
  <iframe
    class="my-3 rounded"
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/pxn0wL_uSm4"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</main>
