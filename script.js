const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming");
xhr.setRequestHeader(
  "X-RapidAPI-Key",
  "793e216f59msh057c7b9472fd3b2p1d75cajsnc20ef2e25c86"
);
xhr.setRequestHeader("X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com");

xhr.send(data);
