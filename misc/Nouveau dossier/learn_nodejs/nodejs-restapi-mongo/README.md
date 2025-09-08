# nodejs-restapi-mongo
Example Project on how to build and develop REST API with NodeJS and MongoDB

# Install NodeJS
To install the latestest LTS version of Node using nvm, run the following command:
    > nvm install --lts
To run a specific LTS version, we run:
    > nvm install 14 --lts

# Initialize Mongo DB
- Initialize todo table by running below query from a bash command prompt:
    > mongo todo-api < ./db/mongo/tasksJson.js