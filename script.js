let query;
let link;
let engine = "DuckDuckGo";

let optional_toggle_on = 0;

let queryElements = {
    all: [],
    specific: "",
    none: [],
    site: "",
    file: "",
    title: "",
    url: "",
    text: "",
};

let noaiend = "";
let noaistart = "";

const engineIntro = {"DuckDuckGo": "duckduckgo.com/?q=",
    "StartPage": "startpage.com/do/metasearch.pl?query=", 
    "Google": "google.com/search?hl=en&q=",
    "Bing": "bing.com/search?q=",
    "Yahoo": "search.yahoo.com/search?p=",
    "Ecosia": "ecosia.org/search?method=index&q="
};

const all = document.getElementById("all");
const specific = document.getElementById("specific");
const none = document.getElementById("none");
const site = document.getElementById("site");
const file = document.getElementById("file");
const title = document.getElementById("title");
const url = document.getElementById("url");
const text = document.getElementById("text");
const searchEngine = document.getElementById("searchEngine");

const aitoggle = document.getElementById("aitoggle");
const ailabel = document.getElementById("ailabel");

const optional = document.getElementById("optional");
const optional_toggle = document.getElementById("optional_toggle");
optional_toggle.addEventListener("click", function() {
    optional_toggle_on = 1 - optional_toggle_on;
    if (optional_toggle_on === 1) {
        popup.style.top = "620px";
        optional.style.display = "block"
    }
    else {
        popup.style.top = "320px";
        optional.style.display = "none"
    };
});

document.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        search();
    }
});

setInterval(function() {
    let searchEngineSTR = searchEngine.value;
    if (searchEngineSTR === "Google" || searchEngineSTR === "DuckDuckGo") {
        aitoggle.style.display = "inline";
        ailabel.style.display = "inline"
    }
    else {
        aitoggle.style.display = "none";
        ailabel.style.display = "none";
        aitoggle.checked = false;
    }
    if (aitoggle.checked) {
        if (searchEngineSTR === "Google") {
            noaiend = "&udm=14"
        }
        else {noaiend = ""}
        if (searchEngineSTR === "DuckDuckGo") {
            noaistart = "noai."
        }
        else {noaistart = ""}
    }
    else {
        noaistart = "";
        noaiend = "";
    }
}, 10);

const tips = ["Tip: Non-required fields are not required!", "Tip: Press enter to search", "Tip: You can't search when a required field is blank"];
const warnings = ["Required field left blank"]

function getQueryElements() {
    queryElements.all = all.value.split(/\s+/);
    queryElements.specific = specific.value;
    queryElements.none = none.value.split(/\s+/);
    queryElements.site = site.value;
    if (optional_toggle_on === 1) {
        queryElements.file = file.value;
        queryElements.title = title.value;
        queryElements.url = url.value;
        queryElements.text = text.value;
    }
}

function formQuery() {
    let status = 0;
    query = "";
    for (let i = 0; i < queryElements.all.length; i++) {
        query += queryElements.all[i] + "%20"; //  whitespace represented in percentage encoding for url
    }
    if (query === "%20") {
        status = 1;
    }

    if (queryElements.specific != "") {
        status = 0;
        query += "\"" + queryElements.specific + "\"" + "%20";
    }

    if (queryElements.none[0] != "") {
        for (let i = 0; i < queryElements.none.length; i++) {
            query += "-" + queryElements.none[i] + "%20"; // minus sign does not require percentage encoding
        }
    }

    if (!(queryElements.site === "")) {
        query += "site%3A" + queryElements.site + "%20"; // colon represented with percentage encoding
    }

    if (optional_toggle_on === 1) {
        if (!(queryElements.file === "")) {
            query += "filetype%3A" + queryElements.file + "%20";
        }
        if (!(queryElements.title === "")) {
            query += "intitle%3A" + queryElements.title + "%20";
        }
        if (!(queryElements.url === "")) {
            query += "inurl%3A" + queryElements.url + "%20";
        }
        if (!(queryElements.text === "")) {
            query += "intext%3A" + queryElements.text + "%20";
        }
    }
    return status;
}

function search() {
    engine = searchEngine.value;
    getQueryElements();
    let status = formQuery();
    if (status == 0) {
        link = "https://" + noaistart + engineIntro[engine] + query + noaiend;
        alert(link);

        window.open(link);
    }
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
    all.value = "";
    specific.value = "";
    none.value = "";
    site.value = "";
    file.value = "";
    title.value = "";
    url.value = "";
    text.value = "";
});

setInterval(check_button_status, 10);

let searchValid;

function check_button_status() {
    getQueryElements();
    if (formQuery() == 0) {
        searchButton.disabled = false;
        searchButton.style.cursor = "pointer";
        searchButton.style.backgroundColor = "#f4ebb9";
        searchButton.style.color = "black";
        searchValid = true;
    }
    else {
        searchButton.disabled = true;
        searchButton.style.cursor = "not-allowed";
        searchButton.style.backgroundColor = "#1f1f39";
        searchButton.style.color = "#85848f";
        searchValid = false;
    }
}

const popup = document.getElementById("popup");
popup.style.display = "none";

searchButton.addEventListener("mouseover", () => {
    if (!searchValid) {
        popup.style.display = "inline";
    }
    else {
        popup.style.display = "none";
    }
});
searchButton.addEventListener("mouseout", () => {
    popup.style.display = "none";
});
