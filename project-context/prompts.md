# Prompt history

## 2026-07-14 — Found Agenty as the agency for agents

**Author:** Houston Golden  
**Source:** Codex desktop, Agenty project  
**Intent:** Build / plan / standardize / connect project context

**Status:** Superseded as active product direction by “Reset to Agents SDK” below. Preserved verbatim as historical provenance.

> Okay I want you to use this directory agenty and think of it like the agency for agents. Also just think of it like our agent framework and a resource, a repo for everything that we're doing, trying to standardize everything around our agentics. Tons of chats around this across all my recent active projects, especially in the codex Management (MGMT) project here inside of codex.
>
> I just need to have a home for all of that work that we're doing outside of just the codex management and to really create a repo around it. To start actually formalizing the structure and architecture and code in creating the real library of everything from the UIS and templates and skills and best practices and some schemas and tools and frameworks and harnesses and stacks and everything you can think of.
>
> Basically building this into an agent building framework that I can use to be a really dedicated kind of live coding starter kit or agent coding vibe coding starter kit to build any type of agent app. That is this whole framework and layer everything in agenty, which will be constantly self-improving, pulling in insights from all of my different projects where I'm building agents, which might already be running in the dream cycle. There's probably a lot of stuff we should move from the Codex management chat into this dedicated agenty directory.
>
> If this actually looks good and is useful and meaningful then I will probably purchase. We can just host it on agenty.so for now and I might buy agenty.io for a thousand bucks and actually make it into a proper open-source agentic framework, collection, resource, and maybe more, as well as a high-ticket agent-building service that I will run and offer to my BAMF clients and other clients. Since I'm building so many agents, I'm getting really good at building agents and standardizing a lot of it, offering it as a service. I think it will make me a lot more money right now than just LinkedIn ghostwriting with BAMF, so it is something I really want to build out and focus on.
>
> Plan everything, create a project-context directory, use all of our best practices that we've saved across all of our projects. Sync this project with my you brain, my you projects, my new act project so it syncs across all my other projects. It gets all of the best skills and best practices, and my plot MD and my codex agents MD, my agent-shared scripts, global, local, everything.
>
> I want you to basically one-shot this whole thing, create a plan, save it in the project-context directory, create an 8, a real verifiable testable goal, and iterate through that goal until we have this really built out using everything that we have.

### Historical interpretation

This prompt created the repository and established the need for a durable cross-project home. Its Agenty brand, agency-first framing, universal framework direction, `agenty.so` / `agenty.io` domain plan, and service-led roadmap are no longer active decisions.

## 2026-07-14 — Reset to Agents SDK

**Author:** Houston Golden
**Source:** Codex desktop, Agenty working directory
**Intent:** Correct product identity, architecture, information architecture, release scope, visual system, and developer experience
**Supersedes:** “Found Agenty as the agency for agents” as the active product brief

### Canonical directive

The project is now **Agents SDK**, built for **agents-sdk.com**. It is not another agent framework, starter repository, or thin wrapper over an existing SDK. Its internal framing is “shadcn/ui for complete agentic applications”: an open-source, opinionated ecosystem of production-ready source, patterns, tools, templates, and guidance that developers can selectively install, copy, customize, and own.

The public position is:

> **The open-source component system for building production agentic applications.**

Agents SDK serves developers building real products beyond `new Agent()`. The durable information architecture is:

1. Components
2. Agents & Skills
3. Tools & MCP
4. Patterns
5. Templates
6. Examples
7. CLI
8. Documentation

The long-term ecosystem may address orchestration, skills, tools, MCP, streaming and reasoning interfaces, approvals, artifacts, memory/context, background work, auth and permissions, knowledge/files/retrieval, observability/evals, guardrails/reliability, deployment, integrations, and production practices. These are a vision map, not claims of current implementation.

Before expanding inventory, the project must establish the correct foundation, public identity, information architecture, visual system, docs model, CLI ownership experience, contribution contract, and a small number of excellent runnable items. Remove generic filler, fake capabilities, premature marketplace concepts, and agency-led copy.

The honest v0.1 target is three components (`agent-chat`, `human-approval`, `artifact-workspace`), one pattern (`approval-gates`), one complete support-agent template, focused examples, and CLI commands `init`, `add`, `list`, `diff`, and `doctor`. Every item must be installable, customizable, tested, documented, and developer-owned.

BAMF appears only through a restrained “Built by BAMF” credit and small Enterprise/custom-development path. BAMF services do not drive the homepage or navigation.

### Namespace decision

Do not compromise the Agents SDK brand because the unscoped npm name is occupied. The intended structure is:

```text
Project:     Agents SDK
Website:     agents-sdk.com
GitHub org:  agents-sdk
npm scope:   @agents-sdk
Executable:  agents
```

The intended package family begins with `@agents-sdk/cli`, `@agents-sdk/core`, and any packages justified by working source. Candidate future scopes such as `@agents-sdk/ui`, `@agents-sdk/mcp`, `@agents-sdk/skills`, `@agents-sdk/patterns`, and `@agents-sdk/evals` must not be created as empty branding.

### Product reset instruction

Do not incrementally polish the former interpretation. Audit it, preserve useful tested primitives and provenance, then rebuild the direction around Agents SDK and agents-sdk.com.

## 2026-07-15 — Rename the project directory without losing Codex context

**Author:** Houston Golden

**Source:** Codex desktop, active Agents SDK build/refocus task opened under the former Agenty path

**Intent:** Make Agents SDK the durable project directory while preserving the current task, project context, and Git continuity

**Status:** Completed. The canonical lowercase physical repository path is `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`; `/Users/houstongolden/Desktop/CODE_2025/agenty` remains a compatibility symlink for the already-open task and is not a second checkout.

> How can I actually rename this directory from agenty to agents-SDK without it creating too many issues in the codex project? Will it detect that we just renamed the project, the directory, or what's the easiest way to do it? Can you just do that for me so that we can have the agenty directory renamed to the agents-SDK directory without losing the project context of this session that we were just working on already?

### Outcome interpretation

The request authorized an in-place filesystem identity migration, not a fresh repository or loss of the open Codex task. Git history and linked worktree metadata remain attached to the same repository. New documentation and tools use the lowercase `agents-sdk` spelling; the symlink can be retired after Codex and dependent integrations are re-registered and verified.

## 2026-07-15 — Produce a complete project and thread handoff audit

**Author:** Houston Golden

**Source:** Codex desktop, active Agents SDK rename/handoff task

**Intent:** Preserve the full working context, content, code directory, documentation, actions, decisions, status, and next work in the canonical project

**Status:** Completed as the dated [full project handoff audit](audits/2026-07-15-full-project-handoff/00-README.md). The result uses one canonical physical repository rather than creating a divergent duplicate checkout.

> generate full robust comprehensive exhaustive complete audit and directory of docs and markdown etc and everything for the full context and content and work of this whole chat and full working log of everything you've done including everything possible and all code too and duplicate it all into the new agents-sdk project directory which is where this whole project is going to live now

### Outcome interpretation

All code already physically resides under `agents-sdk` because the repository was renamed in place. The audit inventories and links the complete source tree instead of copying a second codebase inside itself. It preserves exact user prompts and an evidence-backed action log, while excluding secrets and private chain-of-thought. Canonical project files remain authoritative; the dated audit is a continuity and review artifact.
