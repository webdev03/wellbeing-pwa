<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { PawPrint, Leaf } from "lucide-svelte";

  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<main class="p-3">
  <h1 class="text-2xl font-bold">Mindfulness</h1>
  <p class="italic">
    Be calm and in the moment. The resources here can help you destress and relax.
  </p>
  <div class="mt-3 flex flex-wrap justify-center gap-4 md:justify-normal">
    <div
      class="flex max-w-sm flex-col justify-between overflow-hidden rounded-lg border border-solid border-violet-400 shadow-md"
    >
      <div class="mt-4 flex items-center justify-center">
        <PawPrint class="h-24 w-24 text-center text-violet-400" />
      </div>
      <div class="flex-grow px-6 py-4">
        <div class="mb-2 text-xl font-bold">Cute Animals</div>
        <p class="text-base text-gray-700">
          Some studies suggest that watching cute animal videos can improve your mood. This is why
          we have included videos on this site that you can watch.
        </p>
      </div>
      <a class="px-6 pb-4" href="/app/mindfulness/cuteanimals">
        <Button variant="default" class="w-full bg-violet-400 hover:bg-violet-500">Watch</Button>
      </a>
    </div>

    <div
      class="flex max-w-sm flex-col justify-between overflow-hidden rounded-lg border border-solid border-sky-400 shadow-md"
    >
      <div class="mt-4 flex items-center justify-center">
        <Leaf class="h-24 w-24 text-center text-sky-400" />
      </div>
      <div class="flex-grow px-6 py-4">
        <div class="mb-2 text-xl font-bold">Breathing</div>
        <p class="text-base text-gray-700">
          While quick breathing can be negative, conscious, and controlled breathing actually helps
          you relax. We have included a utility that can be used for breathing. If you do this for
          some time every day, you are likely to notice improvements in wellbeing.
        </p>
      </div>
      <a class="px-6 pb-4" href="/app/mindfulness/breathe">
        <Button variant="default" class="w-full bg-sky-400 hover:bg-sky-500">Breathe</Button>
      </a>
    </div>
  </div>
</main>
