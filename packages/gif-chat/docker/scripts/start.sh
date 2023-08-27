container_id=$(docker ps -aqf "name=nodejs-textbook-gif-chat")

if [ -n "$container_id" ]; then
  docker rm -f "$container_id"
fi

docker run -d \
  --name nodejs-textbook-gif-chat \
  -p 27017:27017 \
  nodejs-textbook-gif-chat:latest
