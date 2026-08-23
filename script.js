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
const file = document.getElementById("file");
const title = document.getElementById("title");
const url = document.getElementById("url");
const text = document.getElementById("text");
const searchEngine = document.getElementById("searchEngine");

const optional = document.getElementById("optional");
const optional_toggle = document.getElementById("optional_toggle");
optional_toggle.addEventListener("click", function() {optional_toggle_on = 1 - optional_toggle_on; if (optional_toggle_on === 1) {optional.style.display = "block"} else {optional.style.display = "none"};});

document.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        search();
    }
});

const tips = ["Tip: Non-required fields are not required!", "Tip: Press enter to search", "Tip: You can't search when a required field is blank"];
const warnings = ["Required field left blank"]

generate_tip();

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
    generate_tip();
    engine = searchEngine.value;
    getQueryElements();
    let status = formQuery();
    if (status == 0) {
        link = engineIntro[engine] + query;

        window.open(link);
    }
    else {
        display_warning(0);
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

function display_warning(warning) {
    message.innerHTML = warnings[warning]
}

function generate_tip() {
    let number = Math.floor(Math.random()*tips.length);
    message.innerHTML = tips[number];
};

setInterval(check_button_status, 10);

function check_button_status() {
    getQueryElements();
    if (formQuery() == 0) {
        searchButton.disabled = false;
        searchButton.style.cursor = "pointer";
    }
    else {
        searchButton.disabled = true;
        searchButton.style.cursor = "not-allowed";
    }
}
