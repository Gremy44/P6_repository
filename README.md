# P6_repository
$ python manage.py runserver
$ python -m http.server 80
http://localhost:8000/api/v1/titles/

http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=7%22 // best movies

http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=action&page_size=7%22 // best action movies



L’image de la pochette du film    movieImg
Le Titre du film                  title
Le genre complet du film          gender
Sa date de sortie                 release
Son Rated                         rate
Son score Imdb                    imdbRank
Son réalisateur                   director
La liste des acteurs              actors
Sa durée                          length
Le pays d’origine                 country
Le résultat au Box Office         boResults
Le résumé du film                 resume

movieImg
title
gender
release
rate
imdbRank
director
actors
length
country
boResults
resume
v