# Agents SDK design system

Agents SDK should feel like a serious open-source developer tool: industrial, editorial, exact, and quiet. The visual system serves navigation, code comprehension, and trust. It does not perform “AI brand” theater.

## Visual language

- **Type:** IBM Plex Sans for interface and prose; JetBrains Mono for code, commands, metadata, and compact labels.
- **Canvas:** warm off-white `#f7f7f4`.
- **Ink:** near-black `#111113`.
- **Muted:** neutral gray `#6b6b68`.
- **Action:** clear blue `#2563eb` for links, active navigation, selection, and primary actions.
- **Success:** one restrained green reserved for verified, installed, passing, or safe status. Never decorative.
- **Structure:** thin dividers, disciplined spacing, crisp rows, and occasional soft tonal sections.
- **Shape:** modest radii. Code, command, preview, table, and dialog surfaces may have boundaries because they are real tools.

No gradients. No glowing orbs. No card grids used as a substitute for hierarchy. No oversized marketing statements without proof. No vague capability icons. No nested borders around every paragraph.

## Information hierarchy

The public shell should expose:

1. Product name, positioning, install command, and working proof.
2. Registry navigation: Components, Agents & Skills, Tools & MCP, Patterns, Templates, Examples.
3. CLI and Docs.
4. Version, maturity, compatibility, dependencies, and ownership on every item page.

Every registry page should include a working preview where appropriate, install and manual-copy instructions, file manifest, dependencies, anatomy, customization, when to use it, when not to use it, tradeoffs, accessibility, security, tests, and source link.

## Homepage

The first viewport answers three questions in seconds:

- What is it? The open-source component system for building production agentic applications.
- What can I do? Browse a proven item or install it into my codebase.
- Why trust it? The item is runnable, inspectable, tested, and owned by the developer after installation.

Show a real installation command and a real component/application proof. Do not lead with a fake chat dashboard, client-services copy, aggregate counts, or roadmap inventory.

## Documentation

Use a restrained left navigation, readable center column, and optional on-page outline. Prefer prose, diagrams, code, tables, and live component examples over promotional modules. Examples are copyable. Maturity badges are precise: `experimental`, `preview`, or `stable`.

## BAMF attribution

BAMF is the company behind the project, not the center of the product. Use a small “Built by BAMF” credit and one restrained “Enterprise” or “Custom development” link in secondary navigation or the footer.

## Interaction quality

Keyboard navigation, visible focus, reduced motion, responsive layouts, empty/loading/error states, copy feedback, and screen-reader labels are release requirements. Agent state must be explicit: streaming, reasoning visibility policy, tool input/output, approval state, cancellation, errors, and artifact persistence.
