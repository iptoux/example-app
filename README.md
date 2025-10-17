> [The Road to Next - Master Full-Stack Web Development with Next.js 15 and React 19](https://catal.ink/nextjs-course)

# example-app

<center>

<p>
    <img alt="TurboRepo" src="https://img.shields.io/badge/TurboRepo-000000?style=for-the-badge&logo=turborepo&logoColor=orange" />
	<img alt="Vite" src="https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white" />
	<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
	<img alt="TanStack Router" src="https://img.shields.io/badge/TanStack_Router-0ea5a4?style=for-the-badge&logo=react-router&logoColor=white" />
	<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
	<img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn--ui-111827?style=for-the-badge&logo=dotnet&logoColor=white" />
	<img alt="Bun" src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" />
	<img alt="Hono" src="https://img.shields.io/badge/Hono-06b6d4?style=for-the-badge&logo=cloudflare&logoColor=white" />
	<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-31648f?style=for-the-badge&logo=postgresql&logoColor=white" />
	<img alt="Prisma" src="https://img.shields.io/badge/Prisma-2b6cb0?style=for-the-badge&logo=prisma&logoColor=white" />
	<img alt="Better-Auth" src="https://img.shields.io/badge/Better--Auth-0f172a?style=for-the-badge&logo=better-auth&logoColor=white" />
</p>

<img width="800" height="553" alt="image" src="https://github.com/user-attachments/assets/c52a5298-d2d0-4be0-9239-14497e7d666c" />
</center>

---

This application uses a client - server architecture as monorepo.

### The client stack is:

- Vite
- React
- Tanstack Router
- Better-Auth
- Tanstack Query (upcoming)
- TailwindCSS
- Shadcn UI
- Comprehensive Tailwindcss Theme: C64

### The server stack is:

- Bun
- Hono
- PostgreSQL
- Prisma
- Better-Auth
- Zod (upcoming)

## How to run the application

### Run the server

1. Navigate to the server directory and run `bun install` to install the dependencies.
2. Create the `.env` file and add the environment variables from the `.env.example` file.

```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DATABASE_URL=
```

3. Run `bun run dev` to start the development server.

### Run the client

1. Navigate to the client directory and run `bun install` to install the dependencies.
2. Run `bun run dev` to start the development server.

## Monorepo (Bun + Turborepo)

This repository is a Bun-based monorepo using Turbo to orchestrate tasks across packages.

Install dependencies at the project root and add Turbo (PowerShell examples):

```powershell
bun install
bunx --bun turbo@latest
```

Examples — run Turbo across the monorepo (PowerShell):

```powershell
# build all packages matching apps/*
bunx turbo run build --filter=apps/*

# start the client app only
bunx turbo dev --filter=apps/client

# run lint and tests in parallel across the repo
bunx turbo run lint test --parallel
```

Shadcn component install (example targeted to the client app):

```powershell
bunx --bun shadcn@latest add button --filter=apps/client
```

Notes:
- Use `--filter` to target specific packages (e.g. `--filter=apps/client`).
- Prefer `bunx` or `bun run` to invoke binaries installed in the repo.
