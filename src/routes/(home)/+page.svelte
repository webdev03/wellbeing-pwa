<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<section
  class="mx-auto flex w-full flex-col items-center gap-2 p-2 py-6 pb-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
  <h1
    class="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
  >
    Wellbeing
  </h1>
  <p class="max-w-[750px] text-balance text-center text-lg text-muted-foreground sm:text-xl">
    An app that allows users to manage their wellbeing and improve their quality of life.
  </p>
  <a href="/app">
    <Button class="w-full bg-blue-500 font-semibold hover:bg-blue-500/90">Let's go!</Button>
  </a>
</section>
