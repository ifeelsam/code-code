FROM oven/bun:1 AS base

WORKDIR /usr/home/app

COPY ./package* .

RUN bun install

COPY . .

EXPOSE 3000

CMD [ "bun", "run", "dev" ]
