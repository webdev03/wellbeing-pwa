<script lang="ts">
  import "../../../app.css";

  import { Toaster } from "svelte-sonner";
  import { Book, Home, Flower, SlidersVertical } from "lucide-svelte";

  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { page } from "$app/stores";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Wellbeing</title>
  <meta name="theme-color" content="#ffffff" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<Toaster />

<div class="flex h-screen flex-col">
  <!-- It is pb-16 because the bottom navbar is h-16 -->
  <div class="pb-16">{@render children()}</div>
  <!-- based on https://flowbite.com/docs/components/bottom-navigation/ -->
  <div
    class="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"
  >
    <div class="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
      <a href="/app">
        <button
          type="button"
          class={`group inline-flex h-full w-full flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 ${$page.url.pathname === "/app" ? "*:text-blue-500 dark:*:text-blue-600" : ""}`}
        >
          <Home
            class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
          />
          <span
            class="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
            >Home</span
          >
        </button>
      </a>

      <a href="/app/journal">
        <button
          type="button"
          class={`group inline-flex h-full w-full flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 ${$page.url.pathname.startsWith("/app/journal") ? "*:text-blue-500 dark:*:text-blue-600" : ""}`}
        >
          <Book
            class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
          />
          <span
            class="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
            >Journal</span
          >
        </button>
      </a>

      <a href="/app/mindfulness">
        <button
          type="button"
          class={`group inline-flex h-full w-full flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 ${$page.url.pathname.startsWith("/app/mindfulness") ? "*:text-blue-500 dark:*:text-blue-600" : ""}`}
        >
          <Flower
            class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
          />
          <span
            class="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
            >Mindfulness</span
          >
        </button>
      </a>

      <a href="/app/settings">
        <button
          type="button"
          class={`group inline-flex h-full w-full flex-col items-center justify-center hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 ${$page.url.pathname === "/app/settings" ? "*:text-blue-500 dark:*:text-blue-600" : ""}`}
        >
          <SlidersVertical
            class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
          />
          <span
            class="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
            >Settings</span
          >
        </button>
      </a>
    </div>
  </div>
</div>
