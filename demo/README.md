build image : 
 run : docker build -t server_demo .

 run container : 
 docker run -p 3000:3000 server_demo


 run live : 
 docker compose -f docker-compose.dev.yml up

restart compose : 
docker compose -f docker-compose.dev.yml restart

Stop và up lại (clean hơn) :

docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d

Rebuild image trước khi up 
docker compose -f docker-compose.dev.yml up -d --build
docker compose -f docker-compose.dev.yml up --build

build lại hoàn toàn : 
docker compose -f docker-compose.dev.yml up --build

build lại hoàn toàn xóa cache: 
docker compose -f docker-compose_v2.dev.yml build --no-cache
docker compose -f docker-compose_v2.dev.yml up -d


xem log :
docker logs <container_name>
docker logs -f  : read-time

