FROM node:20-alpine AS base

# Instal dependensi yang diperlukan
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json dan pnpm-lock.yaml
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
# Copy prisma schema
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# Build aplikasi
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build aplikasi
RUN pnpm build

# Menyiapkan image produksi
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Membuat user baru dengan hak akses terbatas
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy build artifacts
COPY --from=builder /app/public ./public

# Copy hasil build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Mengatur port dan command untuk menjalankan aplikasi
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Menjalankan aplikasi
CMD ["node", "server.js"] 