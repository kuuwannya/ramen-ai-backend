# ---- Base Stage ----
FROM node:22-slim AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN npm install --omit=dev

# ---- Build Stage ----
FROM base AS build
# Install ALL dependencies including devDependencies
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
# Copy only production dependencies from dependencies stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copy built application from build stage
COPY --from=build /usr/src/app/dist ./dist

ENV PORT 8080
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
