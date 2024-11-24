<script lang="ts">
  import type { PageData } from "./$types";
  import Form from "./form.svelte";
  export let data: PageData;
</script>

<section
  class="mx-auto flex w-full flex-col items-center gap-2 p-2 py-6 pb-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
  <h1
    class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]"
  >
    Log In
  </h1>

  <Form data={data.form} />
</section>
