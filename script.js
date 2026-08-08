let query;
let link;
let engine = "DuckDuckGo";

let queryElements = {
    all: [],
    specific: "",
    none: [],
    site: "",
};

const engineIntro = {"DuckDuckGo": "https://www.duckduckgo.com/?q=",
    "StartPage": "https://www.startpage.com/do/metasearch.pl?query=", 
    "Google": "https://www.google.com/search?hl=en&q=",
    "Bing": "https://www.bing.com/search?q=",
    "Yahoo": "https://search.yahoo.com/search?p=",
    "Ecosia": "https://www.ecosia.org/search?method=index&q="
};

const all = document.getElementById("all");
const specific = document.getElementById("specific");
const none = document.getElementById("none");
const site = document.getElementById("site");
const searchEngine = document.getElementById("searchEngine")

function getQueryElements() {
    queryElements.all = all.value.split(/\s+/);
    queryElements.specific = specific.value;
    queryElements.none = none.value.split(/\s+/);
    queryElements.site = site.value;
}

function formQuery() {
    query = "";
    for (let i = 0; i < queryElements.all.length; i++) {
        query += queryElements.all[i] + "%20"; //  whitespace represented in percentage encoding for url
    }

    query += "\"" + queryElements.specific + "\"" + "%20";

    for (let i = 0; i < queryElements.none.length; i++) {
        query += "-" + queryElements.none[i] + "%20"; // minus sign does not require percentage encoding
    }

    if (!(queryElements.site === "")) {
        query += "site%3A" + queryElements.site; // colon represented with percentage encoding
    }
}

function search() {
    engine = searchEngine.value;
    getQueryElements();
    formQuery();
    link = engineIntro[engine] + query;

    window.open(link);
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);
