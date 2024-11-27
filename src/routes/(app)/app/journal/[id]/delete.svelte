<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { buttonVariants } from "$lib/components/ui/button";

  type Props = {
    open: boolean;
    onSubmit: () => void;
  };

  let { open = $bindable(false), onSubmit }: Props = $props();
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Delete Journal Entry</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure that you want to delete this entry?
      </AlertDialog.Description>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>No</AlertDialog.Cancel>
        <AlertDialog.Action class={buttonVariants({ variant: "destructive" })} onclick={onSubmit}
          >Yes</AlertDialog.Action
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
