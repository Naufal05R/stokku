FROM node:22-alpine AS base

# ======================================================
# Stage 1: Dependencies
# ======================================================
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ARG TARGETARCH
RUN corepack enable pnpm && \
    npm_config_os=linux \
    npm_config_cpu=${TARGETARCH} \
    npm_config_libc=musl \
    pnpm i --frozen-lockfile

RUN npm_config_os=linux \
    npm_config_cpu=${TARGETARCH} \
    npm_config_libc=musl \
    pnpm prune --prod

# ======================================================
# Stage 2: Builder
# ======================================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm run build

# ======================================================
# Stage 3: Cleaner
# ======================================================
FROM base AS cleaner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

RUN find /app/node_modules -name "*.d.ts" -delete && \
    find /app/node_modules -name "*.map" -delete && \
    find /app/node_modules -name "*.md" -delete && \
    find /app/node_modules -name "LICENSE*" -delete && \
    find /app/node_modules -name "CHANGELOG*" -delete && \
    find /app/node_modules -name "README*" -delete

# ======================================================
# Stage 4: Runner
# ======================================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-deprecation
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

COPY --from=cleaner --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["sh", "-c", "npx payload migrate && node server.js"]
