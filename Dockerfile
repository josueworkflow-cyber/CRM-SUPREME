FROM node:24-bookworm-slim AS dependencies
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM node:24-bookworm-slim AS builder
WORKDIR /app
COPY --from=dependencies /app/frontend/node_modules ./frontend/node_modules
COPY frontend ./frontend
COPY assets ./assets
WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-bookworm-slim AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
WORKDIR /app/frontend
COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/package-lock.json ./package-lock.json
RUN npm ci --omit=dev
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/next.config.ts ./next.config.ts
RUN chown -R node:node /app/frontend
USER node
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]
