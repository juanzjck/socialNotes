FROM node:10

COPY ["package.json","package-lock.json","/usr/src/"]

WORKDIR /usr/src/src

RUN npm install

COPY [".","/usr/src/"]

EXPOSE 4000

CMD ["npx","nodemon","--legacy-watch","index.js"]
