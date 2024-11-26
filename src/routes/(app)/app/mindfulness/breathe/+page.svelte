<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<!-- TODO: switch to own code -->
<p class="p-2 italic">Powered by xhalr.com</p>
<iframe
  src="https://xhalr.com"
  title="eXHALeR app"
  frameborder="0"
  allowfullscreen
  height={600}
  class="min-w-full"
></iframe>
