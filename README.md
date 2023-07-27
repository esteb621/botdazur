# Bot Discord Lignes d'Azur


## Description

Bot d'Azur est un bot développé en JavaScript permettant d'accéder à des informations liées au trafic du réseau de transport Lignes d'Azur. Il offre plusieurs fonctionnalités, telles que l'obtention de la dernière fiche horaire d'une ligne spécifique et la récupération des dernières informations sur le trafic du réseau. Le bot est construit en utilisant la bibliothèque Discord.js pour interagir avec l'API de Discord.

## Fonctionnalités

- Obtenir la dernière fiche horaire d'une ligne et d'une direction spécifique en image.
- Annonce des changements d'horaire pour une ligne spécifique.
- Récupérer les dernières informations sur le trafic du réseau.
- Diffusion des dernières news publiées par le RSS Feed de Lignes d'Azur.
- Liste de prix des articles disponibles à l'achat (ticket et abonnement).

## Prérequis

Avant de lancer le projet en local, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js et npm
- Créer une [application Discord](https://discord.com/developers/applications) pour le bot

Vous pouvez  installer Node.js et npm directement via [ce lien](nodejs.org)
## Installation

Pour commencer, lancez les commandes suivantes:
```
git clone https://github.com/esteb621/botdazur.git
cd botdazur
npm install
```

Créer un fichier `config.json` à la racine du projet en y ajoutant les informations suivantes :

```json
{
  "discord_token": "VOTRE_TOKEN_DE_BOT",
  "server": "ID_DU_SERVEUR",
  "client": "ID_DU_BOT",
  "news-channel": "ID_DU_CHANNEL_NEWS"
}
```
Le token et l'id du client peuvent être retrouver dans le developer portal de Discord.
L'ID du serveur et du channel peuvent être retrouver en faisant un clic droit sur le serveur où vous voulez que votre Bot intéragisse, de 
même pour le channel

Pour démarrer le projet:

`npm run start`

Pour que les commandes puissent être visible dans le serveur: 

`npm run commands`

