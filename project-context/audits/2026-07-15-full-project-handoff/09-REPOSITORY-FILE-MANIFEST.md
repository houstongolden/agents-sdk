# Repository file manifest

**Manifest date:** 2026-07-15
**Canonical repository:** `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`
**Git snapshot:** `main` at `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`
**Manifest coverage:** 219 one-row path records; 218 paths have measured byte sizes and SHA-256 values; this file is the sole self-hash exception

## Purpose

This manifest freezes the durable custody surface available at handoff time. It enumerates:

- all **171 Git-tracked files** at the pre-audit HEAD;
- all **10 intentional audit artifacts**, files `00` through `09`, with this file's size/hash omitted to avoid circular self-reference;
- all **29 untracked collision files** whose names contain ` 2` before the extension;
- the **9 ignored generated CLI Markdown/HTML mirrors** requested as a representative generated class.

Every measured row records repository-relative path, classification/owner, tracked state, byte size, and SHA-256 digest. At final refresh, 166 tracked files were byte-identical to HEAD and five tracked canonical project-context files contained intentional handoff edits.

## Count and custody summary

| Set                               |   Paths |             Bytes measured | State                                     |
| --------------------------------- | ------: | -------------------------: | ----------------------------------------- |
| Canonical Git-tracked repository  |     171 |                    466,917 | 166 at HEAD; 5 intentionally modified     |
| Intentional audit files `00`–`08` |       9 |                    243,433 | untracked, intended handoff additions     |
| This manifest `09`                |       1 |           self-referential | untracked, intended handoff addition      |
| Untracked `* 2.*` collisions      |      29 |                     62,921 | noncanonical; reconcile before staging    |
| Generated CLI docs/HTML mirrors   |       9 |                      8,291 | ignored and reproducible                  |
| **Total rows**                    | **219** | **781,562 plus this file** | four explicitly separated custody classes |

The same canonical file can have an ignored generated copy; both paths are listed because they have different custody states. No `* 2.*` file is counted as canonical.

## Git and worktree facts

| Fact                                | Observed value                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| Canonical physical/toplevel path    | `/Users/houstongolden/Desktop/CODE_2025/agents-sdk`                                    |
| Main Git directory/common directory | `.git` / `.git`                                                                        |
| Main branch/HEAD                    | `main` / `9c7f1f918ad1679a1d2e85db57582b5d363ad21d`                                    |
| Compatibility path                  | `/Users/houstongolden/Desktop/CODE_2025/agenty -> agents-sdk`                          |
| Linked worktree                     | `/Users/houstongolden/Desktop/CODE_2025/.codex-worktrees/adil-agenty`                  |
| Linked branch/HEAD                  | `codex/adil-contracts` / `0a5d80eb8037c49017e3bb00876fa6bdf2be2ba1`                    |
| ADIL pointer                        | `gitdir: /Users/houstongolden/Desktop/CODE_2025/agents-sdk/.git/worktrees/adil-agenty` |
| Remote/tags at snapshot             | none configured / none                                                                 |
| Git connectivity                    | passed; only the standard dangling empty-tree object was reported                      |

The ADIL worktree's physical files are excluded from the per-file table because it is an external linked checkout, not part of the main worktree manifest. Its branch, commit, and shared-object custody are recorded above and in `08-PATH-MIGRATION-AND-CODE-CUSTODY.md`.

## Aggregate hashes

Aggregate digests are hashes of a canonical, lexicographically sorted stream of lines in the exact form:

```text
<file-sha256><two spaces><repository-relative-path><newline>
```

| Aggregate set                                           | Files |   Bytes | SHA-256                                                            |
| ------------------------------------------------------- | ----: | ------: | ------------------------------------------------------------------ |
| All 171 tracked files                                   |   171 | 466,917 | `4e2b67ab6e3cd4b2c3df710b0cd7ca018baa5e968efe16cabea7c1bc9e12f057` |
| Canonical tracked `project-context/**`                  |    16 |  60,347 | `d03a26226689d53af9b72e8db7685836d8c2dbf90778ab1154b758fc27c55b99` |
| Canonical tracked project context plus `youstack.json`  |    17 |  64,224 | `ad8b1614b1e638b8c764bce3404effbba8564493c0707fc2451d27b717e2237a` |
| Legacy numbered files directly under `project-context/` |    12 |  28,519 | `5c143d847911966716f9b4c1b71570c5ddd22d6cfc78616e59b02d0f34b2bae5` |
| Legacy numbered project context plus `youstack 2.json`  |    13 |  31,956 | `eb39fc6d6f7772f5c15453c9e5faad335cd691a0b32c92b41cf38a8fc94b9771` |
| All 29 numbered collision files                         |    29 |  62,921 | `773ab845e6e9d7e1591e6784abfa7e24fb015da8ede96ed1721fbf7265ef7d8d` |
| Audit files `00`–`08` before this file was refreshed    |     9 | 243,433 | `b1a6b9b970a1cf782c563cf1b9f942e27b8e57fc24e4e62720a8c348c0b8a88c` |
| Nine generated CLI documentation mirrors                |     9 |   8,291 | `484444435b305c55822bcdaae299e011cf80a05e783ca55062a5eb678f076424` |

The audit aggregate is intentionally pre-`09`. If any earlier audit file is edited after this manifest is written—for example, to change an index status—its row and the audit aggregate must be regenerated.

## Per-file manifest: 171 tracked canonical files

| Path                                                        | Classification / owner                            | Tracked state    | Bytes | SHA-256                                                            |
| ----------------------------------------------------------- | ------------------------------------------------- | ---------------- | ----: | ------------------------------------------------------------------ |
| `.changeset/README.md`                                      | release metadata / Changesets                     | tracked@HEAD     |   633 | `966ff94526713bbec501d0d684557f73bd40c181419fe71bd97bb715c68cffe7` |
| `.changeset/bright-agents-preview.md`                       | release metadata / Changesets                     | tracked@HEAD     |   323 | `5fe7bd8a056e577b6173fbd08a31544efb47744f69a9727cfd555be808d87146` |
| `.changeset/config.json`                                    | release metadata / Changesets                     | tracked@HEAD     |   271 | `e23cb92e18b3381ba2137da20ba040f6966e56da226bc04fbcaac6f8d3aa7caf` |
| `.github/dependabot.yml`                                    | repository automation / GitHub                    | tracked@HEAD     |   435 | `a73c47341d87b4a9de0da212c2f6113402ac939e1307b872475e7d7529b9d985` |
| `.github/workflows/ci.yml`                                  | repository automation / GitHub                    | tracked@HEAD     |   854 | `e8ed4c169cef5118f0c14baec7c0437858d681a815be2d879ed822aacec29661` |
| `.gitignore`                                                | workspace configuration / repository              | tracked@HEAD     |   184 | `7473fbe1d04be645db38115fbcedcf319c254aa480980d4c6c513864e2ba4aed` |
| `.prettierignore`                                           | workspace configuration / repository              | tracked@HEAD     |    70 | `2b95ed5c821e5d878ed0881949ab9d0db07214e0280409ef28c539eb63095340` |
| `.prettierrc.json`                                          | workspace configuration / repository              | tracked@HEAD     |   117 | `ecce4d69812597e136934aac7c9e0c8addfed3975824eb7984658b3cf7af1d09` |
| `AGENTS.md`                                                 | agent guidance / repository                       | tracked@HEAD     |  1894 | `0e1d283cb59ccd039f52ec2bded09470210426beea4da364e911454615075060` |
| `CHANGELOG.md`                                              | governance and public docs / repository           | tracked@HEAD     |  1642 | `46e937d1360bdd0518589ad4e010eef7bbd3701b068d30d27638f46674a5916f` |
| `CLAUDE.md`                                                 | agent guidance / repository                       | tracked@HEAD     |   500 | `c3cd4c3c17542842aea1cb8221e6d9bd577f285642fb5a21467f699a4d0873e2` |
| `CODE_OF_CONDUCT.md`                                        | governance and public docs / repository           | tracked@HEAD     |   425 | `ca223ed4ac31f66e6a473e08ac4fa4cda9fd0947a10892b8683ef2890cf54088` |
| `CONTRIBUTING.md`                                           | governance and public docs / repository           | tracked@HEAD     |  1500 | `6211f48c86d8a44d5ec74b4be3aa64749299436a08de44d23440b91d57ac3ea8` |
| `DESIGN.md`                                                 | governance and public docs / repository           | tracked@HEAD     |  3107 | `9e3c9ec6068a97621f731d7e9b3ce2b772a3b3b2797a5dd5283ddaeecb90e2fe` |
| `LICENSE`                                                   | governance and public docs / repository           | tracked@HEAD     |  1071 | `f27578cb61270f6066ebdeb538de1fbaf02f1b0d719a723a38ccd4f8b99cd7a3` |
| `README.md`                                                 | governance and public docs / repository           | tracked@HEAD     |  3745 | `cf099f22800cc2b96856b6975b5b637c35ea6aa05381377d318b9488b149c726` |
| `SECURITY.md`                                               | governance and public docs / repository           | tracked@HEAD     |   945 | `7505006c3ffa6bceceb70a594c4c8bb4793bd140daf77be8eb5724fd1f86219e` |
| `apps/studio/app/(studio)/agents/page.tsx`                  | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2565 | `9051d038c8c8c018e42c336c287ec29446121881f4f627c6a02296e973db991b` |
| `apps/studio/app/(studio)/chat/demo/page.tsx`               | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   107 | `9cb8ec40dae79ef67fc7db07c1890286701c622586dcfba3742116ccd2d53900` |
| `apps/studio/app/(studio)/components/[slug]/page.tsx`       | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   844 | `f1e43626862e22baab4685b49a92f06a52715c7c9e6bada65dcc0a2e4d9678eb` |
| `apps/studio/app/(studio)/components/page.tsx`              | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2042 | `d32fedd9e21e8ce44f3fd00733cd383c1887c1ea29df9ed6a31c43d5ff3d0384` |
| `apps/studio/app/(studio)/connectors/page.tsx`              | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   116 | `f31f7aecbe6b8f116a8d2fdc7e972e8a49701668c4d81a4d9c99fae5b982cc07` |
| `apps/studio/app/(studio)/docs/cli/page.tsx`                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  3718 | `b87d95be9df756381148302d5a8e7b00ebe1bd52b0e1c013b6b66c2c2237b614` |
| `apps/studio/app/(studio)/docs/getting-started/page.tsx`    | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  3317 | `16c2f472187206dded57d2246ff3ff8bd044fedf1c0388dceb6ae5ad3b1abaf3` |
| `apps/studio/app/(studio)/docs/registry/page.tsx`           | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2175 | `813edc81ce4dbb7b605ed8194cf50969a0caa24e7b044a3b48fbca7b6c2714a2` |
| `apps/studio/app/(studio)/examples/page.tsx`                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2000 | `0fd619ed094dbba2466744b19d22a4f9f5e2eee64f223a5467da606a4849bb25` |
| `apps/studio/app/(studio)/files/page.tsx`                   | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   135 | `d534878d69dfd2c99304e8b4896f3e470c8e9f2d0db3af199b09f2062ebb2ab4` |
| `apps/studio/app/(studio)/knowledge/page.tsx`               | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   123 | `56379534f98d1d70e28938ec8bdee567fc2cfe368974daeba671a16210c38c9d` |
| `apps/studio/app/(studio)/layout.tsx`                       | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   184 | `8a4cbf07f457514238078ef4773fce3a27606b5f736760afec892ece24e289d3` |
| `apps/studio/app/(studio)/loops/page.tsx`                   | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   129 | `ac57e945d61140a094ed48abe1dd97681445d0f6d828072fb2954a8afbe58951` |
| `apps/studio/app/(studio)/page.tsx`                         | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  7947 | `bf5c2279d1b5ed7dbb285a4fdd054c4d2ca7559b19c41c6352d2617d0827b88a` |
| `apps/studio/app/(studio)/patterns/approval-gates/page.tsx` | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2311 | `4c46f71f4446789520c11a198ea29072348dee32cc36d6e56890860481da4a45` |
| `apps/studio/app/(studio)/projects/page.tsx`                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   115 | `bf01ddc064e247310f23a4b57a7c658feae2dfdc4a26916a9e2e2476f73637d1` |
| `apps/studio/app/(studio)/settings/page.tsx`                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   129 | `84e2dc7bef74fd4dc6c031559c2f9e5a7c4a401b1eb5c5d54a5659504790997f` |
| `apps/studio/app/(studio)/templates/support-agent/page.tsx` | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2440 | `ad49d0a73fdb61d6b1c7f3328d1b2c2c00a233edac7182342f83a72fce0f4168` |
| `apps/studio/app/(studio)/tools/page.tsx`                   | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2739 | `7d5482acb19be7796fa0e7503c34be5948870ae59e95d400e457dca245a982e1` |
| `apps/studio/app/globals.css`                               | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  1713 | `1898ec7ad0a94330527bc1bc5bb39de625617b306b0f7fb299a26782767a9bda` |
| `apps/studio/app/layout.tsx`                                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   825 | `326adcbc957da4060a95a86d6588b7a3e07327de82c5e9dffb092d05f545f6ba` |
| `apps/studio/app/studio/page.tsx`                           | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  1069 | `8e46f0063965aea1cf8734231181f6ea4e09dd605870fd8dca863298357e540f` |
| `apps/studio/components/catalog-shell.tsx`                  | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  2115 | `32e2cab88f3ac2169f209021d3ddd7cb9e41752de98152b4bb684d9ad15b40e3` |
| `apps/studio/components/component-detail.tsx`               | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  5364 | `369044b86e05e1bf1f48fc5eba81fde44df99a0d538bdbe583b3b05101cca18b` |
| `apps/studio/components/component-previews.tsx`             | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  3754 | `b18abb7dd700937800e542de469e703809caba00aa213d477d77fc31af8855c5` |
| `apps/studio/components/copy-command.tsx`                   | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  1070 | `300d414ff671155c9f76c00177c3a36f8836bc09ae08cc5409f03156906c8c68` |
| `apps/studio/components/demo-session.tsx`                   | docs/catalog app / @agents-sdk/site               | tracked@HEAD     | 10235 | `63331e987a6086a20a6f87a137f0d3b9b2ae3307a8cd78625a3accaf59318439` |
| `apps/studio/components/doc-page.tsx`                       | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  1732 | `43dce33d94dea47d4c3484aa254df2194a4279ddaf248db8b8f1f2179c73244b` |
| `apps/studio/components/site-shell.tsx`                     | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  3614 | `8651d7bde76b6979785559508d5bcabf7386377d1ec17ecc3fe5f0ae67f2090c` |
| `apps/studio/lib/catalog.ts`                                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  6870 | `26ec0350d6b97fda21a93d3edb6f71da82de87457d5cbde187cdc74e74edbbf0` |
| `apps/studio/lib/demo-stream.test.ts`                       | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  1491 | `c672e723789aeddf1798f301123831e109d55ba538b0c8ac411649f31400b69c` |
| `apps/studio/lib/demo-stream.ts`                            | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  7613 | `961507517a5ffe8c6b21da598118c8da7ac583e135f5665da919c5ce865c7c61` |
| `apps/studio/lib/site-content.test.ts`                      | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |  5567 | `5f72a1a2b80a30cc8a0c1707a2f7e7040828a508f251f500dc06d978ad891fbb` |
| `apps/studio/next-env.d.ts`                                 | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   247 | `7b550dda9686c16f36a17bf9051d5dbf31e98555b30d114ac49fc49a1e712651` |
| `apps/studio/next.config.ts`                                | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   268 | `3661c2ad842671a42ee7d49b4794a3972577ba26e3b26c909c67b47733a6f6f8` |
| `apps/studio/package.json`                                  | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   661 | `f818c40d937d829db1a53e73fdc9cae5fc39aebb38c79517cf818b05f3c21d7f` |
| `apps/studio/postcss.config.mjs`                            | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |    70 | `5b0bc4c78be977cd81f947fb5563aaa7cc6d451e6f1c53a3260b7656a7144d20` |
| `apps/studio/tsconfig.json`                                 | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   474 | `2e8f9b31f4216c722cd3b85c2932821f9df67050462a983f1ebe85153d8302a2` |
| `apps/studio/vitest.config.ts`                              | docs/catalog app / @agents-sdk/site               | tracked@HEAD     |   260 | `f1f4b506b0d92c117a410a2be448f4b7750dd4cac9882da3b03581b4efea9534` |
| `package.json`                                              | workspace configuration / repository              | tracked@HEAD     |  1068 | `d7857a911b4a82fa5dd52aac0f559c846ef791b138fb7527dc7d33122d21bd7f` |
| `packages/cli/.gitignore`                                   | CLI package / @agents-sdk/cli                     | tracked@HEAD     |    10 | `79bd783e4196102867d0a6f0983dde9963285d3d17341d652be5a79c9af2b1ed` |
| `packages/cli/package.json`                                 | CLI package / @agents-sdk/cli                     | tracked@HEAD     |  1388 | `0f3c55927708c9e5b5fca6937b597ee09606cd44395f34c4b7f420f76b0ce32f` |
| `packages/cli/scripts/prepare-assets.mjs`                   | CLI package / @agents-sdk/cli                     | tracked@HEAD     |   647 | `50526f10ba457167713b89f3f7957d440382933e9f2707668e0ce86fb0411383` |
| `packages/cli/src/bin.ts`                                   | CLI package / @agents-sdk/cli                     | tracked@HEAD     |   114 | `20cc769f54d12b5a734b2fa7cb108466e7cdf29ad1e5424c9d6116fda27c26dc` |
| `packages/cli/src/index.ts`                                 | CLI package / @agents-sdk/cli                     | tracked@HEAD     | 26643 | `0c8db63a23409e91a3a3c1b8020744b19404abdfd10076e025712ed22ceed241` |
| `packages/cli/tests/cli.test.ts`                            | CLI package / @agents-sdk/cli                     | tracked@HEAD     |  9506 | `0c9cabff00a569babeca5e3ab8f3d2434b7ae4207eb63bee85804dcacce63a25` |
| `packages/cli/tests/component-parity.test.ts`               | CLI package / @agents-sdk/cli                     | tracked@HEAD     |  1332 | `82512ac681ebaf7e3c2f18f844d9ad1e180a0e57dc9e3ac036ea8b6b9c1fff9f` |
| `packages/cli/tsconfig.build.json`                          | CLI package / @agents-sdk/cli                     | tracked@HEAD     |   234 | `248adfd29b5a2f91d1cc8517333e8408a75afdfe173de6b77337adf4014f6ba3` |
| `packages/cli/tsconfig.json`                                | CLI package / @agents-sdk/cli                     | tracked@HEAD     |   298 | `97319c773f81ee3fae2bb9978e2d606f9a7120ff7064e58b65c5e4643f45adbf` |
| `packages/cli/vitest.config.ts`                             | CLI package / @agents-sdk/cli                     | tracked@HEAD     |   245 | `df0db696c7898d3d3ef1d9ea1bebcbba2f5e593e7f57b2445ec5d137b1aa55d2` |
| `packages/core/package.json`                                | core contracts / @agents-sdk/core                 | tracked@HEAD     |  1078 | `ccb67f1a2655ce0524e191e765704e898d1031a12b68add82b4ee4a2da41e79d` |
| `packages/core/src/index.ts`                                | core contracts / @agents-sdk/core                 | tracked@HEAD     |    62 | `03199633f87265125c9d9dfc45cb5f7275f54c75bb9bf3e734094b2374db057d` |
| `packages/core/src/manifest.ts`                             | core contracts / @agents-sdk/core                 | tracked@HEAD     |  8441 | `bd15889ad20f33b3732e8e18448ca8da7e36b06e99e664336b15a7d8cdf06834` |
| `packages/core/src/registry.ts`                             | core contracts / @agents-sdk/core                 | tracked@HEAD     |  6089 | `31c7046910704dd6ddb666830079ea3f3e7e0461b8ff5662c070b64c42d6fa1c` |
| `packages/core/tests/manifest.test.ts`                      | core contracts / @agents-sdk/core                 | tracked@HEAD     |  3723 | `7c89502e5eaba50a3d8b44f136d8adcf92029ec97bba6af7981f58b24e230e59` |
| `packages/core/tests/registry.test.ts`                      | core contracts / @agents-sdk/core                 | tracked@HEAD     |  5186 | `4b5f0f87eb794cf00e6eb1153fc48b7a756ecc7047056c41dccbf931998daead` |
| `packages/core/tsconfig.build.json`                         | core contracts / @agents-sdk/core                 | tracked@HEAD     |   234 | `248adfd29b5a2f91d1cc8517333e8408a75afdfe173de6b77337adf4014f6ba3` |
| `packages/core/tsconfig.json`                               | core contracts / @agents-sdk/core                 | tracked@HEAD     |   266 | `4bd2524a17c16139933278924422594a5ff7b6232739bbaae190a53a49733e1d` |
| `packages/harness/package.json`                             | acceptance harness / @agents-sdk/harness          | tracked@HEAD     |  1026 | `40b747da700e41a4e1fbb43abbdecaf88c933525bd102a0579c17d8cf4c78362` |
| `packages/harness/src/index.ts`                             | acceptance harness / @agents-sdk/harness          | tracked@HEAD     |  2152 | `34260f2b46a6b781913e50b74744a18c4435bbd638a8794b0b965e6ec7f09cb2` |
| `packages/harness/tests/acceptance.test.ts`                 | acceptance harness / @agents-sdk/harness          | tracked@HEAD     |   624 | `977e72c621fd814d17133f776b810f83b61062e31e8f75b42a1ecbafce88fd2f` |
| `packages/harness/tsconfig.build.json`                      | acceptance harness / @agents-sdk/harness          | tracked@HEAD     |   234 | `248adfd29b5a2f91d1cc8517333e8408a75afdfe173de6b77337adf4014f6ba3` |
| `packages/harness/tsconfig.json`                            | acceptance harness / @agents-sdk/harness          | tracked@HEAD     |   274 | `7e7c4a5925298d95d79df6b44be268eb2fd0ab230edc668920953bf9f55468c0` |
| `packages/ui/README.md`                                     | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  1729 | `749db83903cb32eba70a055dff5e862ab82f8e8d68cabf31f2e5d1518b7a11c5` |
| `packages/ui/package.json`                                  | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  1411 | `e59ef966313e9b82afc49bd0d9b71a76a92413ac1408b5d47bfa7b7d90be1cf4` |
| `packages/ui/src/AccountPopout.tsx`                         | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  6446 | `adf3c2561cd7b4792c1926830292cc8862d7046eb57d46f622bef61f898deb33` |
| `packages/ui/src/AgentChat.tsx`                             | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  2159 | `040104e440c4fda6dd74b52d57cae1f71b4372f1441bb7d7cebed565ad0c174e` |
| `packages/ui/src/AppShell.tsx`                              | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  1058 | `c7d7aac7d740fe9c319319185295b40428a0c149439636f6a195814c7c0ce8a1` |
| `packages/ui/src/ArtifactRenderer.tsx`                      | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  7176 | `b8cfc0a65e2d5f3d35759d0a03bf01a105c0ad29815c20594d5c7f940bdb3381` |
| `packages/ui/src/ArtifactWorkspace.tsx`                     | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  2060 | `999038d5e5c64179739da9c565ead81f5a096a722a3241349c331f8f0e679799` |
| `packages/ui/src/ChatComposer.tsx`                          | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  6123 | `2b1944794bd43571f0652c117a305a35dee94b113b1cf122317ff081df50d8f4` |
| `packages/ui/src/DemoAgenticSurface.tsx`                    | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  5517 | `aa6fe8b611ad463967e341937a054007b971ae53f43639c9049fd0b841d3da66` |
| `packages/ui/src/HumanApproval.tsx`                         | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  3290 | `3331a1e6fd9b62fd0ac33ac009bfe837615a8a6a1cf68b23f781071b209184f6` |
| `packages/ui/src/IntegrationIcon.tsx`                       | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   919 | `bb02eccb70d8d922ceaa26a662cef9c70b02661868ee9b08e3f75243a04828d1` |
| `packages/ui/src/RightPane.tsx`                             | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  2937 | `d80a0edf4bf129b4d245145efe05269e9ece0a0d4d0e8b7bc1673f1cf5f84ea2` |
| `packages/ui/src/Sidebar.tsx`                               | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  9878 | `6fcef664d444631a8b9f1700e094f1af71ddfd08de739b26132f69a6e7f79925` |
| `packages/ui/src/artifact-spec.ts`                          | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  7573 | `73cb969a37b081d7b8f3f3f807f7a0b2ead56256da8dc2f4a92a9e8f0d0d9ab9` |
| `packages/ui/src/index.ts`                                  | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   449 | `eb17d2f85c9c2fffcf995e92eb001bd602fe404e8bff5c81c6505fd1f6edcc85` |
| `packages/ui/src/starter-config.ts`                         | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  2542 | `e41d08564f6ccb4af3adfdc9df512ebc2751b9e32622bc61d488f5fc17f0207f` |
| `packages/ui/src/types.ts`                                  | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  5401 | `c4580a4919ca2f081b7a5c779681af8751b630250b70166fe8504998a68b3124` |
| `packages/ui/src/utils.ts`                                  | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   525 | `327b3d258e0fa8b5265f7498889225f20f31bc3e1115ae88a7e0e794486a35db` |
| `packages/ui/tests/artifact-spec.test.ts`                   | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |  1724 | `45890e599d291aa8ecc9d0b2f1d404d40c48f2ec7174d8532567574999328ed2` |
| `packages/ui/tests/exports.test.ts`                         | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   376 | `7493ac59af093fbbf9e541532603c90973c57734fb8b4983345cd5a71335b64a` |
| `packages/ui/tsconfig.build.json`                           | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   258 | `1026415cc71209aa2fa3804a046c76f47645b84aa8d5062a60a95e92fa376eba` |
| `packages/ui/tsconfig.json`                                 | UI primitives / @agents-sdk/ui                    | tracked@HEAD     |   280 | `0f562f5a2e3cbd407d6f5bed2941ea7c7565fb4a199b89bd569822ac5cb45761` |
| `pnpm-lock.yaml`                                            | workspace configuration / repository              | tracked@HEAD     | 90612 | `a5f99f60a7c9d4e2dca1a0b8a3971ff7066c7cbf9936a65505792e98c602a5d0` |
| `pnpm-workspace.yaml`                                       | workspace configuration / repository              | tracked@HEAD     |    73 | `1d0512e08b76cfc173efdf950560dda415c8afe9430d801fa2d0618b8bf5fe87` |
| `project-context/ACCEPTANCE.md`                             | canonical project context / repository            | tracked@HEAD     |  3737 | `1a3102c5a609e60f550ce06c165f48479f0c1908c786bfd15c8e5b9676fac14b` |
| `project-context/ARCHITECTURE.md`                           | canonical project context / repository            | tracked@HEAD     |  3663 | `e203d046941349385734760d87a7be6d0f24a04c72be3a8a0fceedf4ee3a8cd3` |
| `project-context/CURRENT_STATE.md`                          | canonical project context / repository            | tracked-modified |  4845 | `2da5b051131270e1670b26ef024b4b62a0257d1ce6cc8b4291a92493ecd86e0c` |
| `project-context/DECISIONS.md`                              | canonical project context / repository            | tracked-modified |  2720 | `c6c0423009e4779931f9b023d94fa7600b0cb363d121e245c1b9351aafc49313` |
| `project-context/DESIGN.md`                                 | canonical project context / repository            | tracked@HEAD     |   564 | `10e57c617c3a921e02fb35b11f014a8e73fecfb8e2a90aeca9a07dc44a45321a` |
| `project-context/ROADMAP.md`                                | canonical project context / repository            | tracked@HEAD     |  1555 | `ca1022c310033d899c78117a684651429141aff269302958ac0e7572d9ddd026` |
| `project-context/STACK.md`                                  | canonical project context / repository            | tracked@HEAD     |  1412 | `8267b297370ae829ca1d5fbca580bdddff1ea0733f20ab0e68ed6a3a7f28f901` |
| `project-context/VISION.md`                                 | canonical project context / repository            | tracked@HEAD     |  1621 | `a25c6af27b6b979d9efc2929bd75536162ce2a91f4798352076c511ecc1c0369` |
| `project-context/braindump.json`                            | canonical project context / repository            | tracked@HEAD     |  1635 | `b44ffe401cf0e359794777ee18ed45b33afa92d5518bfe28e16680885d2feb55` |
| `project-context/plan.md`                                   | canonical project context / repository            | tracked-modified |  5285 | `04c9edca9ba0d9fb9d0c59a8754908ea3d62a421015ae1b03c1a295c1d4c27b0` |
| `project-context/prompts.md`                                | canonical project context / repository            | tracked-modified |  9245 | `2a837c58d9f2b1c86127fa0d27f0c86b1a5466232de930803cf44df445cb6130` |
| `project-context/provenance.md`                             | canonical project context / repository            | tracked-modified |  6974 | `a2769da4b6a401c7ecdde0f0f23b7814ee11bf710b0a3dc47bbecffb0473e194` |
| `project-context/tasks.json`                                | canonical project context / repository            | tracked@HEAD     | 10912 | `70c746f43b9547f6f223ba8fef8561ce44916f4fad8e850d819d039a65dc2cd0` |
| `project-context/tasks.md`                                  | canonical project context / repository            | tracked@HEAD     |  4946 | `e56b6c01ba8236f3ee62477b079b743a3f7144393ee150369e9cb480705108a5` |
| `project-context/you.md/CONVENTION.md`                      | canonical project context / repository            | tracked@HEAD     |   451 | `719c91e7bcc3902aeebe83b65ac9a8c2ab828cd3df9699e26b8b51b857c5d27f` |
| `project-context/you.md/log.md`                             | canonical project context / repository            | tracked@HEAD     |   782 | `57e3eb8a4e9dc65b2e889a1cb1350036003cb450a0df5cd85e296c2e1c561bf9` |
| `registry/README.md`                                        | registry documentation / Agents SDK registry      | tracked@HEAD     |   312 | `1cb01c9514c52f10bdd1ee7b55668faf1f1ef21da65acb5dd5b280b8a5a24b39` |
| `registry/index.json`                                       | registry manifest / Agents SDK registry           | tracked@HEAD     |   760 | `b2aae92e1fef367ffaacce838cb75d97c7a1fe25929a9a57a6e4fd38161bc81b` |
| `registry/items/agent-chat.json`                            | registry manifest / Agents SDK registry           | tracked@HEAD     |  1914 | `c38a5383ef38a49ea14185bebc47bf8ada211bc1d51f0cadc90e97dc7f810c4f` |
| `registry/items/approval-flow.json`                         | registry manifest / Agents SDK registry           | tracked@HEAD     |  1834 | `f6665bb3f6519f90b033102cbac042bb376d4f16734e056bfae8fcf1380a2c11` |
| `registry/items/approval-gates.json`                        | registry manifest / Agents SDK registry           | tracked@HEAD     |  1877 | `90d18fadd66b57ca007016538fde490bfd779d6b4744a84abde7fef99f9370bc` |
| `registry/items/artifact-flow.json`                         | registry manifest / Agents SDK registry           | tracked@HEAD     |  1836 | `748580520ffbe553127707a4e4e2b54cde4253875a773573a40366675bcaf79d` |
| `registry/items/artifact-workspace.json`                    | registry manifest / Agents SDK registry           | tracked@HEAD     |  2028 | `02b2cac40dbefa82e18f363601d0be907e1474271322badc3f0ce8215e962e8e` |
| `registry/items/human-approval.json`                        | registry manifest / Agents SDK registry           | tracked@HEAD     |  2029 | `ad9c6c28dfcf309ee9348a7d74040dfe40ea0166e4b463fb5418cdd3da0d434f` |
| `registry/items/support-agent.json`                         | registry manifest / Agents SDK registry           | tracked@HEAD     |  4408 | `9821ee805ed723e67d5324bb11f21759bc30ebf0ca3977781a00e22f73644aae` |
| `registry/sources/components/agent-chat.md`                 | installable registry source / Agents SDK registry | tracked@HEAD     |  1485 | `d6adc4d353dbdc65e45504a850a8cde11475c05872f87cbfbf063bd6f240b0e7` |
| `registry/sources/components/agent-chat.test.tsx`           | installable registry source / Agents SDK registry | tracked@HEAD     |   695 | `b9f5461879b758edd573c29a1defd388a14f42805a5d9fe6556e6a549ad9bf48` |
| `registry/sources/components/agent-chat.tsx`                | installable registry source / Agents SDK registry | tracked@HEAD     |  2239 | `09ab90ee2401a856f48bd7f3ec16e078c3f9b420f3ed97a829501413b9ac17f0` |
| `registry/sources/components/artifact-workspace.md`         | installable registry source / Agents SDK registry | tracked@HEAD     |  1439 | `bfee4e8934b4800b8c65513f597c2221ed73f4e82c49787cceba5d087ab1aec2` |
| `registry/sources/components/artifact-workspace.test.tsx`   | installable registry source / Agents SDK registry | tracked@HEAD     |   609 | `8745df21e1aad81a3a1d777d3f527bdf465ab5a4b6b629791edea37b71e3fa5e` |
| `registry/sources/components/artifact-workspace.tsx`        | installable registry source / Agents SDK registry | tracked@HEAD     |  2135 | `b512ab71d63aaec57f8832825ad6e9befaf635a2afe7c7ed6805c15df4cf3fdd` |
| `registry/sources/components/human-approval.md`             | installable registry source / Agents SDK registry | tracked@HEAD     |  1447 | `b14647c1d2af9d8010c93de0cfdd079b7405086e25ec725d87d0133bfb7fcf93` |
| `registry/sources/components/human-approval.test.tsx`       | installable registry source / Agents SDK registry | tracked@HEAD     |   611 | `e4f5aa04f6577677e13f82815bf30348331cd8633f5aec197b545c6132a65da6` |
| `registry/sources/components/human-approval.tsx`            | installable registry source / Agents SDK registry | tracked@HEAD     |  3328 | `c969d4633633ef90e530b7dfca5e56cb5a994945e29072a59d6b9cc8a90e0bb6` |
| `registry/sources/examples/approval-flow.md`                | installable registry source / Agents SDK registry | tracked@HEAD     |   507 | `054ec76921cff7099632b226a78f194fae2859bff2e7bfe42a891a981023be56` |
| `registry/sources/examples/approval-flow.test.ts`           | installable registry source / Agents SDK registry | tracked@HEAD     |   538 | `cc22cf60d8e251ad96054e15a7eafd43242b9680b065e8e3f058fd29d3985d4d` |
| `registry/sources/examples/approval-flow.ts`                | installable registry source / Agents SDK registry | tracked@HEAD     |   338 | `19e4a5bc494fc4dc609c8e4f6c6ae97884394f933faedc8a06d482fdc34d7432` |
| `registry/sources/examples/artifact-flow.md`                | installable registry source / Agents SDK registry | tracked@HEAD     |   496 | `e59c3a20239e8e6531ae1f2c53ad3b4aefc50a18592522fb00d1d9ee440ed4f9` |
| `registry/sources/examples/artifact-flow.test.ts`           | installable registry source / Agents SDK registry | tracked@HEAD     |   322 | `7e8ee8d19d9b7c5c6e689fef416f918ae53534386210f922fde10be930b3a357` |
| `registry/sources/examples/artifact-flow.ts`                | installable registry source / Agents SDK registry | tracked@HEAD     |   613 | `e8a29a08535f59e311c7342eca70d672a584f2de1ee43845b7eb9754e72788e1` |
| `registry/sources/patterns/approval-gates.md`               | installable registry source / Agents SDK registry | tracked@HEAD     |   963 | `c98747c965aad2c57da84dcc158bb580e821e6fbe9d4dab20310ecadbea38bfa` |
| `registry/sources/patterns/approval-gates.test.ts`          | installable registry source / Agents SDK registry | tracked@HEAD     |  1322 | `6e4573f522f7389a0aeb744dd2287c8b1e6decf4c449a7cd4482080a278e13ea` |
| `registry/sources/patterns/approval-gates.ts`               | installable registry source / Agents SDK registry | tracked@HEAD     |  1283 | `df862f0e5d69e1a85aafbc4c54dd72b7212df664ba45db9c69b818ae7941a06c` |
| `schemas/agent-project.schema.json`                         | JSON contract / Agents SDK schemas                | tracked@HEAD     |  7968 | `957dbda5b227042de660f56bf032e9bb0ac31475945217bb18203151b7328912` |
| `schemas/agents-sdk.schema.json`                            | JSON contract / Agents SDK schemas                | tracked@HEAD     |  2064 | `9596eab83dc27bf9dc7cbd965b09a818b9b8393d957ca0f7709225578adf4705` |
| `schemas/registry-index.schema.json`                        | JSON contract / Agents SDK schemas                | tracked@HEAD     |   820 | `316a4eb82239f98ef660a02332c4e36c4597084e9c3048b48b30b2077239ce97` |
| `schemas/registry-item.schema.json`                         | JSON contract / Agents SDK schemas                | tracked@HEAD     |  3860 | `f7fa27a8c6f63d6b948d2f7b7d32119bd8e4b722512dc0abfd9b572cb85b62d6` |
| `templates/support-agent/.env.example`                      | runnable template / Support Agent                 | tracked@HEAD     |    16 | `a6fa3fba3845bda1b64b03eb365c97d2b87b402303e01aa912f93a71e2475126` |
| `templates/support-agent/README.md`                         | runnable template / Support Agent                 | tracked@HEAD     |  1342 | `4ed7d8ba61a30d6ce8e635e847a1b86b9923f64af9fe0b11e16126f3531c1a3a` |
| `templates/support-agent/agent-project.json`                | runnable template / Support Agent                 | tracked@HEAD     |  2130 | `2d0bced4d8b49686e30443e40516bcd9ea3f0f839a2c8ad164e58f50cb275b10` |
| `templates/support-agent/index.html`                        | runnable template / Support Agent                 | tracked@HEAD     |   300 | `fe1bbfd22bf5d58f0e2b417fa03e855827d94c4c90575b0118f9a5a65ffc94c6` |
| `templates/support-agent/package.json`                      | runnable template / Support Agent                 | tracked@HEAD     |   753 | `f530bd0af1b268ea43f296c98b905270d2bcbccc291e781316b70abfeadb920c` |
| `templates/support-agent/src/App.tsx`                       | runnable template / Support Agent                 | tracked@HEAD     |  3003 | `e96bb4a972781695fbac22ff0140bc4d7a37135163834bfdbe2a2e3761bdc6e1` |
| `templates/support-agent/src/agent-adapter.ts`              | runnable template / Support Agent                 | tracked@HEAD     |   677 | `211d65aeb14932b55b02023f3f0ad9e9fbc6c49a0c5d4c8d2f4bbad538b252d3` |
| `templates/support-agent/src/agent.ts`                      | runnable template / Support Agent                 | tracked@HEAD     |   958 | `51ffdadd6c7e77731e7080f891df8b0203d6fb319d5d34df19531e5f73b55197` |
| `templates/support-agent/src/main.tsx`                      | runnable template / Support Agent                 | tracked@HEAD     |   236 | `a6bcae9c4f04d6ff36406b2966379834342b41b08b83ba7bd0334712d6cf87f0` |
| `templates/support-agent/src/styles.css`                    | runnable template / Support Agent                 | tracked@HEAD     |   165 | `ec272b4bfe5c3a115600df5c43fde6af4f6a713445b7561756bfaddd137706a4` |
| `templates/support-agent/src/support-data.ts`               | runnable template / Support Agent                 | tracked@HEAD     |   210 | `280a703f0c606ac21e8f4923c74ffe2b004598d9dfc2bb3624d55f9abb00fe38` |
| `templates/support-agent/src/support-flow.ts`               | runnable template / Support Agent                 | tracked@HEAD     |   973 | `64c4d28dbe23be1a4119fe265beb66f76a845ecb93d3dec2575fd4c62efb2695` |
| `templates/support-agent/tests/agent-adapter.test.ts`       | runnable template / Support Agent                 | tracked@HEAD     |   409 | `c59a0ef98ad5c0f399c9e43b48dffae154930189d3048ca561f94598335713da` |
| `templates/support-agent/tests/app-composition.test.tsx`    | runnable template / Support Agent                 | tracked@HEAD     |   499 | `ae4d6fab52606bba1f73db290429304b2b8570488ffb6fe65235ab73e30329f2` |
| `templates/support-agent/tests/support-data.test.ts`        | runnable template / Support Agent                 | tracked@HEAD     |   321 | `0f9d4e66dd5173161e98a13ffb4e7bdfdeed5f01357d968bd155ff95dc86fe63` |
| `templates/support-agent/tests/support-flow.test.ts`        | runnable template / Support Agent                 | tracked@HEAD     |   445 | `33f263d1fd26bfcaf912c6fd2f5f5b395ca32af557ed57d83759fd45d5d1b4c4` |
| `templates/support-agent/tsconfig.json`                     | runnable template / Support Agent                 | tracked@HEAD     |   278 | `e2adb67c0087c210a19978e1a7bea9d79994b736c0fd67fc7179cfe79a56d3a7` |
| `templates/support-agent/vite.config.ts`                    | runnable template / Support Agent                 | tracked@HEAD     |   193 | `22cccd2e452411b0fc755e07660eeded0d536f464d231511b86370116249804a` |
| `tsconfig.base.json`                                        | workspace configuration / repository              | tracked@HEAD     |   451 | `fc47dfb5a5aa5d82855b06b564a9ee3156bbc5f5cc7353210497e9fe568b03f8` |
| `youstack.json`                                             | portable project catalog / You.md overlay         | tracked@HEAD     |  3877 | `d723d88738cdef86b855d713b9a2c24c8183861f38e2080647630241dc8f603f` |

## Per-file manifest: 10 intentional audit artifacts

Files `00` through `08` were hashed immediately before this manifest was created.

| Path                                                                                                | Classification / owner          | Tracked state         | Bytes | SHA-256                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------- | ----: | ------------------------------------------------------------------ |
| `project-context/audits/2026-07-15-full-project-handoff/00-README.md`                               | handoff evidence / audit bundle | untracked-intentional | 15305 | `1b60b77d90ee570e3cb2715a9360c5efa3d2c74cb79e64d3d4e8ee02e5380263` |
| `project-context/audits/2026-07-15-full-project-handoff/01-EXECUTIVE-SUMMARY.md`                    | handoff evidence / audit bundle | untracked-intentional | 15346 | `09017848e02a465f24239b67d146a05b91eb3234f11d213eac1de58834cb93c4` |
| `project-context/audits/2026-07-15-full-project-handoff/02-CHAT-TRANSCRIPT.md`                      | handoff evidence / audit bundle | untracked-intentional | 61606 | `031ab556251977974591ba287574cb8df6a524cfe9461f09631b53a4aa7fd21d` |
| `project-context/audits/2026-07-15-full-project-handoff/03-WORKING-LOG.md`                          | handoff evidence / audit bundle | untracked-intentional | 30721 | `b4ac1a843ec2bd8e8244360fa428d59109199fa78640adcdf23a512cf9e91fb9` |
| `project-context/audits/2026-07-15-full-project-handoff/04-DOCUMENTATION-INVENTORY.md`              | handoff evidence / audit bundle | untracked-intentional | 29840 | `f4aa73b9c25decd9744698e96ecf8b4c463a6b59f8d496b9c175f5f5d8753c57` |
| `project-context/audits/2026-07-15-full-project-handoff/05-CODEBASE-INVENTORY.md`                   | handoff evidence / audit bundle | untracked-intentional | 27404 | `22cd77028a3c58e013b2addc50b65ac655431722168c9679d0cff0ab79b935eb` |
| `project-context/audits/2026-07-15-full-project-handoff/06-DECISIONS-STATUS-AND-SOURCE-OF-TRUTH.md` | handoff evidence / audit bundle | untracked-intentional | 25809 | `93f004554f45a14176b4a572a8159957d9f8fd55e7ec54710e87a620570d6e6e` |
| `project-context/audits/2026-07-15-full-project-handoff/07-RISKS-GAPS-AND-NEXT-WORK.md`             | handoff evidence / audit bundle | untracked-intentional | 19514 | `19044a8106654f7a6697f82604b91c66195aa18953ff59e2c8b739915335713a` |
| `project-context/audits/2026-07-15-full-project-handoff/08-PATH-MIGRATION-AND-CODE-CUSTODY.md`      | handoff evidence / audit bundle | untracked-intentional | 17888 | `d5cc596c14897efd212682e898132944119dcceddcc673dd95ff7c78de815666` |
| `project-context/audits/2026-07-15-full-project-handoff/09-REPOSITORY-FILE-MANIFEST.md`             | handoff evidence / audit bundle | untracked-intentional |  self | _omitted: circular self-reference_                                 |

## Per-file manifest: 29 untracked collision files

These paths are noncanonical even when they contain useful older work. They must be compared with their tracked base paths and reconciled deliberately; they must not be bulk-added.

| Path                                             | Classification / owner                          | Tracked state       | Bytes | SHA-256                                                            |
| ------------------------------------------------ | ----------------------------------------------- | ------------------- | ----: | ------------------------------------------------------------------ |
| `AGENTS 2.md`                                    | legacy/collision context or docs / noncanonical | untracked-collision |  1045 | `20dfbb3409f4f3bf9c66982b071c7ba9b7b60924a1c82abc2a342ad5de85b38d` |
| `CHANGELOG 2.md`                                 | legacy/collision context or docs / noncanonical | untracked-collision |   618 | `fc19f8f9ae50a44844996ad11e43a1e0094f91cb1d0af6e4364a5e058c89e9b2` |
| `CLAUDE 2.md`                                    | legacy/collision context or docs / noncanonical | untracked-collision |   405 | `1427c48e96b0632320f2c928a35df56db04db53fc72d97eef4fb30bcd2772705` |
| `CODE_OF_CONDUCT 2.md`                           | legacy/collision context or docs / noncanonical | untracked-collision |   375 | `13fb5812a6ff4afa1601b86c2099d2d1ad57aac3ef8d69c95e49aa147fff8ac7` |
| `CONTRIBUTING 2.md`                              | legacy/collision context or docs / noncanonical | untracked-collision |   648 | `7169245f4c57751ff689a64028f78c53d973370424d82026649cc6d0e5cf24d6` |
| `README 2.md`                                    | legacy/collision context or docs / noncanonical | untracked-collision |  2954 | `ce38741f08fa0a7cc9bef0317ab8411bff974ac036fee79d5c4d83fe9c478001` |
| `SECURITY 2.md`                                  | legacy/collision context or docs / noncanonical | untracked-collision |   604 | `2414deac533358f070e397d9b9b0aa51532dec6fc6a913a56abdbd21da29b88e` |
| `apps/studio/app/(studio)/connectors/page 2.tsx` | collision application source / noncanonical     | untracked-collision |  1186 | `d884b2c0b8884e735c67e4e596003a009db12e3a0248141e34c56dba5de54399` |
| `apps/studio/app/(studio)/files/page 2.tsx`      | collision application source / noncanonical     | untracked-collision |  1161 | `f1987cd7db3ee5c4368f2459f54ada91a30038b6d26f5a8bd53adae68f2edd3f` |
| `apps/studio/app/(studio)/knowledge/page 2.tsx`  | collision application source / noncanonical     | untracked-collision |  1180 | `d76116d773d0dbd83f904d67fa14aecef6f2e0301c2171b2590243bd1653150e` |
| `apps/studio/app/(studio)/loops/page 2.tsx`      | collision application source / noncanonical     | untracked-collision |  1153 | `8d3274e6508c7fb77ae45d2e8a4324674408a9862a30c16202723f3746da3f2a` |
| `apps/studio/app/(studio)/page 2.tsx`            | collision application source / noncanonical     | untracked-collision |   114 | `d0bd95f1569f096ea9f6f3d2fb59ca3913ee715811598e7d15b58672367baa59` |
| `apps/studio/app/(studio)/projects/page 2.tsx`   | collision application source / noncanonical     | untracked-collision |  1199 | `804086ab7113a73e557672d380ccf188a96a92c4e8e170b51d88ff13fb558447` |
| `apps/studio/app/(studio)/settings/page 2.tsx`   | collision application source / noncanonical     | untracked-collision |  1177 | `98e315912a69fce3a7dfcc86299b061ca7b47f352e1a4ccb632c5c435def22df` |
| `packages/cli/src/index 2.ts`                    | collision application source / noncanonical     | untracked-collision | 12002 | `2ed3f2832177e269afe9d7d38c766e4dacc51a9c371063f091dd87446c71c2ea` |
| `packages/cli/tests/cli.test 2.ts`               | collision test source / noncanonical            | untracked-collision |  5144 | `38e3cc5fce572c6ab0dfa0572456badd25d7dc3913bfd395d432aa3d78d7ad68` |
| `project-context/ACCEPTANCE 2.md`                | legacy/collision context or docs / noncanonical | untracked-collision |  2717 | `90b63eb206fbea58bbac1c5d2d41b879b9028d2b23ab91ff321cfce74260caf6` |
| `project-context/ARCHITECTURE 2.md`              | legacy/collision context or docs / noncanonical | untracked-collision |  3887 | `0db29a13b34f2e447ab99b3a1b78ccffd4ef5457a10ebbf5376bc0eb82ec294f` |
| `project-context/CURRENT_STATE 2.md`             | legacy/collision context or docs / noncanonical | untracked-collision |  3394 | `cce961d0fa9f4659b2b19cfe41452af0c507d1c9c0be0276a0d87064588119d1` |
| `project-context/DECISIONS 2.md`                 | legacy/collision context or docs / noncanonical | untracked-collision |  1090 | `1d246f9c1c4d9cbc90a0f2b74b2936b36718df392b7deed0ab5f035418722d6c` |
| `project-context/DESIGN 2.md`                    | legacy/collision context or docs / noncanonical | untracked-collision |   945 | `e98b87dae1b84661ad646f2e76654413cbe0da1de95435ef21246dc4faa73e92` |
| `project-context/ROADMAP 2.md`                   | legacy/collision context or docs / noncanonical | untracked-collision |  1805 | `5df2f7a79a00fc4f9daac17beb34846d0bfaa60876abdcee7c88a2bc96f00196` |
| `project-context/STACK 2.md`                     | legacy/collision context or docs / noncanonical | untracked-collision |   944 | `5de0256e258011ab65be6ae4913d22fe254b938091b5b47c60ae12c653b5e346` |
| `project-context/VISION 2.md`                    | legacy/collision context or docs / noncanonical | untracked-collision |  1008 | `c10d3756d00a00d83c1e8a1f986b15516927379a05af78a686dab63532102fb7` |
| `project-context/braindump 2.json`               | legacy/collision context or docs / noncanonical | untracked-collision |  2057 | `2aeb05446e69cb2242a6d7801e62d514e994c06018e945da4d8fe2d1f708f484` |
| `project-context/plan 2.md`                      | legacy/collision context or docs / noncanonical | untracked-collision |  4752 | `0b454dd2b6913c435a95b1f9bc3fc9749838caaa449aad2cd78788e7e8ffc69e` |
| `project-context/tasks 2.json`                   | legacy/collision context or docs / noncanonical | untracked-collision |  3728 | `3c2c9cec68feb834c11e4f7e1e1de1c3371860d794b49dffc2d0d5388de43c36` |
| `project-context/tasks 2.md`                     | legacy/collision context or docs / noncanonical | untracked-collision |  2192 | `1e2ecbb0fa0b49b15cd9ee61b8c67cf74b5ce545cf573f579dbfe8fc4ace640a` |
| `youstack 2.json`                                | legacy/collision context or docs / noncanonical | untracked-collision |  3437 | `6bc3f92a3e283f756c1d8542b034115fde834f110ca3e0326db623f7008ef744` |

## Per-file manifest: 9 generated CLI documentation mirrors

These ignored files are recreated by `packages/cli/scripts/prepare-assets.mjs`. Each measured digest matches its canonical source under `registry/` or `templates/`. They are evidence of the packaging layout, not authoring sources.

| Path                                                             | Classification / owner                               | Tracked state     | Bytes | SHA-256                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------- | ----------------- | ----: | ------------------------------------------------------------------ |
| `packages/cli/registry/README.md`                                | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |   312 | `1cb01c9514c52f10bdd1ee7b55668faf1f1ef21da65acb5dd5b280b8a5a24b39` |
| `packages/cli/registry/sources/components/agent-chat.md`         | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |  1485 | `d6adc4d353dbdc65e45504a850a8cde11475c05872f87cbfbf063bd6f240b0e7` |
| `packages/cli/registry/sources/components/artifact-workspace.md` | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |  1439 | `bfee4e8934b4800b8c65513f597c2221ed73f4e82c49787cceba5d087ab1aec2` |
| `packages/cli/registry/sources/components/human-approval.md`     | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |  1447 | `b14647c1d2af9d8010c93de0cfdd079b7405086e25ec725d87d0133bfb7fcf93` |
| `packages/cli/registry/sources/examples/approval-flow.md`        | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |   507 | `054ec76921cff7099632b226a78f194fae2859bff2e7bfe42a891a981023be56` |
| `packages/cli/registry/sources/examples/artifact-flow.md`        | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |   496 | `e59c3a20239e8e6531ae1f2c53ad3b4aefc50a18592522fb00d1d9ee440ed4f9` |
| `packages/cli/registry/sources/patterns/approval-gates.md`       | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |   963 | `c98747c965aad2c57da84dcc158bb580e821e6fbe9d4dab20310ecadbea38bfa` |
| `packages/cli/registry/templates/support-agent/README.md`        | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |  1342 | `4ed7d8ba61a30d6ce8e635e847a1b86b9923f64af9fe0b11e16126f3531c1a3a` |
| `packages/cli/registry/templates/support-agent/index.html`       | generated CLI documentation mirror / @agents-sdk/cli | ignored-generated |   300 | `fe1bbfd22bf5d58f0e2b417fa03e855827d94c4c90575b0118f9a5a65ffc94c6` |

## Exclusion rules

The manifest deliberately excludes:

- `.git/**` object files, refs, reflogs, indexes, hooks, and internal worktree metadata from per-file hashing; branch/HEAD/worktree facts are recorded instead;
- `node_modules/**` and all third-party package documentation/source;
- `apps/studio/.next/**`, package/template `dist/**`, `coverage/**`, caches, logs, and temporary files;
- `.DS_Store` and other operating-system metadata;
- secret-bearing files such as `.env.local`, credential stores, tokens, cookies, and private key material;
- unrelated external repositories and machine-global skills/stacks;
- physical files in the external ADIL linked checkout; its ref and custody are recorded without duplicating its own manifest;
- ignored generated CLI registry files other than the requested nine Markdown/HTML mirror paths. Their canonical manifests, source, tests, and template files already appear among the 171 tracked rows and can be reproduced by the asset preparation script.

The tracked safe placeholder `templates/support-agent/.env.example` is included because it is versioned, contains only a key name with no secret value, and is part of the runnable template contract.

## Count method and commands

Run from the canonical repository root:

```bash
git ls-files | wc -l

find project-context/audits/2026-07-15-full-project-handoff \
  -maxdepth 1 -type f -name '0[0-9]-*.md' -print | sort

find . \
  \( -path './node_modules' -o \
  -path './apps/studio/.next' -o \
  -path './packages/cli/dist' \) -prune -o \
  -type f -name '* 2.*' -print | sort

find packages/cli/registry -type f \
  \( -name '*.md' -o -name '*.html' \) -print | sort
```

Expected counts at this snapshot are `171`, `10`, `29`, and `9`.

Per-file values were measured with:

```bash
stat -f '%z' <path>
shasum -a 256 <path>
```

## Manifest verification procedure

1. Verify repository identity and worktrees:

```bash
cd /Users/houstongolden/Desktop/CODE_2025/agents-sdk
test "$(git rev-parse --show-toplevel)" =   "/Users/houstongolden/Desktop/CODE_2025/agents-sdk"
test "$(git rev-parse HEAD)" =   "9c7f1f918ad1679a1d2e85db57582b5d363ad21d"
git worktree list --porcelain
git fsck --no-progress --connectivity-only
```

2. Verify the tracked path count and the five intentional canonical context edits:

```bash
test "$(git ls-files | wc -l | tr -d ' ')" = "171"
git diff --name-only | LC_ALL=C sort
```

The expected modified tracked paths are `project-context/CURRENT_STATE.md`, `project-context/DECISIONS.md`, `project-context/plan.md`, `project-context/prompts.md`, and `project-context/provenance.md`. Any additional tracked edit requires a new manifest or an explicitly versioned delta.

3. Recompute the tracked aggregate:

```bash
git ls-files |
while IFS= read -r path; do
  hash="$(shasum -a 256 "$path" | awk '{print $1}')"
  printf '%s  %s\n' "$hash" "$path"
done |
LC_ALL=C sort |
shasum -a 256
```

Expected result:

```text
4e2b67ab6e3cd4b2c3df710b0cd7ca018baa5e968efe16cabea7c1bc9e12f057
```

4. Recompute any subset aggregate with the same sorted `hash  path` algorithm. Preserve repository-relative path spellings, including spaces in collision filenames.

5. Verify individual rows when custody matters:

```bash
stat -f '%z' -- '<path>'
shasum -a 256 -- '<path>'
git ls-files --error-unmatch -- '<path>'
git check-ignore -v -- '<path>'
```

Use `git ls-files --error-unmatch` for tracked rows, `git status --short --untracked-files=all` for audit/collision rows, and `git check-ignore -v` for generated rows.

6. Confirm the collision set remains quarantined:

```bash
test "$(
  find . \
    \( -path './node_modules' -o \
    -path './apps/studio/.next' -o \
    -path './packages/cli/dist' \) -prune -o \
    -type f -name '* 2.*' -print |
  wc -l |
  tr -d ' '
)" = "29"
```

A lower count is valid only after a documented reconciliation. A higher count requires investigation.

7. Run final repository and handoff checks:

```bash
git diff --check
pnpm format:check
rg -n --hidden   --glob '!node_modules/**'   --glob '!apps/studio/.next/**'   '(API[_-]?KEY|SECRET|TOKEN|PASSWORD).*=.+'   project-context/audits
```

The secret scan is heuristic and does not authorize printing any discovered value. Inspect findings safely, redact false-positive examples if necessary, and never add live credentials to the audit.

The complete `pnpm validate` run passed with the 29 collision files temporarily quarantined and restored afterward. An initial unquarantined run failed because `packages/cli/src/index 2.ts` imports the superseded `@agenty/core` name; this is collision evidence, not a canonical source failure. Future full validation must use the documented reversible quarantine or reconcile the collision set first. Generated `packages/cli/dist/* 2.*` files are excluded as disposable `dist` output.

## Custody interpretation

- `tracked@HEAD` is canonical repository content byte-identical to the stated commit.
- `tracked-modified` is an intentional canonical handoff edit whose current bytes and hash are recorded here but are not yet in HEAD.
- `untracked-intentional` is new handoff evidence intended for deliberate review and staging.
- `untracked-collision` is quarantined, noncanonical work that requires content reconciliation.
- `ignored-generated` is reproducible packaging output whose authoring source is tracked elsewhere.
- A matching digest proves byte identity at the measured path; it does not prove correctness, licensing, security, or release readiness.
- This file cannot hash itself without changing its own digest. Its path and custody are recorded, while commit/tree identity should provide the final durable hash after the audit bundle is reviewed and committed.
