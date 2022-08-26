class Request {

    carousselLength = 7;

    constructor(url){
        this.url = url;
        this.infos;
    }

    filmId(){ 
        
        fetch(this.url)
            .then(reponse => reponse.json())
            .then(infos => {
                for(let i = 0; i < 7; i++){
                    const img = document.createElement("img");
                    img.src = infos.results[i]['image_url'];
                    console.log(infos.results[i])
                    output.appendChild(img);
                }
            })
        } 
}   


let coucou = new Request("http://localhost:8000/api/v1/titles/");
coucou.filmId();

/*.then(reponse => reponse.json())
.then(data => data.results)*/