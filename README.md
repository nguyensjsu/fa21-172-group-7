# GROUP7

## Step-by-Step Setup for Application
1. Clone the application to local (i.e. `git clone https://github.com/nguyensjsu/fa21-172-group-7.git`).
2. Make sure <a href="https://nodejs.org/en/download/">Node.js</a> is installed.
3. Install node dependencies for React frontend by `cd frontend` and `npm install`. 
4. You're done!

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

## Commands to Run React Frontend
```
cd frontoffice / backoffice
npm install
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

## GKE Deployment
### GCP MySQL

1. Create a new MySQL [instances.](https://cloud.google.com/sql/?utm_source=google&utm_medium=cpc&utm_campaign=na-US-all-en-dr-bkws-all-all-trial-e-dr-1009892&utm_content=text-ad-none-any-DEV_c-CRE_509035422187-ADGP_Desk%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Databases%20~%20Cloud%20SQL_SQL-KWID_43700061551672272-kwd-28489936691&utm_term=KW_google%20cloud%20sql-ST_google%20cloud%20sql&gclsrc=aw.ds&gclid=CjwKCAiA4veMBhAMEiwAU4XRr_HDXIOpXAWh2jhZ9N5SFJs-trCYSj03DW-sE4rNkrqxnvgvKzMewhoCpFMQAvD_BwE) Also remember to activate google-MySQL API. [Sample tutorial.](https://www.youtube.com/watch?v=1UKKaxQH6sc&ab_channel=Talk2Amareswaran)
   
2. Go to `connection` and add your public ipv4 address.  
   
![image](https://user-images.githubusercontent.com/18486562/143326338-8bf5283d-e416-48cb-af04-08aba2692d25.png) 

3. Enable VPC private IP 

![image](https://user-images.githubusercontent.com/18486562/143380045-a39a9426-5676-4669-a5ff-ebd757c15d9e.png)

4. Go to `user` and add `admin`- `password`. 
   
![image](https://user-images.githubusercontent.com/18486562/143326629-4f88f6b0-01f8-48ec-a8fe-b12a2639464a.png)

5. Go to `database` and add `cmpe172`. 
   
![image](https://user-images.githubusercontent.com/18486562/143326667-31e41b5d-f62c-49f5-86c9-35eba798490d.png)

6. Change your `MYSQL_HOST` in [deployment.yml](https://github.com/nguyensjsu/fa21-172-group-7/tree/main/backend/kube) of Kubernetes backend-deployment
   
![image](https://user-images.githubusercontent.com/18486562/143669537-21767101-5080-42b5-9978-01299afbd1ed.png)

### GKE API-Cluster
Upload GKE yml files from
https://github.com/nguyensjsu/fa21-172-group-7/tree/main/backend/docker
https://github.com/nguyensjsu/fa21-172-group-7/tree/main/backend/kong

Get credentials:
`gcloud container clusters get-credentials YOURCLUSTERHERE --zone YOURCLUSTERZONEHERE`
ex:
`gcloud container clusters get-credentials cluster-backend --zone us-central1-a`

Execute scripts:
```
kubectl create -f deployment.yaml 
kubectl create -f service.yaml
kubectl apply -f https://bit.ly/k4k8s

kubectl apply -f kong-ingress-rule.yaml
kubectl apply -f kong-strip-path.yaml
kubectl patch ingress gamego-api -p '{"metadata":{"annotations":{"konghq.com/override":"kong-strip-path"}}}'

kubectl apply -f kong-cors.yaml
kubectl apply -f kong-key-auth.yaml
kubectl patch service spring-gamego-api-service -p '{"metadata":{"annotations":{"konghq.com/plugins":"kong-key-auth"}}}'
kubectl apply -f kong-consumer.yaml

 kubectl create secret generic apikey  \
  --from-literal=kongCredType=key-auth  \
  --from-literal=key=2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ

kubectl apply -f kong-credentials.yaml
```

### GKE ReactJS
Has the same steps as deploying Backend-Spring:
1. In `package.json`, change proxy to the `Backend-IP:Port`
   
![image](https://user-images.githubusercontent.com/18486562/143669371-4c045bf5-a1e0-4846-8a3e-15c253a1e672.png)

2. build img - `docker build -t frontend-gamego .`
3. tag - `docker tag frontend-gamego YourDockerRepo`
4. `docker push YourDockerRepo`
5. Uploads [deployment.yml](https://github.com/nguyensjsu/fa21-172-group-7/tree/gke/frontend/kuber) to GKE and create a pod and expose it with service.

### RabbitMQ Deployment 

