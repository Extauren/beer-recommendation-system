FROM node:16-alpine

ARG API_URL="https://glouglou.camille-eip.com"
ENV REACT_APP_API_URL=$API_URL
EXPOSE 3000
WORKDIR /app

RUN yarn global add serve

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY tailwind.config.js .
COPY postcss.config.js .
COPY tsconfig.json .
COPY public/ public
COPY src/ src

RUN yarn build --production
CMD serve -s build -p 3000
