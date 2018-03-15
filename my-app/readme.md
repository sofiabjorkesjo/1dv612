För att köra applikationen:
1. gå in på http://159.203.165.169:3000/
2. Klicka på logga in, och logga in med dina inloggningsuppgifter till github.

Användning:
1. När du är inloggad, gå in på sidan Settings för att välja de organisationer som du vill ha notifikationer ifrån, samt vilka event du vill lyssna på.
2. På sidan Dashboard får du upp notifikationerna när du är inloggad. Har du en gmail kopplad till din github så får du även notifikationer på mail. När du loggar in igen så får du upp notifikationer på saker som hänt sedan du sist var inloggad. Du får notifikationer till mailen även om du inte är inloggad i applikationen.

Starta applikationen lokalt.
1. Gå in på github och gör en ny oauth app, där du skriver din lokalhost /dashboard i redirect.
2. Clona ner applikationen.
3. Gå in i mappen my-app. Kör npm install. Installera även nodemon och env2 genom att skriva "npm install nodemon" och "npm install env2".
4. Gå in i mappen client och skriv npm install.
5. Starta appen i my-app mappen genom att skriva npm run dev