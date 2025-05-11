FROM node:24-alpine

WORKDIR /frontend

COPY ./frontend/package.json .

RUN npm i

COPY frontend/ .

RUN npm run build

CMD [ "npm", "run", "start" ]
