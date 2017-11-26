Employee Control System

Requirements-
NodeJs and MongoDb

Database name is ecs. This can be configure form config.json file.

To install all libraries-
use- npm install

Once all the libraries are installed, use npm start to start the server.

Apis-
All the apis need /api appended to them.
Eg.- localhost:8081/api/getData

1)endpoint - /register		Method - POST

inputs- 
	{
		"name": "Prashant",
		"email": "prashant@gmail.com",
		"password": "prashant"
	}

output - 
	{
	    "message": "User created Successfully!",
	    "success": true
	}

2)endpoint - /login		Method - POST

inputs - 
	{
		"email": "prashant@gmail.com",
		password:"prashant"
	} 

output - 
	{
	    "success": true,
	    "message": "Successfully login",
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE5MmJhNzc5ODY2YTJkMTQ3MTFhNTciLCJpYXQiOjE1MTE2NDIwMzUsImV4cCI6MTUxMTcyODQzNX0.ztZ1V46_VgI-astjusYt7lnmd8Rw7Gsaq7vaWZgmJpY",
	    "userid": "5a192ba779866a2d14711a57"
	}

All apis after this will require a header "Authorization" with value as access token key generated by login api.

3)endpoint - /addData		Method - POST

inputs - 
	{
		"name": "Prashant",
		"age": 22,
		"salary": 10,
		"jobstatus": "Backend Developer"
	} 

output - 
	{
	    "message": "Employee added successfully!!",
	    "success": true
	}

4)endpoint - /getData		Method - GET

inputs - 
	{} 

output - 
	{
    "data": [
        {
            "_id": "5a19526f44b9d22cf0209bc4",
            "jobstatus": "developer",
            "salary": 10000,
            "age": 10,
            "name": "prashant",
            "employer": "5a192ba779866a2d14711a57",
            "__v": 0
        }
    ],
    "success": true
}