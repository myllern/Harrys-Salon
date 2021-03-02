# Simpel server för att hantera data och användare.

Den använder nodejs och express (https://expressjs.com/).

All data sparas i minnet på servern i vanliga js objekt.

Serverdelen är implementerad i server.js.

När servern körs så nås den på localhost:8080

Det finns en väldigt simpel test-sida som laddas om man besöker sidan. Sidan visar också hur jag har tänkt att kommunikationen mellan UI och server kan se ut.

För att testa och kommunicera med servern så har jag lagt till server_api.js. Genom att inkludera klassen ServerApi så borde det förhoppningsvis gå ganska lätt att koppla på ett gränssnitt. Klassen använder för närvarande fetch för att kommunicera med servern. Det kommer att behöva ändras till "angular http object" i framtiden.

Features:
• Stöd för både kunder (user) och frisörer (admin).
• Alla användare av systemet har ett användarnamn och eventuellt ett fullständigt namn.
• Det går att logga in.
• Man kan få ett schema över bokningar. Listas olika beroende på användare.
• Varje frisör har 5 tidsluckor som kunden kan boka från.
• Kunden kan endast se sina egna bokningar. Andras bokningar listas som BUSY.
• Frisörer kan ta bort vilken bokning some helst medan kunden endast kan ta bort sina egna.

Saknas:
• javascriptet (server_api.js) för klientsidan använder fetch och inte Angular.
• Det saknas stöd för att välja frisyr när man bokar en tid.
• Det finns ingen prislista på servern.
