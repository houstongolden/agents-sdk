# Tasks — agents-sdk

<!-- generated from tasks.json (you-md/tasks/v1). Do not edit;
     regenerate with `you tasks`; manual changes are rejected. -->

## Active (6)

- [ ] Secure or approve the @agents-sdk npm organization and release access <!-- id:t-hy-001 -->
      open · urgent · #human-gate #phase-7 #urgent
      success: The @agents-sdk npm organization is secured or an approved release namespace is documented.
      Confirm ownership and release access for the intended scoped npm namespace.
- [ ] Approve public package and agents-sdk.com launch <!-- id:t-hy-002 -->
      open · urgent · #human-gate #phase-7 #urgent
      success: Houston records approval for the scoped package and agents-sdk.com public launch.
      dependencies: t-sdk-009
      Approve the public package and site launch after local acceptance gates A1 through A7 pass.
- [ ] Approve restrained Enterprise path and BAMF attribution <!-- id:t-hy-003 -->
      open · high · #human-gate #phase-6 #high
      success: Houston approves or revises the Enterprise link and Built by BAMF attribution.
      Approve the secondary Enterprise path and restrained public BAMF attribution without changing the developer-first product.
- [ ] Publish scoped packages and agents-sdk.com after clean release proof <!-- id:t-sdk-010 -->
      open · urgent · agent · #sdk #phase-7 #urgent
      success: Acceptance gate A8 passes with published packages, live-site proof, tagged rollback evidence, and second-environment verification.
      dependencies: t-sdk-009 | t-hy-001 | t-hy-002
      blockers: @agents-sdk packages are not published | agents-sdk.com is not serving the release | npm namespace/domain/GitHub organization ownership is not proven
      Publish the scoped packages and accepted site only after external ownership and public release gates pass.
- [ ] Establish remote and off-machine repository durability <!-- id:t-sdk-013 -->
      open · high · Houston · #human-gate #handoff #durability #high
      success: Main and any retained branch have verified off-machine custody without exposing secrets or private material.
      Configure an approved remote or backup route and prove the committed repository and unmerged branch are recoverable off-machine.
- [ ] Restore supported You.md write authority <!-- id:t-sdk-014 -->
      open · medium · #sdk #handoff #you-md #medium
      success: The canonical checkout has a valid descriptor and authorized task/context writes succeed through supported You.md tooling.
      Re-register the lowercase Agents SDK checkout through the supported You.md project flow and verify local/remote task projection without bypassing authority guards.

## Done (11)

- [x] Complete identity and namespace migration <!-- id:t-sdk-001 -->
      success: Acceptance gate A1 passes without active legacy branding or unsafe ownership drift.
      evidence: README.md | DESIGN.md | project-context/DECISIONS.md | pnpm validate | API docs guard | JSON and secret scans
- [x] Build homepage, docs shell, information architecture, and item-page anatomy <!-- id:t-sdk-002 -->
      success: Acceptance gate A2 and governed desktop/mobile browser QA pass across all required flows.
      dependencies: t-sdk-001
      evidence: 23 generated pages | desktop/mobile/overflow/console browser QA | approval/menu/CTA browser QA | apps/studio/lib/site-content.test.ts
- [x] Define and test the registry item contract <!-- id:t-sdk-003 -->
      success: Acceptance gate A3 passes with dependency, source, documentation, test, and provenance integrity.
      dependencies: t-sdk-001
      evidence: packages/core/tests/registry.test.ts | schemas/registry-item.schema.json | registry/index.json | core 10 tests
- [x] Ship init, add, list, diff, and doctor ownership loop <!-- id:t-sdk-004 -->
      success: Acceptance gate A4 and the compiled clean-room CLI proof pass.
      dependencies: t-sdk-003
      evidence: packages/cli/tests/cli.test.ts | CLI 22 tests | clean-room compiled CLI init/add support-agent/diff/doctor | clean-room pnpm install/test/typecheck/build
- [x] Ship and accept agent-chat <!-- id:t-sdk-005 -->
      success: The agent-chat portion of acceptance gate A5 passes.
      dependencies: t-sdk-002 | t-sdk-003 | t-sdk-004
      evidence: registry/items/agent-chat.json | registry/sources/components/agent-chat.test.tsx | UI 5 tests | browser QA
- [x] Ship and accept human-approval <!-- id:t-sdk-006 -->
      success: The human-approval portion of acceptance gate A5 passes.
      dependencies: t-sdk-002 | t-sdk-003 | t-sdk-004
      evidence: registry/items/human-approval.json | registry/sources/components/human-approval.test.tsx | approval browser QA
- [x] Ship and accept artifact-workspace <!-- id:t-sdk-007 -->
      success: The artifact-workspace portion of acceptance gate A5 passes.
      dependencies: t-sdk-002 | t-sdk-003 | t-sdk-004
      evidence: registry/items/artifact-workspace.json | registry/sources/components/artifact-workspace.test.tsx | desktop/mobile browser QA
- [x] Ship approval-gates pattern and complete support-agent template <!-- id:t-sdk-008 -->
      success: Acceptance gate A6 and the support-agent install, 11 tests, typecheck, and build proof pass.
      dependencies: t-sdk-005 | t-sdk-006 | t-sdk-007
      evidence: registry/sources/patterns/approval-gates.test.ts | templates/support-agent/tests | clean-room support-agent 11 tests/typecheck/build
- [x] Complete documentation and fresh-developer proof <!-- id:t-sdk-009 -->
      success: Acceptance gate A7 passes with site, API docs, package, and clean-room evidence.
      dependencies: t-sdk-008
      evidence: site 14 tests | 23 generated pages | API docs guard | package dry-runs | clean-room proof
- [x] Reconcile historical collision files <!-- id:t-sdk-011 -->
      success: No collision artifact remains, unique evidence is preserved in Git or canonical context, and pnpm validate passes without quarantine.
      evidence: project-context/audits/2026-07-15-full-project-handoff/10-CONTEXT-RECOVERY-AND-COLLISION-CLOSURE.md | git blob/history custody audit | pnpm validate
- [x] Review and decide ADIL contract branch custody <!-- id:t-sdk-012 -->
      success: Every unique ADIL contract is dispositioned with evidence and the linked worktree can be retained or removed deliberately.
      dependencies: t-sdk-011
      evidence: project-context/audits/2026-07-15-full-project-handoff/11-ADIL-BRANCH-DISPOSITION.md | packages/intelligence-contracts/ | schemas/intelligence/ | 19 focused tests | pnpm validate

<!-- notes:start -->

<!-- notes:end -->
