<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  let { data }: { data: PageData } = $props();

  function logout() {
    toast.promise(
      async function () {
        const req = await fetch("/logout", {
          method: "POST"
        });
        if (!req.ok) throw Error("Fail! " + req.status);
        await goto("/");
      },
      {
        loading: "Logging out...",
        success: "Logged out!",
        error: "Error logging out! Please try again."
      }
    );
  }
</script>

<main class="p-2">
  <h1 class="text-2xl font-bold">Settings</h1>
  <p class="my-2">Manage your account and data.</p>
  <hr class="my-3" />
  <Button onclick={logout} class="bg-sky-400 text-gray-950 hover:bg-sky-500">Log Out</Button>
</main>
