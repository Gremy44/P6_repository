class Request {

    carousselLength = 7;

    constructor(url, title, div){
        this.url = url;
        this.title = title;
        this.div = div;
    }

    run(){
        fetch(this.url)
            .then(values => values.json())
            .then(infos => {

                let div = document.getElementById(this.div);
                let nameIdImage = `images_${this.div}`

                div.innerHTML += `<h2 id = t_${this.div}>${this.title}</h2>`;
                
                div.innerHTML += `<div id = ${nameIdImage}></div>`;

                for(let i = 0; i < infos.results.length; i++ ){
                    document.getElementById(nameIdImage).innerHTML += 
                    `<a href="#ancreModale"><img class = "i_${nameIdImage}_${i}" src = "${infos.results[i].image_url}"></a>`;
                }
            })      
    }
}  
 


let bestMovieRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=7%22", "Meilleurs films", "best");
let bestActionRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=action&page_size=7%22",  "Meilleurs films d'action", "best_action");
let bestAnimationRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=animation&page_size=7%22",  "Meilleurs films d'animation", "best_animation");
let bestSciFiRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=sci-fi&page_size=7%22",  "Meilleurs films de Sci-Fi", "best_sf");

bestMovieRequest.run();

bestActionRequest.run();

bestAnimationRequest.run();

bestSciFiRequest.run();


