# GROUP7

## Step-by-Step Setup for Application
1. Clone the application to local (i.e. `git clone https://github.com/nguyensjsu/fa21-172-group-7.git`).
2. Make sure <a href="https://nodejs.org/en/download/">Node.js</a> is installed.
3. Install node dependencies for React frontend by `cd frontend` and `npm install`. 
4. You're done!

## Commands to Run React Frontend
```
cd frontend
npm start
```

## Commands to Run Java Spring Backend
```
cd backend
gradle bootRun
```

## Commands to Get Kong API Working
```
cd backend
gradle bootJar
// Start Docker Desktop
docker build -t spring-gamego .
docker images
docker network create --driver bridge gamego-network
docker network ls
docker network inspect gamego-network
docker run -d --name spring-gamego --network gamego-network -td spring-gamego

docker run -d --name kong \
--network=gamego-network \
-e "KONG_DATABASE=off" \
-e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
-e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
-e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
-e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
-e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
-p 80:8000 \
-p 443:8443 \
-p 8001:8001 \
-p 8444:8444 \
kong:2.4.0

http :8001/config config=@kong.yaml
docker exec -it kong kong reload

http localhost/api/ping
http localhost/api/ping apikey:2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ
curl localhost/api/ping -H 'apikey:2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ'

// Test it on the React app (Took Kong 20 seconds to respond on Windows)
// Make sure the Kong functions in App.js useEffect() are being used, not the non-Docker ones
npm start
```

## Individual Team Member Journals
These journals will include the following contents as per the project requirements:
  * A snapshot (point-in-time) image of the Team's Task Board highlighting which "Card" you worked on
  * A discussion of your accomplishments that week with a list of links to your Code Commits and PRs.
  * A discussion of the challenges you faced that week and how your resolved those issues.

These journals are located in the <a href="https://github.com/nguyensjsu/fa21-172-group-7/tree/main/journals">journals</a> folder. They can also be accessed with the links below:
  * <a href="https://github.com/nguyensjsu/fa21-172-group-7/blob/main/journals/shana-nguyen.md">Shana Nguyen</a>
  * <a href="https://github.com/nguyensjsu/fa21-172-group-7/blob/main/journals/thai-quach.md">Thai Quach</a>
  * <a href="https://github.com/nguyensjsu/fa21-172-group-7/blob/main/journals/isla-shi.md">Isla Shi</a>
  * <a href="https://github.com/nguyensjsu/fa21-172-group-7/blob/main/journals/justin-zhu.md">Justin Zhu</a>


## Project Description - GameGo

GameGo is a platform for purchasing video games, similar to GameStop. 


### Functional Requirements

- Video games can be seen and selected for purchase
- User can purchase a video game with a credit card
- Transactions are recorded and viewable
- Game inventory can be accessed and the number of remaining games can be viewed


### Technical Requirements

- Frontend 
    - React JS

- Backend
    - Spring
    - MySQL 8.0
    - RabbitMQ
    - Kong API Gateway
    - CyberSource Payment Gateway

- JDK 11
- Gradle 5.6
