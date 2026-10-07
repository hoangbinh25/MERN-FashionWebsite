# Shared dependency layer. Docker reuses this layer while package-lock.json is unchanged.
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Development target: used by docker-compose.yml for Vite hot reload.
FROM dependencies AS development
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build target: Vite substitutes VITE_* values into static assets at build time.
FROM dependencies AS build
COPY . .
ARG VITE_API_URL_BACKEND=http://localhost:3001
ENV VITE_API_URL_BACKEND=$VITE_API_URL_BACKEND
RUN npm run build

# Production target: a small Nginx image serves only the compiled static files.
FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider -q http://localhost/ || exit 1
