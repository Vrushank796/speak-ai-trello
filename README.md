# speak-ai-trello
With the help of Trello integration you would be able to create, modify and delete cards across your team members.

# Server - ExpressJS & NodeJS

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Features](#features)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vrushank796/speak-ai-trello.git
   
2. Install the dependencies:
  In both client and server

   ```bash
   npm install
   ```

3. Set up the configuration:

   - Create and Open `.env` in server and update the necessary mongo-url, trello-api-key and trello-secret-key.
     ```
      PORT = 8000
      MONGO_URL = `mongo-url`
      TRELLO_KEY = `trello-api-key`
      TRELLO_OAUTH_SECRET = `trello-secret-key`
      SECRET_KEY = 3f039c23c0c5c566425534a2deebc2b3e48f092929ca5a20d5a5edded2c6ac3fvvv //generated using require('crypto').randomBytes(64).toString('hex')
     ```

## Usage

To use Speak AI Trello:

1. Run the application:
2. Run the server application:
  ```bash
   cd server
  ```

   ```bash
   npm run dev
   ```
  Run the client application:
  ```bash
   cd client
  ```

   ```bash
   ng serve
   ```

2. Open your browser and navigate to `http://localhost:4200`.

3. Now, you would be able to login and by completing the Trello authentication.

5. Perform CRUD operations, by navigating through components.
   
   - Create New Card on My Cards page, fill up the minimum required fields such as title and description to add the card. Along with that, angular reactive form validators would prevent user to submit the form.
   - Display the all cards on cards page, and display the single card details by clicking on card title or description. 
   - Edit the card based on card id, populate the card details by API call and update the card details.
   - Delete the card.

## API
  - GET ```localhost:8000/api/auth/login```
    - It would redirect to callback url which is access through the origin defined in Trello Power Ups Admin, which use the OAuth, Trello API Key and Secret Key to fetch the accessToken and accessTokenSecret, finally save the user details such as   id,fullName,username,email and accessToken in MongoDB database named **speakAiDB**, collection named **users**.
    - Response with the cookie which contains the jwt named loginToken which includes minimal risk information of user such as user id and username, loginToken would only be able to decrypt with secretKey in environment config file in server.
    - loginToken would be used for all CRUD operation to access the Trello resource such as Creation, Updation and Deletion of card in Trello.
  - GET ``` localhost:8000/api/cards ```
    - This is a GET request and it is used to "get" all the cards data from MongoDB. There is no request body for a GET request.
    - A successful GET response will have a 200 OK status, and should include some kind of response body - JSON data.
  - GET ```localhost:8000/api/card/64810e3dfea8f9480128d2f7```
    - This is a GET request and it is used to "get" all the cards data from MongoDB. There is no request body for a GET request.
    - A successful GET response will have a 200 OK status, and should include some kind of response body - JSON data.
  - POST ```localhost:8000/api/card```
    - This is a POST request, submitting data to an API via the request body. This request submits JSON data, and the data is reflected in the response. 
    - First, it would create card using Trello API endpoint ```https://api.trello.com/1/cards?idList=647d4d14a8308da54b58fe28&key=${APIKey}&token=${APIToken}``` and it would get the card id to store the card details in MongoDB database named **speakAiDB**, collection named **cards**.
    - A successful POST request typically returns a 200 OK or 201 Created response code.
    
    Request Headers
    ```Cookie: loginToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2I3YWQ5YzgwN2JkNjJiNzlhMjhlNCIsInVzZXJuYW1lIjoidnJ1c2hhbmthbWluIiwiaWF0IjoxNjg2MTcwMDkzfQ.-6ON1g-AoszpoRjRsS2EF-usL0e2gswSjNylXZtxL_E```
    
    ```
      {
        "title": "Verify Token and then allow resource modification", 
        "description": "Get id and save card data to DB"
      }
    ```
   - PUT ```localhost:8000/api/card/6480f3a1bf3d150931d2e787```
     - This is a PUT request and it is used to overwrite an existing piece of data. For instance, after you create an entity with a POST request, you may want to modify that later. You can do that using a PUT request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).
     - First, it would update card using Trello API endpoint ```https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}``` and then update the card details in MongoDB database named **speakAiDB**, collection named **cards**.
     - A successful PUT request typically returns a 200 OK response code.
     
     Request Headers
    ```Cookie: loginToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2I3YWQ5YzgwN2JkNjJiNzlhMjhlNCIsInVzZXJuYW1lIjoidnJ1c2hhbmthbWluIiwiaWF0IjoxNjg2MTcwMDkzfQ.-6ON1g-AoszpoRjRsS2EF-usL0e2gswSjNylXZtxL_E```
    
       ```
         {
             "title": "Update with token done", 
             "description": "Work on frontend"
         }
       ```
    
   - DELETE ```localhost:8000/api/card/6480ea782f7248e4e49d81d0```
    - This is a DELETE request, and it is used to delete data that was previously created via a POST request. You typically identify the entity being updated by including an identifier in the URL (eg. id=1).
    - First, it would delete card using Trello API endpoint ```https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}``` and then delete the card details in MongoDB database named **speakAiDB**, collection named **cards**.
    - A successful DELETE request typically returns a 200 OK, or 204 No Content response code.
    Request Headers
    ```Cookie: loginToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2I3YWQ5YzgwN2JkNjJiNzlhMjhlNCIsInVzZXJuYW1lIjoidnJ1c2hhbmthbWluIiwiaWF0IjoxNjg2MTcwMDkzfQ.-6ON1g-AoszpoRjRsS2EF-usL0e2gswSjNylXZtxL_E```
    
    
## Features

- Login, User Authorization through Trello OAuth using Trello API Key and Trello Secret to generate Trello accessToken. 
- Add cards, display cards, update cards, delete cards using User verification and accessToken.
