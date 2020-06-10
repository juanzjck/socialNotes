FROM node:10

COPY ["package.json","package-lock.json","/usr/src/"]

WORKDIR /usr/src/src

RUN npm install

COPY [".","/usr/src/"]

EXPOSE 3000

CMD ["npx","nodemon","--legacy-watch","index.js"]
