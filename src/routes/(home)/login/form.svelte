<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Loader2 } from "lucide-svelte";
  import { formSchema, type FormSchema } from "./schema";
  import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema)
  });

  const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance class="w-72">
  <Form.Field {form} name="username">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input {...props} type="text" bind:value={$formData.username} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input {...props} type="password" bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button class="w-full bg-sky-400 text-gray-950 hover:bg-sky-500"
    >{#if $delayed}<Loader2 class="animate-spin" />{/if}Log In</Form.Button
  >

  <p class="mt-2 text-xs">
    By logging in, you agree to our <Button
      variant="link"
      href="/policy"
      class="p-0 text-xs underline">Terms and Conditions</Button
    >.
  </p>

  <hr class="my-2" />

  <p>
    Don't have an account yet? <a href="/signup" class="text-sky-500 underline hover:text-sky-600"
      >Sign Up!</a
    >
  </p>
</form>
