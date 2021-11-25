FROM openjdk:11
#Google-Cloud-SQL-IP or "mysql" for local docker network
#ENV MYSQL_HOST=35.188.11.157
ENV MYSQL_HOST=mysql
EXPOSE 8080
ADD ./build/libs/spring-gamego-1.0.jar /srv/spring-gamego-1.0.jar
CMD java -jar /srv/spring-gamego-1.0.jar
