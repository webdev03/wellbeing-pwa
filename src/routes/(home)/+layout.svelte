<script lang="ts">
  import { page } from "$app/stores";
  import "../../app.css";
  let { children } = $props();
  interface LinkBarItem {
    url: string;
    text: String;
  }

  const links: LinkBarItem[] = [
    {
      url: "/app",
      text: "App"
    },
    {
      url: "/policy",
      text: "Legal Policy"
    }
  ];
</script>

<svelte:head>
  <title>Wellbeing</title>
  <meta name="description" content="An app that allows users to manage their wellbeing." />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<nav class="border-gray-200 bg-white dark:bg-gray-900">
  <div class="mx-auto flex flex-wrap items-center justify-between p-4">
    <a href="/" class="flex items-center self-center text-center text-xl font-semibold">Wellbeing</a
    >
    <div class="w-auto">
      <ul class="flex flex-row font-medium">
        {#each links as link}
          <li>
            <a
              href={link.url}
              aria-current={$page.url.pathname.startsWith(link.url) ? "page" : undefined}
              class={`rounded px-3 py-2 transition-all hover:bg-gray-200 ${$page.url.pathname.startsWith(link.url) ? "text-blue-600" : ""}`}
              >{link.text}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
{@render children()}
