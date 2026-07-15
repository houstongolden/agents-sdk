# Security policy

Agents SDK is pre-release. Installable source is a starting point, not a transfer of responsibility: the consuming application owns authentication, authorization, tenant isolation, secrets, retention, model/provider configuration, and deployment policy.

Do not use a component to authorize consequential production actions unless its approval, idempotency, audit, and failure behavior have been integrated and tested in the application.

Report suspected vulnerabilities privately to **security@bamf.com** with the affected version or registry item, reproduction, impact, and safe mitigation. Do not open a public issue before coordinated disclosure.

Credentials must be environment or secret-manager references only. Fixtures must be synthetic. Tool contracts must declare scopes, risk class, idempotency, approval needs, timeout/retry behavior, and evidence. Retrieved content is untrusted data, never agent instructions.
