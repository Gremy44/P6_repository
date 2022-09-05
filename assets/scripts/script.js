class Request {

    carousselLength = 7;

    constructor(url, title, div){
        this.url = url;
        this.title = title;
        this.div = div;
    }
    static retrieveOneId(url2){
        return `url2.results[0]['url]`;
    }

    static retrieveId(e){
        const urlFilm = `http://localhost:8000/api/v1/titles/${e['path'][1].id}`;

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
        //this.removeElement("infosFilm");
        //this.removeElement("affiche");
        //this.removeElement("titre");

        fetch(urlFilm)
            .then(values => values.json())
            .then(infosFilm =>{
                console.log(infosFilm);

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
                     <p>Box Office US : ${infosFilm.usa_gross_income}</p>
                     <p>Description : ${infosFilm.description}</p>`;

                document.getElementById("titre").innerHTML += infosFilm.title;

                return console.log(infosFilm.gender);
            })
    }

    overview(){
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {
                console.log(infos.results[0]);

                document.getElementById('video').innerHTML +=
                    `<img class="overview__img" src="${infos.results[0]['image_url']}"></img>`
        
                document.getElementById('res').innerHTML +=
                    `<p class="overview__titre">${infos.results[0]['title']}</p>`

                document.getElementById('res').innerHTML +=
                    `<button class="overview__infos">Informations</button>`

                document.getElementById('res').innerHTML +=
                    `<div class="overview__espace"></div>`

                
                
                fetch(infos.results[0]['url'])
                    .then(values2 => values2.json())
                    .then(infos2 => {
                        console.log(infos2['description']);
                        document.getElementById('res').innerHTML +=
                            `<p class="overview__desc">Description: ${infos2['description']}</p>`
                    })
            })
    }

    run(){
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {
                let div = document.getElementById(this.div);
                let nameIdImage = `images_${this.div}`
                
                //document.getElementById(video).innerHTML +=
                //    `<img src=${infos.results[0].img_url}></img>`

                //div.innerHTML += `<h2 id = t_${this.div}>${this.title}</h2>`;
                div.innerHTML += `<div id='t_${this.div}'>${this.title}</div>`;
                
                div.innerHTML += `<div id = ${nameIdImage}></div>`;

                for(let i = 0; i < infos.results.length; i++ ){
                    document.getElementById(nameIdImage).innerHTML += 
                    `<a id = "${infos.results[i]['id']}" href='#ancreModale'><img class = "${nameIdImage}" src = "${infos.results[i].image_url}"></a>`;
                    document.getElementById(nameIdImage).addEventListener('click', Request.retrieveId);
                }
            })      
    }
} 

let bestMovieRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=7%22", "Meilleurs films", "best");
let bestActionRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=action&page_size=7%22",  "Meilleurs films d'action", "best_action");
let bestAnimationRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=animation&page_size=7%22",  "Meilleurs films d'animation", "best_animation");
let bestSciFiRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=sci-fi&page_size=7%22",  "Meilleurs films de Sci-Fi", "best_sf");

bestMovieRequest.overview();

bestMovieRequest.run();

bestActionRequest.run();

bestAnimationRequest.run();

bestSciFiRequest.run();



