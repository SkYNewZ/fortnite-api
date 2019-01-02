FROM node:alpine as BUILDER

ENV BABEL_ENV production
ENV NODE_ENV production
ENV YARN_PRODUCTION production
ENV PORT 3000

WORKDIR /app

COPY . .
RUN yarn && yarn build

EXPOSE 3000
ENTRYPOINT [ "node", "/app/dist/server.js" ]