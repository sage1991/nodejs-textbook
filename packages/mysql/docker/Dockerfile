FROM mysql:latest

ARG root_password
ENV MYSQL_ROOT_PASSWORD=$root_password
ENV MYSQL_DATABASE=nodejs

COPY ./docker/scripts /docker-entrypoint-initdb.d
