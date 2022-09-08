class Request {

    constructor(url, title, div){
        this.url = url;
        this.title = title;
        this.div = div;
    }

    static retrieveId(e){
        //bloque le scroll
        const body = document.getElementById("body");
        body.style.overflow = "hidden";
        document.getElementById("close").addEventListener('click', () =>{body.style.overflow="auto"})

        // nettoie les informations precedentes
        const infos = document.getElementById("infosFilm");
        while(infos.firstChild){
            infos.removeChild(infos.lastChild);
        }

        const affiche = document.getElementById("affiche");
        while(affiche.firstChild){
            affiche.removeChild(affiche.lastChild);
        }

        const titre = document.getElementById("titre");
        while(titre.firstChild){
            titre.removeChild(titre.lastChild);
        }

        // cree la requete
        const urlFilm = `http://localhost:8000/api/v1/titles/${e['path'][1].id}`;

        fetch(urlFilm)
            .then(values => values.json())
            .then(infosFilm =>{
                document.getElementById('affiche').innerHTML +=
                    `<img class ="affiche" src=${infosFilm.image_url}/>`;
                
                document.getElementById('infosFilm').innerHTML +=
                    `<p>Titre : ${infosFilm.title}</p>
                     <p>Genre : ${infosFilm.genres}</p>
                     <p>Date de sortie : ${infosFilm.date_published}</p>
                     <p>Note : ${infosFilm.rated}</p>
                     <p>Note Imdb : ${infosFilm.imdb_score}</p>
                     <p>Réalisateur : ${infosFilm.directors}</p>
                     <p>Acteurs : >${infosFilm.actors}</p>
                     <p>Durée : ${infosFilm.duration} min</p>
                     <p>Pays : ${infosFilm.countries}</p>
                     <p>Box Office US : ${infosFilm.usa_gross_income} $</p>
                     <p>Description : ${infosFilm.description}</p>`;

                document.getElementById("titre").innerHTML += infosFilm.title;
            })
    }

    overview(){
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {
                const urlInfos = infos.results[0]['url'];
                fetch(urlInfos)
                    .then(values2 => values2.json())
                    .then(infos2 => {
                        // Capte les informations
                        
                        //image
                        document.getElementById('video').innerHTML +=
                            `<img class="overview__img" src="${infos.results[0]['image_url']}"></img>`
                        //tite
                        document.getElementById('video').innerHTML +=
                            `<p class="overview__titre">${infos.results[0]['title']}</p>`
                        //infos
                        document.getElementById('video').innerHTML +=
                            `<p class="overview__desc">${infos2['description']}</p>`
                        //bouton
                        document.getElementById('video').innerHTML += 
                            `<a id = "${infos2['id']}" href='#ancreModale'><button class="overview__infos">Informations</button></a>`;

                        //evenement pour renvoi sur la modale
                        document.getElementById(infos2['id']).addEventListener('click', Request.retrieveId);
                    })
            })
    }

    run(){
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {

                let div = document.getElementById(this.div);
                let nameIdImage = `images_${this.div}`

                div.innerHTML += `<div id='t_${this.div}'>${this.title}</div>`;
                
                div.innerHTML += `<div id = ${nameIdImage}></div>`;

                for(let i = 0; i < infos.results.length; i++ ){
                    //creation de l appercu avec id api en id html
                    document.getElementById(nameIdImage).innerHTML += 
                    `<a id = "${infos.results[i]['id']}" href='#ancreModale'><img class = "${nameIdImage}" src = "${infos.results[i].image_url}"></a>`;
                    document.getElementById(nameIdImage).addEventListener('click', Request.retrieveId);
                }
            })      
    }
} 

let nbItems = 7;
// cree l objet overview du haut de page
let overview = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=${1}`, "Overview", "video");
// cree les objets section
let bestMovieRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=${nbItems}`, "Meilleurs films", "best");
let bestActionRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=action&page_size=${nbItems}`,  "Meilleurs films d'action", "best_action");
let bestAnimationRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=animation&page_size=${nbItems}`,  "Meilleurs films d'animation", "best_animation");
let bestSciFiRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=sci-fi&page_size=${nbItems}`,  "Meilleurs films de Sci-Fi", "best_sf");

//appels
setInterval(overview.overview(),1000);

setInterval(bestMovieRequest.run(),1000);

setInterval(bestActionRequest.run(),1000);

setInterval(bestAnimationRequest.run(),1000);

setInterval(bestSciFiRequest.run(),1000);




