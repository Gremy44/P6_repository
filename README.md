# OC projet P6 - Développez une interface utilisateur pour une application web Python

## Table des matières
1. Mise en place du serveur local
2. Se rendre JustWatchIt
3. Structure de la page 

### Mise en place 
- Cloner le git à l'endroit souhaité : `git clone https://github.com/Gremy44/P6_repository.git`
- Aller dans le repertoire : `cd P6_repository`
- Dans le repertoire, cloner l'api : `git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR`
- Dans le dossier OCMovies-API-EN-FR : `cd OCMovies-API-EN-FR`
- Se faire un environnement virtuel : `python -m venv <environment name>`
- Activer l'environnement virtuel : `<venvironment name>\Scripts\activate`
- Installer les librairies : `pip instal -r requirement.txt`
- Faire la commande : `python manage.py migrate`
- Créer la base de données : `python manage.py create_db`
- Lancer le serveur : `python manage.py runserver`

Le serveur est en fonctionnement et prêt à être utilisé.

### Se rendre sur JustStreamIt
Vous pouvez vous rendre sur la page de JustStreamIt de deux façons différentes : 
- en double cliquant sur le fichier index dans le repertoire `P6_repository`

### Structure de la page
La page est constituée d'un header avec le nom du site
S'en suis un overview du film avec la meilleur note Imdb tout genre confondu
Il y a ensuite 4 catégorie avec leur 7 meilleurs film proposés : 
- meilleurs film
- meilleurs film d'action
- meilleurs film d'animation
- meilleurs film de science-fiction



