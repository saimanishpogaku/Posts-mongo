# Posts-mongo

##Deploy MongoDB on AWS
1>Deploy an EC2 Instance on AWS with opening 27017(mongodb) and 22(ssh) ports by giving the same in the security groups.
2>Please use the shell script provided in the project folder as user-data while deploying the EC2 Instance.
3>SSH into Instance and start mongodb.After mongo server is up, type mongo to enter the mongodb shell.
4>Create a new database with name "Mongo".
5>Create a collection named "Posts" in it.
6>Create a database user using below query:
  db.createUser(
   {
     user: "manish",
     pwd: "manish",  
     roles: [ { role: "readWrite", db: "Mongo" } ]
   }
)
7>Edit the mongod config file i.e., /etc/mongod.conf
  replace the 2 nodes in the file 
  a) net:
      bindIp: "string" //Ur EC2 instance private ip address
  b)security:
      authorization: "string" //enabled
8>Now load mongodb new configuration by using below command:
  sudo systemctl daemon-reload
9>Now restart the mongodb server.

##Build Posts Microservice
1>Build docker image out of Dockerfile 
  sudo docker build -t <image-name> .
2>Create a container out of it.  
  
  
