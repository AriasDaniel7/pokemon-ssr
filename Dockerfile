FROM node:22.17.1-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

FROM node:22.17.1-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

CMD [ "node", "dist/pokemon-ssr/server/server.mjs" ]

EXPOSE 4000
