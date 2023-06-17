while getopts p: flag
do
  case "${flag}" in
    p) root_password=$OPTARG;;
    *) echo "$flag is not the option" && exit 1;;
  esac
done

if [ -z "$root_password" ]; then
  echo "root password required"
  exit 1
fi

docker build \
  --build-arg "root_password=$root_password" \
  -f docker/Dockerfile \
  -t nodejs-textbook-nodebird \
  .
