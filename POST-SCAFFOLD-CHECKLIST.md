# Post-scaffold checklist

The scaffold automated everything that needs no credentials and no
purchases. These steps need your hand, once.

- [ ] **Claim the npm name**: build the package and publish a placeholder
      version by hand from your machine (`0.0.1`, `npm publish <dist dir> --access
    public`, with 2FA). npm only lets a trusted publisher be added to a package
      that already exists, so CI cannot do the first publish. Use a version below
      the first tagged release (e.g. `0.1.0`), because npm never accepts the same
      version twice. For this repository: `pnpm nx build ui`, then
      `npm publish dist/libs/ui --access public` (the version in
      `libs/ui/package.json` is `0.0.1`).
- [ ] **Add the trusted publisher** on npmjs.com (package → Settings → Trusted
      publishing): GitHub Actions, this repository, workflow `release.yml`. It
      expires if no publish succeeds within 2 days, so do it just before the
      first tagged release, or re-add it then.
- [ ] **Confirm repository settings**: rulesets on `main` and `release` (pull
      request with 0 required approvals plus the required checks) and on `v*`
      tags; merge commits and squash allowed, rebase off (Settings → Rules,
      Settings → General).
- [ ] **Docs domain** (`docs.terza.dev`): buy the domain; add a `CNAME`
      record for the docs host pointing to `kit-dix-pincott.github.io`; verify the
      domain under your GitHub account (Settings → Pages → Verified domains);
      then set it as the repo's Pages custom domain and tick "Enforce HTTPS"
      once the certificate is issued.
- [ ] **First release**: update `CHANGELOG.md`, bump the version, open a PR
      from `main` into `release`, merge, then tag `v<version>` on `release`. The
      release workflow publishes to npm and deploys the docs.
