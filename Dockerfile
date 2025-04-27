
FROM node:lts-alpine AS base


WORKDIR /app
COPY package*.json ./

RUN npm install --only=production


COPY . .
RUN npm run build

FROM node:lts-alpine AS runner


WORKDIR /app
COPY --from=base /app/node_modules ./node_modules


COPY --from=base /app/dist ./dist

COPY .env .


EXPOSE 3000

CMD [ "node", "--require", "dotenv/config", "dist/main.js" ]