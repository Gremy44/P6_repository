class Request {

    carousselLength = 7;

    constructor(url, id){
        this.url = url;
        this.id = id;

        this.movieImg = [];
        this.title = [];
        this.gender = [];
        this.release = [];
        this.rate = [];
        this.imdbRank = [];
        this.director = [];
        this.actors = [];
        this.length = [];
        this.country = [];
        this.boResults = [];
        this.description = [];
        
        fetch(this.url)
            .then(reponse => reponse.json())
            .then(infos => {
                for(let n = 0; n < this.carousselLength; n++){
                    fetch(infos.results[n]['url'])
                        .then(reponse2 => reponse2.json())
                        .then(infos2 => {
                            this.movieImg.push(infos2['image_url']);
                            this.title.push(infos2['title']);
                            this.gender.push(infos2['genres']);
                            this.release.push(infos2['year']);
                            this.rate.push(infos2['rated']);
                            this.imdbRank.push(infos2['imdb_score']);
                            this.director.push(infos2['directors']);
                            this.actors.push(infos2['actors']);
                            this.length.push(infos2['duration']);
                            this.country.push(infos2['countries']);
                            this.boResults.push(infos2['worldwide_gross_income']);
                            this.description.push(infos2['description']);
                            }) 
                        }     
                    })
              //console.log(this.movieImg)
        }


    titleCategories(){
        const title = document.createElement("h2");

        switch(this.id){
            case 1:
                title.textContent="Nos meilleurs films"
                best.appendChild(title)
            break;
            case 2:
                title.textContent="Nos meilleurs films d'action"
                best_action.appendChild(title)
            break;
            case 3:
                title.textContent="Nos meilleurs films d'animation"
                best_animation.appendChild(title)
            break;
            case 4:
                title.textContent="Nos meilleurs films de sci-fi"
                best_sf.appendChild(title)
            break;
        }
    }

    imgMovies(){  
        /*
                for(let i = 0; i < this.carousselLength; i++){
            // generate 7 movies 
                    const img = document.createElement("img");
                    img.src = this.movieImg;
                // balise selection by id value
                */
        switch(this.id){
            case 0:
                //const mesFilms = this.movieImg[Symbol.iterator]();
               
                console.table(this.movieImg);
                
                console.log("type de ma variable : ", typeof(this.movieImg));
                console.log("taille de la liste : ", this.movieImg.length);
                console.log("liste bizarre : ", this.movieImg);
                console.log("Après la boucle");
                const coucoutest = ["coucou1","coucou2","coucou3"]
                console.log("coucou : ", coucoutest)
                console.log("type coucou : ", typeof(coucoutest))
                        //const img = document.createElement("img");
                        //img.src = filmUrl;
                        //best.appendChild(img);
                break;
            case 1:
                    //best_action.appendChild(img);
                break;
            case 2:
                    //best_animation.appendChild(img);
                break;
            case 3:
                    //best_sf.appendChild(img);
                break;
            
        }
    }      
}   


let bestMovieRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&page_size=7%22", 0);
let bestActionRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=action&page_size=7%22", 1);
let bestAnimationRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=animation&page_size=7%22", 2);
let bestSciFiRequest = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score%2C-votes&genre=sci-fi&page_size=7%22", 3);

bestMovieRequest.titleCategories();
bestMovieRequest.imgMovies();

bestActionRequest.titleCategories();
bestActionRequest.imgMovies();

bestAnimationRequest.titleCategories();
bestAnimationRequest.imgMovies();

bestSciFiRequest.titleCategories();
bestSciFiRequest.imgMovies();
