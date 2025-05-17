FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Генерация Prisma Client (очень важно)
RUN npx prisma generate

# Сборка TypeScript после генерации клиента
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
