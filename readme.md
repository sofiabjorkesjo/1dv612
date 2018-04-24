

Starta applikationen lokalt.
1. Gå in på github och gör en ny oauth app, där du skriver din lokalhost /dashboard i redirect.
2. Clona ner applikationen.
3. Skapa en .env fil i my-app mappen och skriv in REACT_APP_CLIENT_SECRET=din secret, byt även ut client-id i länken till github i App.js till ditt client id.
4. Gå in i mappen my-app. Kör npm install. Installera även nodemon och env2 genom att skriva "npm install nodemon" och "npm install env2".
5. Gå in i mappen client och skriv npm install.
6. Starta appen i my-app mappen genom att skriva npm run dev
