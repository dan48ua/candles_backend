FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p dist/uploads && cp -r src/uploads/* dist/uploads/

EXPOSE 5000

CMD ["node", "dist/server.js"]
