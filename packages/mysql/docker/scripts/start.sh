container_id=$(docker ps -aqf "name=nodejs-textbook-mysql")

if [ -n "$container_id" ]; then
  docker rm -f "$container_id"
fi

docker run -d \
  --name nodejs-textbook-mysql \
  -p 3306:3306 \
  nodejs-textbook-mysql:latest
