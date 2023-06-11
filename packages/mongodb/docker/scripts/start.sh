container_id=$(docker ps -aqf "name=nodejs-textbook-mongo")

if [ -n "$container_id" ]; then
  docker rm -f "$container_id"
fi

docker run -d \
  --name nodejs-textbook-mongo \
  -p 27017:27017 \
  nodejs-textbook-mongo:latest
