class Request {

    constructor(url, title, div){
        this.url = url;
        this.title = title;
        this.div = div;
    }

    static retrieveId(e){
        /* Retrieve Id from image when she is clicking, make an API request with this id for grad movie's
        informations and return them to html page */

        // lock the scroll
        const body = document.getElementById("body");
        body.style.overflow = "hidden";
        document.getElementById("close").addEventListener('click', () =>{body.style.overflow="auto"})

        // clean modal page
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

        // request
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
        /* make the resquets for the picture overview of the best movie */
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {
                const urlInfos = infos.results[0]['url'];
                fetch(urlInfos)
                    .then(values2 => values2.json())
                    .then(infos2 => {
                        // picture
                        document.getElementById('overview').innerHTML +=
                            `<img class="overview__img" src="${infos.results[0]['image_url']}"></img>`
                        // title
                        document.getElementById('overview').innerHTML +=
                            `<p class="overview__titre">${infos.results[0]['title']}</p>`
                        // infos
                        document.getElementById('overview').innerHTML +=
                            `<p class="overview__desc">${infos2['description']}</p>`
                        // button
                        document.getElementById('overview').innerHTML += 
                            `<a id = "${infos2['id']}" href='#ancreModale'><button class="overview__infos">Informations</button></a>`;

                        // event for clicking
                        document.getElementById(infos2['id']).addEventListener('click', Request.retrieveId);
                    })
            })
    }

    run(){
        console.log("coucou")
        // Construct the page
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {

                let div = document.getElementById(this.div);
                let nameIdImage = `images_${this.div}`

                div.innerHTML += `<div id='t_${this.div}'>${this.title}</div>`;
                
                div.innerHTML += `<div id = ${nameIdImage}></div>`;

                for(let i = 0; i < infos.results.length; i++ ){
                    // create overview with id api in id html
                    document.getElementById(nameIdImage).innerHTML += 
                    `<a id = "${infos.results[i]['id']}" href='#ancreModale'><img class = "${nameIdImage}" src = "${infos.results[i].image_url}"></a>`;
                    document.getElementById(nameIdImage).addEventListener('click', Request.retrieveId);
                }
            })      
    }
} 

let nbItems = 7;
// create overview
let overview = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&-votes&page_size=${1}`, "Overview", "overview");
// create object
let bestMovieRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=${nbItems}`, "Meilleurs films", "best");
let bestActionRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=action&page_size=${nbItems}`,  "Meilleurs films d'action", "best_action");
let bestAnimationRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=animation&page_size=${nbItems}`,  "Meilleurs films d'animation", "best_animation");
let bestSciFiRequest = new Request(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=sci-fi&page_size=${nbItems}`,  "Meilleurs films de Sci-Fi", "best_sf");

//call
setInterval(overview.overview(),1000);

setInterval(bestMovieRequest.run(),1000);

setInterval(bestActionRequest.run(),1000);

setInterval(bestAnimationRequest.run(),1000);

setInterval(bestSciFiRequest.run(),1000);
