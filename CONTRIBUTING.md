# Contributing

Thank you for contributing to this independently maintained open-source project in [splincode-taiga-labs](https://github.com/splincode-taiga-labs). This is **not** an official Taiga UI or Pineopticone repository.

## Before opening a pull request

1. Search existing issues and pull requests. For a major API change, propose the approach in an issue before implementation.
2. Keep changes focused and document user-facing behavior. Add or update relevant tests where the repository provides a test setup.
3. Run the applicable lint, typecheck, build, and test commands documented in the project's README and package configuration.
4. Describe the purpose of the change, compatibility considerations, verification performed, and any remaining limitations.
5. Keep PR discussion respectful and technical. Maintainers may request changes or decline work that does not fit the project's scope.

## Licensing and ownership

The project uses the [MIT License](LICENSE) for original code its rightsholders are entitled to license, subject to separate third-party terms and notices. By intentionally submitting an original contribution for inclusion, you confirm that you have the necessary rights and authorize its distribution under the applicable project license.

**No copyright assignment is requested.** A pull request, DCO sign-off, or merge does not by itself transfer your copyright to the maintainers or to Taiga UI / Pineopticone. Existing independent agreements and applicable law may still affect ownership.

Only contribute work that you have the right to share. In particular:

- Do not submit confidential code, internal documents, trade secrets, or assets from an employer or client without permission.
- If a contribution was created as part of paid work or jointly authored, verify the relevant permissions before submitting it.
- Identify substantial code or assets copied/adapted from other projects, link to their source and license, and preserve required notices. An MIT repository does **not** automatically make third-party material MIT-licensed.
- Do not add unlicensed third-party images, logos, icons, fonts, or proprietary design resources.
- Do not imply that this project is officially endorsed by Taiga UI, Pineopticone, or their owners. Product and trademark names may be used to describe compatibility, subject to applicable rules.

See [COPYRIGHT.md](COPYRIGHT.md) for further details about attribution, provenance, and independence.

## Developer Certificate of Origin (DCO)

Please sign off your new commits using the [Developer Certificate of Origin 1.1](https://developercertificate.org/). This records that you have the right to submit the contribution under its applicable license; it is **not** a contributor license agreement (CLA) or a transfer of ownership.

```sh
git commit -s -m "fix: describe the change"
```

The commit will include a `Signed-off-by: Your Name <your-email>` trailer. Use an identity you are authorized to represent. Do not sign on someone else's behalf. If commits are squashed, preserve applicable sign-off trailers where possible.

This policy applies to new contributions; it does not retroactively impose a DCO on historical commits. Automated DCO enforcement is not configured by this document.

## Compatibility and independence

Contributions should prefer documented public APIs and local, versioned dependencies over copying upstream implementation details. Keep project release credentials, npm publishing, documentation, and CI configuration under the control of this project's maintainers.

Third-party dependencies, upstream code, trademarks, and any earlier releases continue to have their own legal terms, which this contribution policy does not change.
