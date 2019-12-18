FROM Docker:11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "node","server.js" ]
