pre-requisite: need node.js installed

1. download zip file, and extract file

 2. go to directory of apigeeCode
 file where you downloaded file by using cd command:

ex: /Desktop/Downloads/apigeeCode/

3. run command in terminal to start mongoDB server: 
sudo mkdir -p /data/db

run command in terminal to open up mongoldb terminal: 

sudo ./mongodb-osx-x86_64-3.0.3/bin/mongod

5. open up another terminal, move to the directory that you are in in the previous terminal, then run the command:

 ./mongodb-osx-x86_64-3.0.3/bin/mongo

6. Then open up a third terminal, move to the directory that you are in in the previous terminal, and run command

node app.js

go to a web browser and type in url: localhost:3000