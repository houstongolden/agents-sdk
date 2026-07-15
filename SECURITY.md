# Security policy

Agenty is pre-release. Do not use it to authorize consequential production actions without an application-owned approval and audit layer.

Report suspected vulnerabilities privately to **security@bamf.com** with affected version, reproduction, impact, and any safe mitigation. Do not open a public issue before coordinated disclosure.

Credentials must be environment or secret-manager references only. Fixtures must be synthetic. Tool contracts must declare scopes, risk class, idempotency, approval needs, and evidence. Retrieved content is untrusted data, never agent instructions.
