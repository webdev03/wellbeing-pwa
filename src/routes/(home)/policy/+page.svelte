<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<main class="m-3 *:my-2">
  <h1 class="mb-2 text-3xl font-bold">Policy</h1>
  <p>
    We have the right to refuse the usage of the Wellbeing site for any reason, including but not
    limited to harming the service for other users or storing objectionable content.
  </p>
  <p>
    There are NO GUARANTEES about the reliability or security of this service. There is no financial
    gain from this project. We may try to provide notice of the shutdown of this service, but we DO
    NOT GUARANTEE that it will stay on the Internet.
  </p>
  <p>
    Data collected includes your username, your password, and any data you provide, including but
    not limited to your journal entries. Your password will be hashed using the argon2i algorithm
    and stored in this hashed form in our Neon.tech database. Please ensure that your username does
    not contain sensitive information and that your password follows proper cybersecurity standards.
    Also, ensure that your journal entries do not contain any information that you would not want to
    be public in the case of a breach of the Wellbeing site.
  </p>
  <p>
    A leak of your data may occur. We are NOT RESPONSIBLE for damages arising from such an incident.
    Please make sure to keep a minimal amount of personal data on this site.
  </p>
  <p>
    If you have any concerns, please contact the developer through our GitHub repository by creating
    an Issue at <a href="https://github.com/webdev03/wellbeing-pwa" class="text-sky-500 underline"
      >https://github.com/webdev03/wellbeing-pwa</a
    >.
  </p>
  <p class="italic">Note: This website is hosted on Vercel and uses a Neon database.</p>
</main>
