FROM mongo:latest

ARG root_username
ARG root_password

ENV MONGO_INITDB_ROOT_USERNAME=$root_username
ENV MONGO_INITDB_ROOT_PASSWORD=$root_password
ENV MONGO_INITDB_DATABASE=gif-chat

COPY ./docker/init-db.js /docker-entrypoint-initdb.d
