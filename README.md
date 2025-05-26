This had a section about how it was last updated at so and so time and how I was happy. Spoiler: I was not.
The actual last change I'm doing now is this push, which has the nicer tests and a jwt that makes more sense

## This is not tested on safari, potential layout issues exist with gap not being supported, and possibly some other properties

This project requires node to run

https://nodejs.org/en/download

Choose your operating system and follow the on screen instructions if not installed already.

1. Clone the repo to your machine

2. Preparing the server
	- Navigate to cromwell.api/
	- open the .env
	- Find "MONGODB_URI=mongodb://localhost:27017/cromwell" and replace "mongodb://localhost:27017/cromwell" with your own mongoURI
	- Create a table named "users" if you don't have one already

3. Running the server
	- Open cromwell.api in the terminal
	- type "npm install"
	- Once completed, type either "npm start" or "node server.js" 
	- You should expect two logs  "Database connected" and what port the server is running on (5000)
	- If you encounter an error, make sure you followed all the points in step 2, and that the mongo connection is running


4. Setting up the Website
	- If server is not running locally, or not on port 5000
	- Navigate to cromwell.web/src/config/
	- Open .apiConfig.jsx
	- Find (near the top) "base_url: "http://localhost:5000", replace "http://localhost:5000" with your server address

5. Running the website
	- Open cromwell.web in the terminal (you may need a different terminal to what's running the server)
	- type "npm install"
	- Once completed, type "npm run dev"
	- You should expect a log of "Local: http://localhost:XXXX/"
	- Navigate to localhost (with port) listed to see the website

6. Running tests
	- Open cromwell.api in the terminal
	- Type "npm test"
