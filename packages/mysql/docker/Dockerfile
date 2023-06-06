FROM mysql:latest

ARG root_password
ENV MYSQL_ROOT_PASSWORD=$root_password
ENV MYSQL_DATABASE=nodejs

COPY ./docker/init-db.sql /docker-entrypoint-initdb.d
