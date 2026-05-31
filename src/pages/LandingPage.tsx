import { Link } from "react-router-dom";
import {
  Shield,
  GitBranch,
  Fingerprint,
  Eye,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
  TreePine,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Merkle Tree Audit Trails",
    description:
      "Every workflow session is hashed into a Merkle tree. Tamper with a single event and the entire root hash changes — proving integrity is cryptographic, not trust-based.",
    color: "text-[#a78bfa]",
    bg: "bg-[#a78bfa]/10",
    border: "border-[#a78bfa]/20",
  },
  {
    icon: Fingerprint,
    title: "Per-Session Proofs",
    description:
      "Generate compact Merkle proofs for any session. Verify a session's integrity without needing access to the full dataset — ideal for third-party auditors.",
    color: "text-[#60a5fa]",
    bg: "bg-[#60a5fa]/10",
    border: "border-[#60a5fa]/20",
  },
  {
    icon: Bot,
    title: "Built for Automated Workflows",
    description:
      "Designed for AI agents, RPA bots, scheduled jobs, and integrations. Track every tool call, decision, approval, and error across your automated pipelines.",
    color: "text-[#22d3ee]",
    bg: "bg-[#22d3ee]/10",
    border: "border-[#22d3ee]/20",
  },
  {
    icon: Eye,
    title: "Live Workflow Verification",
    description:
      "Paste session data and verify against the stored Merkle root in real-time. Stateless verification endpoint works without authentication — share results openly.",
    color: "text-[#34d399]",
    bg: "bg-[#34d399]/10",
    border: "border-[#34d399]/20",
  },
  {
    icon: Lock,
    title: "Organization-Scoped Access",
    description:
      "JWT-based auth with role-aware access. API clients get scoped keys for programmatic logging. Admin approval flow for new team members.",
    color: "text-[#fbbf24]",
    bg: "bg-[#fbbf24]/10",
    border: "border-[#fbbf24]/20",
  },
  {
    icon: Zap,
    title: "Fast & Tamper-Evident",
    description:
      "Append-only event logging with chained session hashes. Each session links to its predecessor, creating an immutable chain of custody for your automation data.",
    color: "text-[#fb7185]",
    bg: "bg-[#fb7185]/10",
    border: "border-[#fb7185]/20",
  },
];

const steps = [
  {
    step: "01",
    title: "Create a Workflow",
    description:
      "Define a workflow to group related automation sessions — by agent, process, or project.",
  },
  {
    step: "02",
    title: "Log Events via API",
    description:
      "Your agents and bots push events (tool calls, decisions, errors) to session endpoints using scoped API keys.",
  },
  {
    step: "03",
    title: "Sessions Get Hashed",
    description:
      "Each session's events are hashed into a leaf node. Leaves are combined into a Merkle tree per workflow.",
  },
  {
    step: "04",
    title: "Verify Anytime",
    description:
      "Generate proofs for any session. Verify integrity locally or via the public endpoint — no secrets required for verification.",
  },
];

const capabilities = [
  "Cryptographic integrity via Merkle trees",
  "Per-session and full-workflow verification",
  "Event-level audit trail with executor attribution",
  "Stateless public verification endpoint",
  "API client management for programmatic access",
  "Interactive Merkle tree visualization",
  "Chained session hashes for temporal integrity",
  "Organization-scoped multi-tenant isolation",
];

function GridPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#dde3f0 1px, transparent 1px), linear-gradient(90deg, #dde3f0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#60a5fa]/20 to-transparent" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07080c]">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1c2030]/60 bg-[#07080c]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#60a5fa]" />
            <span className="text-base font-semibold text-[#dde3f0]">
              StateProof
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-md px-3 py-1.5 text-sm text-[#8892aa] transition-colors hover:text-[#dde3f0]"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-[#60a5fa] px-4 py-1.5 text-sm font-medium text-[#07080c] transition-colors hover:bg-[#60a5fa]/90"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <GridPattern />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1c2030] bg-[#0e1018] px-3 py-1 text-xs text-[#8892aa]">
            <TreePine className="h-3 w-3 text-[#a78bfa]" />
            Cryptographic audit trails for automation
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#dde3f0] sm:text-6xl">
            Proof that your{" "}
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
              automated workflows
            </span>{" "}
            ran exactly as intended
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#8892aa]">
            StateProof creates tamper-evident audit trails for AI agents, RPA
            bots, and automated pipelines. Every action is hashed into a Merkle
            tree — making integrity verification cryptographic, not
            trust-based.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[#60a5fa] px-6 py-3 text-sm font-semibold text-[#07080c] transition-all hover:bg-[#60a5fa]/90 hover:shadow-lg hover:shadow-[#60a5fa]/20"
            >
              Start building for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1c2030] bg-[#0e1018] px-6 py-3 text-sm font-medium text-[#dde3f0] transition-colors hover:border-[#60a5fa]/30"
            >
              View dashboard
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto mt-20 max-w-4xl px-6">
          <div className="rounded-xl border border-[#1c2030] bg-[#0e1018] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
              <span className="ml-3 text-xs text-[#8892aa]">workflow-session-proof</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-[#1c2030] bg-[#07080c] p-4">
                <p className="text-xs font-medium text-[#8892aa] uppercase tracking-wider mb-3">Workflow</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#34d399]" />
                    <span className="text-xs text-[#dde3f0]">Onboarding Pipeline</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8892aa]">Sessions</span>
                    <span className="text-[#dde3f0] font-mono">24</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8892aa]">Root</span>
                    <span className="font-mono text-[#a78bfa]">0xa3f8...c2d1</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-[#1c2030] bg-[#07080c] p-4">
                <p className="text-xs font-medium text-[#8892aa] uppercase tracking-wider mb-3">Session Events</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#60a5fa]/15 px-1.5 py-0.5 text-[10px] text-[#60a5fa]">tool_call</span>
                    <span className="text-xs text-[#dde3f0]">fetch_user_data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#a78bfa]/15 px-1.5 py-0.5 text-[10px] text-[#a78bfa]">decision</span>
                    <span className="text-xs text-[#dde3f0]">approve_request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#34d399]/15 px-1.5 py-0.5 text-[10px] text-[#34d399]">api_call</span>
                    <span className="text-xs text-[#dde3f0]">create_record</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-[#1c2030] bg-[#07080c] p-4">
                <p className="text-xs font-medium text-[#8892aa] uppercase tracking-wider mb-3">Merkle Proof</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[#60a5fa]">leaf</span>
                    <span className="font-mono text-[#dde3f0]">0x7b2a...e4f1</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <ArrowRight className="h-3 w-3 text-[#8892aa]" />
                    <span className="text-[#34d399]">left</span>
                    <span className="font-mono text-[#dde3f0]">0x9c1d...a3b7</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <ArrowRight className="h-3 w-3 text-[#8892aa]" />
                    <span className="text-[#a78bfa]">root</span>
                    <span className="font-mono text-[#a78bfa]">0xa3f8...c2d1</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 rounded bg-[#34d399]/10 px-2 py-1 text-xs font-medium text-[#34d399]">
                    <CheckCircle2 className="h-3 w-3" />
                    Proof valid
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-[#07080c] to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[#60a5fa]">
              Platform
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#dde3f0] sm:text-4xl">
              Everything you need for auditable automation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8892aa]">
              From event ingestion to cryptographic verification — a complete
              toolkit for proving what your automated systems did and when.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group rounded-xl border ${f.border} ${f.bg} p-6 transition-all hover:border-opacity-40`}
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}
                >
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="text-base font-semibold text-[#dde3f0]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8892aa]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#1c2030] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[#a78bfa]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#dde3f0] sm:text-4xl">
              From events to proofs in four steps
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <span className="text-4xl font-bold text-[#1c2030]">
                  {s.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-[#dde3f0]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8892aa]">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#34d399]">
                Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#dde3f0] sm:text-4xl">
                Enterprise-grade integrity for every workflow
              </h2>
              <p className="mt-4 text-[#8892aa] leading-relaxed">
                Whether you're running AI agents at scale or managing regulatory
                compliance for RPA bots, StateProof gives you the cryptographic
                guarantees you need.
              </p>
              <Link
                to="/signup"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#60a5fa] transition-colors hover:text-[#60a5fa]/80"
              >
                Get started in minutes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-2.5 rounded-lg border border-[#1c2030] bg-[#0e1018] px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#34d399]" />
                  <span className="text-sm text-[#dde3f0]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* API snippet preview */}
      <section className="border-t border-[#1c2030] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[#22d3ee]">
              Developer-first
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#dde3f0] sm:text-4xl">
              Simple REST API
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8892aa]">
              Log events and verify proofs with a straightforward REST API. Scoped
              API keys keep your automations secure.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-[#1c2030] bg-[#0e1018] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[#1c2030] px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
              <span className="ml-3 text-xs text-[#8892aa]">example.py</span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
              <code>
                <span className="text-[#a78bfa]">import</span>
                <span className="text-[#dde3f0]"> requests</span>
                {"\n\n"}
                <span className="text-[#8892aa]"># Log an event from your agent</span>
                {"\n"}
                <span className="text-[#dde3f0]">requests.post(</span>
                {"\n"}
                <span className="text-[#8892aa]">    </span>
                <span className="text-[#34d399]">
                  "https://api.stateproof.io/api/v1/workflows/{'{id}'}/sessions/{'{sid}'}/events"
                </span>
                <span className="text-[#dde3f0]">,</span>
                {"\n"}
                <span className="text-[#8892aa]">    </span>
                <span className="text-[#dde3f0]">headers</span>
                <span className="text-[#8892aa]">=</span>
                <span className="text-[#dde3f0]">{"{"}</span>
                <span className="text-[#fbbf24]">"Authorization"</span>
                <span className="text-[#8892aa]">: </span>
                <span className="text-[#fbbf24]">"Bearer {'{API_KEY}'}"</span>
                <span className="text-[#dde3f0]">{"}"}</span>
                <span className="text-[#8892aa]">,</span>
                {"\n"}
                <span className="text-[#8892aa]">    </span>
                <span className="text-[#dde3f0]">json</span>
                <span className="text-[#8892aa]">=</span>
                <span className="text-[#dde3f0]">{"{"}</span>
                {"\n"}
                <span className="text-[#8892aa]">        </span>
                <span className="text-[#fbbf24]">"event_type"</span>
                <span className="text-[#8892aa]">: </span>
                <span className="text-[#34d399]">"tool_call"</span>
                <span className="text-[#8892aa]">,</span>
                {"\n"}
                <span className="text-[#8892aa]">        </span>
                <span className="text-[#fbbf24]">"executor_type"</span>
                <span className="text-[#8892aa]">: </span>
                <span className="text-[#34d399]">"agent"</span>
                <span className="text-[#8892aa]">,</span>
                {"\n"}
                <span className="text-[#8892aa]">        </span>
                <span className="text-[#fbbf24]">"action"</span>
                <span className="text-[#8892aa]">: </span>
                <span className="text-[#34d399]">"Processed customer refund #4821"</span>
                <span className="text-[#8892aa]">,</span>
                {"\n"}
                <span className="text-[#8892aa]">    </span>
                <span className="text-[#dde3f0]">{"}"}</span>
                {"\n"}
                <span className="text-[#dde3f0]">)</span>
                {"\n\n"}
                <span className="text-[#8892aa]"># Verify a session's integrity</span>
                {"\n"}
                <span className="text-[#dde3f0]">proof </span>
                <span className="text-[#8892aa]">= </span>
                <span className="text-[#dde3f0]">requests.get(</span>
                <span className="text-[#34d399]">".../sessions/{'{sid}'}/proof"</span>
                <span className="text-[#dde3f0]">)</span>
                {"\n"}
                <span className="text-[#dde3f0]">result </span>
                <span className="text-[#8892aa]">= </span>
                <span className="text-[#dde3f0]">requests.post(</span>
                <span className="text-[#34d399]">".../verify"</span>
                <span className="text-[#dde3f0]">, json</span>
                <span className="text-[#8892aa]">=</span>
                <span className="text-[#dde3f0]">proof.json())</span>
                {"\n"}
                <span className="text-[#a78bfa]">assert</span>
                <span className="text-[#dde3f0]"> result[</span>
                <span className="text-[#34d399]">"valid"</span>
                <span className="text-[#dde3f0]">] </span>
                <span className="text-[#8892aa]">is </span>
                <span className="text-[#34d399]">True</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-[#dde3f0] sm:text-4xl">
            Start proving your workflows today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#8892aa]">
            Create your organization, set up API clients, and start logging
            tamper-evident audit trails in minutes.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-[#60a5fa] px-6 py-3 text-sm font-semibold text-[#07080c] transition-all hover:bg-[#60a5fa]/90 hover:shadow-lg hover:shadow-[#60a5fa]/20"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1c2030] py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#60a5fa]" />
            <span className="text-sm text-[#8892aa]">
              StateProof
            </span>
          </div>
          <p className="text-xs text-[#8892aa]">
            Cryptographic audit trails for automated workflows
          </p>
        </div>
      </footer>
    </div>
  );
}
