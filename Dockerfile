FROM node:lts

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN yarn install && \
    yarn build

EXPOSE 80

ENV WAS_DOMAIN_NAME="ip-10-10-4-10.ap-northeast-2.compute.internal"

CMD ["yarn", "run", "preview", "--host"]
