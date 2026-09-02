# Build context is the repo root (see docker-compose.yml) — same reasoning as api.Dockerfile.
FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter web build

# The Angular build output is plain static files (no symlinks), so unlike api.Dockerfile it's
# safe to copy just that folder into a separate final stage.
FROM nginx:alpine
COPY --from=build /repo/apps/web/dist/web/browser /usr/share/nginx/html
COPY docker/web-nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/web-entrypoint.sh /docker-entrypoint.d/40-env-config.sh
RUN chmod +x /docker-entrypoint.d/40-env-config.sh

EXPOSE 80
