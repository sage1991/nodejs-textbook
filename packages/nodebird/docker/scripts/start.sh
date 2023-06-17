container_id=$(docker ps -aqf "name=nodejs-textbook-nodebird")

if [ -n "$container_id" ]; then
  docker rm -f "$container_id"
fi

docker run -d \
  --name nodejs-textbook-nodebird \
  -p 3306:3306 \
  nodejs-textbook-nodebird:latest
