# StateProof Web

> Proof that your automated workflows ran exactly as intended.

StateProof is a web dashboard for creating **tamper-evident audit trails for automated workflows** — AI agents, RPA bots, scheduled jobs, and integrations. It uses **Merkle trees** to provide cryptographic proof that automated processes ran exactly as intended. Users can verify session integrity without trusting the platform — verification is mathematical.

## Features

- **Merkle Tree Audit Trails** — Every workflow session is hashed into a Merkle tree. The root hash changes if any event is tampered with.
- **Per-Session Proofs** — Generate compact Merkle proofs for any session. Third parties can verify without the full dataset.
- **Interactive Tree Visualization** — ReactFlow-based interactive graph showing tree nodes (root, internal, leaf). Click a leaf to open session details.
- **Live Verification Panel** — Paste session JSON data and verify against the stored Merkle root in real time.
- **Stateless Verification** — Verify a proof (leaf hash + proof path + root) without authentication via the public `/verify` endpoint.
- **JWT Auth with Refresh Tokens** — Access token in memory, refresh token in an HttpOnly cookie. Auto-refresh on 401 with request queuing.
- **API Client Management** — Create, rotate, and delete API clients with scoped keys for programmatic access.
- **Organization-Scoped Multi-Tenancy** — Users belong to organizations; all data is org-scoped.
- **Admin Approval Flow** — New signups may require admin approval via an email link.
- **Event-Level Audit Trail** — Events include executor type (agent, RPA, human, integration, job, system), event type (tool call, decision, approval, API call, error, trigger), timestamps, and arbitrary data payloads.
- **Dark-Themed UI** — Fully dark mode design with a custom color palette.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build Tool | Vite 8 |
| Routing | React Router DOM 6 |
| Server State | TanStack React Query 5 |
| Styling | Tailwind CSS 3 + CSS variables |
| UI Primitives | Radix UI |
| Forms | React Hook Form 7 + Zod |
| HTTP Client | Axios |
| Graph Visualization | ReactFlow 11 + Dagre |
| Icons | Lucide React |
| Package Manager | pnpm |

## Prerequisites

- **Node.js** >= 18
- **pnpm** (install via `corepack enable` or `npm i -g pnpm`)

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd stateproof-web

# Install dependencies
pnpm install

# Copy environment file and configure
cp .env.example .env

# Start the development server
pnpm dev
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

## Project Structure

```
src/
├── App.tsx                  # Router configuration
├── main.tsx                 # Entry point (QueryClient + AuthProvider + App)
├── index.css                # Tailwind + CSS custom properties (dark theme)
├── lib/
│   ├── api.ts               # Axios instance with JWT interceptors & auto-refresh
│   ├── auth.ts              # Refresh token cookie helpers
│   ├── types.ts             # TypeScript type definitions
│   ├── utils.ts             # Utility functions (truncateHash, formatDate, cn)
│   └── cn.ts                # clsx + tailwind-merge utility
├── context/
│   └── AuthContext.tsx       # Auth state (user, tokens, login/logout)
├── queries/
│   ├── useMe.ts             # Current user
│   ├── useWorkflows.ts      # Workflow list
│   ├── useWorkflow.ts       # Single workflow
│   ├── useSessions.ts       # Session list
│   ├── useSession.ts        # Single session
│   ├── useSessionCount.ts   # Session count
│   ├── useClients.ts        # API client CRUD
│   ├── useProof.ts          # Session Merkle proof
│   └── useTreeNodes.ts      # Merkle tree node structure
├── pages/                   # Route page components
├── components/
│   ├── auth/                # Login, Signup, ForgotPassword, ResetPassword forms
│   ├── layout/              # AppShell, Sidebar, ProtectedRoute, PublicRoute
│   ├── workflows/           # WorkflowCard, SessionsTable, MerkleTreeView, VerifyPanel, CreateWorkflowModal
│   ├── sessions/            # ProofDrawer, EventTimeline, EventCard
│   ├── settings/            # ApiKeyDisplay, CreateClientModal
│   ├── common/              # StatusBadge, EventTypeBadge, ExecutorBadge, HashDisplay, Skeleton, JsonViewer
│   └── ui/                  # Radix-based UI primitives (button, input, dialog, tabs, etc.)
└── assets/                  # Static assets
```

## Routes

### Public

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Marketing landing page with features, how-it-works, and CTA |
| `/login` | Login | Email/password login form |
| `/signup` | Signup | Org creation + account registration |
| `/forgot-password` | Forgot Password | Sends password reset email |
| `/reset-password` | Reset Password | Resets password using token from email |
| `/approve/:token` | Approve | Admin approval link for new user accounts |

### Protected

| Route | Page | Description |
|---|---|---|
| `/dashboard` | Dashboard | Lists all workflows in a card grid |
| `/workflows/:workflowId` | Workflow Detail | Tabs: Sessions table, Merkle Tree visualization, Verify panel |
| `/workflows/:workflowId/sessions/:sessionId` | Session Detail | Status, hashes, dates, proof drawer |
| `/settings` | Settings | Org info, API client CRUD, sign out |
| `/profile` | Profile | User email, name, role, status, org |

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm dev` | Start development server with HMR |
| `build` | `pnpm build` | Type-check and build for production |
| `preview` | `pnpm preview` | Preview production build locally |
| `lint` | `pnpm lint` | Run ESLint |
