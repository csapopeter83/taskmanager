# Build context is the repo root (see docker-compose.yml), because pnpm needs the whole
# workspace (pnpm-workspace.yaml, the root lockfile, and every app's package.json) to install.
#
# Single stage on purpose: pnpm's node_modules are symlinks into a shared store, relative to
# where they were installed. Copying node_modules into a separate final stage breaks those
# symlinks, so everything stays in one image instead of trying to prune it down.
FROM node:22-slim
RUN corepack enable
WORKDIR /repo

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter api build

WORKDIR /repo/apps/api
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/main.js"]
