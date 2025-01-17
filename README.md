# Wellbeing PWA

![logo and "Wellbeing", "Improve your mental health"](https://cloud-msq5swus7-hack-club-bot.vercel.app/0wellbeing-ss-mini.jpg)

Improve your wellbeing and quality of life with this app (distributed as a PWA).

## Features
1. Accounts system (username and password)
2. Journal entries (recommended to be used as a [gratitude journal](https://en.wikipedia.org/wiki/Gratitude_journal))
3. Quick wellbeing assessments based on the [WHO-5 questions](https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01) (original licensed under CC-BY-NC-SA 3.0).
4. Graphs to show wellbeing changes over time.
5. Small activities to help improve wellbeing.

## Self hosting

> [!NOTE]
> It is quicker and easier to just use the [hosted version](https://wellbeing.devarsh.me)! If you are still interested, self hosting can bring speed and security improvements.

### Prerequisites
Make sure you have these set up before continuing!
1. [Bun](https://bun.sh), the JavaScript runtime used for this project. _PS: If you want, you can use the `shell.nix` included in this repository if you know how to use that._
2. A Neon database. (The code here is designed for usage with Neon, but with slight tweaks you should be able to get another PostgreSQL database working).
### Guide
1. Install dependencies:
   ```bash
   bun install
   ```
2. Set up the `.env` file.
   - Copy the `.env.example` file to a new `.env` file, then replace the example URL with your real database URL.
3. Change the SvelteKit adapter to the adapter: This repository uses the Vercel adapter by default, but you can set up another like the [Node adapter](https://svelte.dev/docs/kit/adapter-node) by changing the first line in the `svelte.config.js` file, installing the needed dependencies, and optionally configuring the adapter in the rest of the file.
3. Build the project:
   ```bash
   bun run build
   ```
4. Run the server with the method described in your SvelteKit adapter documentation.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for review.
