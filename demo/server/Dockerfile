FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install 
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# #  Production build (commented out)
# FROM node:18 AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# FROM node:18-alpine

# WORKDIR /app
# COPY --from=build /app .

# RUN npm prune --production

# EXPOSE 3000
# CMD ["node", "src/server.js"]
