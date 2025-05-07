# Week 1

## Opdracht
Bij het vak API gaan we gebruik maken van 2 web API's en 1 content API. Het doel is om met TinyHTTP, Vite en liquidJS templating onder de knie te krijgen.

## Onderzoek
We moesten onderzoeken welke API's er tot onze beschikking waren en daaruit zijn 2 ideeën bij mij blijven hangen.

### Idee 1
TrailerShuffle - met een movie trailer API de trailer ophalen, en aan de hand van de trailer swipen net als tinder sla je hem op in je later bekijken lijst. Zo weet je altijd wat je als volgende film kan kijken.

### Idee 2 - Concept

FindMySkins - Het beroemde spel Counter Strike heeft een markt voor camouflages op wapens, ook wel skins genoemd. Ik ga een soort Skin Inventory site maken waar de gebruiker skins kan toevoegen aan zijn favoriet.

Week 1 design:

![image](https://github.com/user-attachments/assets/dc185a80-3beb-48b5-b260-62c07255efba)

![image](https://github.com/user-attachments/assets/f5c56b8c-56be-405f-81eb-d4af8d46a0d3)

## Week 2

Na wat feedback van Cyd ben ik op de volgende designs uitgekomen.

Week 2 design:

![image](https://github.com/user-attachments/assets/37a5e61e-7427-4515-9658-94bb25404d34)

![image](https://github.com/user-attachments/assets/ed262f5b-7c25-41cf-ba87-ef78ef10890f)

### Content API kiezen

Na dat ik mijn designs eindelijk een beetje mooi vond ben ik op zoek gegaan naar welke CSGO API er aan mijn voorwaarden voldeden en kwam ik er snel achter dat veel van deze API's betaalt zijn en best wel prijzig kunnen worden.
Ik heb een API voor 5 euro aangeschaft bij [SteamAPIS](https://steamapis.com/)

Maar ik kwam er maar niet uit, ik probeerde te fetchen en kreeg maar geen response. Na Cyd om hulp gevraagd te hebben kwamen we er achter dat er 30.000 items worden gefetcht, en dat het wel een response kreeg, maar gewoon ontzettend lang duurde voordat alles was geladen. Samen met Cyd zijn we dus gaan kijken naar manieren om de fetch te limiteren, maar waar we achter kwamen is dat deze API slecht is geoptimaliseerd, en een limiet optie mist, waardoor je alles fetcht. Met wat ducktape code hebben we geprobeerd de fetch werkend te krijgen maar de API zelf was ook niet goed ingericht, waardoor we zochten naar een ID, maar er in de eerste 100 aantal items geen ID in het object bevindt.

Na een hoop gezeik ben ik op zoek gegaan naar een alternatief en ben ik terecht gekomen bij deze Public API:

[Gebruikte CSGO API](https://bymykel.com/CSGO-API/)

Opnieuw heb ik geprobeerd te fetch werkend te krijgen en wat blijkt, bij deze API is het mogelijk, maar deze is ook slecht gecatogarized waardoor ik in de server.js mijn eigen filters en categories handmatig moest maken.

![image](https://github.com/user-attachments/assets/e25b7a02-36ce-4fbc-96d8-5a3ea580ce23)

![image](https://github.com/user-attachments/assets/52c4024c-e989-4734-92f3-0e840d90271d)

## Week 3

In week 3 ben ik goed gaan duiken in het begrijpen van de client en server side code. Zo dacht ik eerst dat ik Vite config zelf verkeerd had ingesteld, maar bleek later een foutje van de docenten te zijn.
Ik ervaarde veel problemen met npm run dev, omdat hij de bestanden in dist bleef verwijderen. Hier heb ik best wat tijd aan besteed om het proberen op te lossen maar tot de dag van vandaag nog geen succes.

Ik heb 3 paginas gemaakt
- Homepage, hier zie je alle wapens in een overview

![image](https://github.com/user-attachments/assets/7e2417de-f094-4ab7-bedc-444c07eaac3a)

- Wapen pagina, hier zie je de skins die beschikbaar zijn voor het wapen die je hebt geselecteerd

![image](https://github.com/user-attachments/assets/dcf383f8-7c73-4d88-bea2-cd36d0ebfd1a)

- Skin/Detail pagina, hier bevinden zich de details van de camouflage, maar jammer genoeg is het ontwerp wat ik had gemaakt nog met de data die beschikbaar was van de API die ik uiteindelijk niet ben gebruiken, dus moest ik een creatieve tussenweg vinden.

![image](https://github.com/user-attachments/assets/11e6448a-b64b-4916-8230-f718c64b30c6)

Hiervoor heb ik Routes in mijn server.js moeten opzetten die luisteren naar de category die ik zelf heb gemaakt en vervolgens naar het de skin naam.
De skins met een spatie in de naam werden maar niet gevonden en ik ben op onderzoek gegaan met Cyd, uiteindelijk hebben we door wat ducktape code het goed kunnen encoden, waardoor de skins met een spatie wel gevonden werden.

![image](https://github.com/user-attachments/assets/71b947b4-16e1-4c05-94f1-261faa95d3c9)

En ik moest ook wat default wapens die geen skins hebben uitschakelen

![image](https://github.com/user-attachments/assets/5e5d9dce-7082-485d-996b-202ef44889c5)

![image](https://github.com/user-attachments/assets/113955a2-a555-49e0-b7d6-af3f27d871cc)

Ook heb ik de achtergrond kleur van de pagina de kleur gemaakt van de skin rarity color vanuit de API, daarom zijn sommige skin pagina's een andere kleur


## Week 4

In week 4 ben ik de web API's gaan implementeren, na wat research en suggesties van Cyd heb ik gekozen om LocalStorage (in dit geval node local storage) en View Transitions te implementeren.
Na het lezen van Cyd haar artikel was het mij gelukt om de view transitions te implementeren.
[Bron voor view transitions](https://cydstumpel.nl/a-practical-guide-to-the-css-view-transition-api/)

![ezgif com-video-to-gif-converter(3)](https://github.com/user-attachments/assets/d2556d26-5f4c-483b-a274-55bdf82a0a0d)

Ik had ook nog een wishlist pagina gemaakt om de LocalStorage natuurlijk ook weer te geven.
En ik heb ook een /remove en /clear geimplementeerd voor het bewerken van de wishlist.

![image](https://github.com/user-attachments/assets/7ac11685-d8d9-41b1-adb7-145fc00160c3)

Ook heb ik de paginas wat responsiver gemaakt.

![Schermopname2025-05-07071112-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/ddee0cf6-6fd5-403e-b9d6-74c94b1fb1fc)

**Final Showcase**

![ezgif com-video-to-gif-converter(4)](https://github.com/user-attachments/assets/bb20228f-14ab-42b8-8e4a-72545764c89d)



## Wat heb ik geleerd
- Server sided en client sided rendering met Liquid en NodeJS
- API fetch geavanceerd filteren
- Data meegeven naar de volgende pagina
- Onderzoek doen naar API en slechte API's herkennen
- Routing in de server.js
- Beter begrip script commands en package.json
- Nieuwe web API's View transition en LocalStorage


## Wat zou ik doen als ik meer tijd had
- Kijken of er een API is die de foto's kan upscalen
- Consistentere styling aanhouden
- De website meer laten lijken op het ontwerp
- Beter componenten verdelen
- Vite uitvogelen
- Live op Render zetten (lukt maar niet)



