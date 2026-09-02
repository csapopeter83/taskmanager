#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__env = {
  apiBaseUrl: "${API_BASE_URL:-http://localhost:3000}",
};
EOF
