FROM node:11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install http-server -g
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npx","http-server","dist/" ]
