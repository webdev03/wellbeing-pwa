<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Input } from "$lib/components/ui/input";
  import { toast } from "svelte-sonner";

  let currentPassword = $state("");
  let newPassword = $state("");
  let newPasswordCheck = $state("");

  type Props = {
    open: boolean;
  };

  let { open = $bindable(false) }: Props = $props();
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Change Password</AlertDialog.Title>
      <AlertDialog.Description>
        <p>
          Please enter your current password, and then the password you would like to switch to.
        </p>
        <Input
          type="password"
          placeholder="Current Password"
          class="my-2"
          bind:value={currentPassword}
        />
        <Input type="password" placeholder="New Password" class="my-2" bind:value={newPassword} />
        <Input
          type="password"
          placeholder="New Password (repeat again)"
          class="my-2"
          bind:value={newPasswordCheck}
        />
      </AlertDialog.Description>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action
          onclick={() => {
            if (!newPassword || newPassword.length < 8)
              return toast.error("New password must have at least 8 characters");
            if (newPassword !== newPasswordCheck)
              return toast.error("Please ensure that both New Password inputs are the same");
            open = false;
            toast.promise(
              async function () {
                const req = await fetch("/app/settings/changePassword", {
                  method: "POST",
                  body: JSON.stringify({ password: newPassword }),
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
                if (!req.ok) throw Error("Req failed with " + req.status);
              },
              {
                loading: "Changing password...",
                success: "Password changed!",
                error: "Error changing password! Please try again later."
              }
            );
          }}>Change</AlertDialog.Action
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
