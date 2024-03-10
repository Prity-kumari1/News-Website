const Api_key = "f20ecc1af2eb4ce788902720b6b157a9";
const url = "https://newsapi.org/v2/everything?q=";
// window.addEventListener("load", ()=> fetchNews("india"))
// async function fetchNews(query){
//     const res = await fetch(`${url}${query}&apiKey=${Api_key}`);
//     const data = await res.json();
//     console.log(data);

// }
window.addEventListener("load", () => fetchNews("india"))
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${Api_key}`)
    let data = await res.json();
    console.log(data);
    bindData(data.articles)
}
function bindData(articles) {
    let cardContainer = document.getElementById("card-container");
    const newsTemp = document.getElementById("templete=news");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (article.urlToImage == true) return;
        const cardClone = newsTemp.content.cloneNode(true);
        // means we want to deep closing all inside element should close

        fillData(cardClone, article);
        cardContainer.appendChild(cardClone)
    })
    function fillData(cardClone, article) {
        const newsImg = cardClone.querySelector("#news-img")
        const newsTitle = cardClone.querySelector("#news-title")
        const newsSource = cardClone.querySelector("#news-source")
        const newsDesc = cardClone.querySelector("#news-desc");

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;
        newsSource.innerHTML = article.source;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        newsSource.innerHTML = `${article.source.name} . ${date}`;

        cardClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
    }
}
 function reload(){
    window.location.reload();
 }
function navItemClick(id){
    fetchNews(id);
}
const searchBtn = document.querySelector("#search-btn");
const inp = document.querySelector("#search-text");
searchBtn.addEventListener("click", ()=>{
    const query = inp.value;
    console.log(query);
    if(!query) return;
    fetchNews(query)
})