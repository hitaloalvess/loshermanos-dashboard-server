FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate

# CMD ["npm", "run", "dev"]

CMD NODE_URLS=http://*:$PORT npm run dev
