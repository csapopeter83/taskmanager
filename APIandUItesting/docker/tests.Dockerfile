# Build context is the repo root (see docker-compose.yml) — same reasoning as api.Dockerfile.
# Playwright's own image ships Node plus Chromium/Firefox/WebKit with all OS deps preinstalled.
FROM mcr.microsoft.com/playwright:v1.62.1-noble
RUN corepack enable
WORKDIR /repo

COPY . .
RUN pnpm install --frozen-lockfile

CMD ["pnpm", "test:e2e"]
