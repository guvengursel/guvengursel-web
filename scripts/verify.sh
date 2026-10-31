#!/usr/bin/env bash
set -euo pipefail

npm ci --ignore-scripts --no-audit --no-fund
npm run test:production-contract
npm run test:rra-routing
npm run test:language-contract
npm run check
npm run build:assets
git diff --exit-code -- public/og-image.png public/apple-touch-icon.png
npm run build
node scripts/verify-built-site.mjs
npm run test:privacy-contract
npm run test:i18n-navigation
npm audit --audit-level=moderate
