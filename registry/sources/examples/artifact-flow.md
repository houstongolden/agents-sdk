# Artifact Flow Example

Use this boundary example before persisting or rendering model-generated artifacts. Do not retain the manual validator once schemas become nested or extensible; replace it with Zod, JSON Schema, or an equivalent validator. Invalid or unversioned payloads fail closed. Render a readable invalid-payload state and preserve semantic headings. The example has no runtime dependencies; storage permissions, versioning, sanitization, and recovery are host-owned after install.
