
function sendAndLoad() {
    inschrijvenToernooi();
    //window.location.reload();
}

function ophalenInschrijvingen() {
    //alert("opgehaald");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var haalGegevensJSON = this.responseText;
            console.log(haalGegevensJSON);
            var haalGegevens = JSON.parse(haalGegevensJSON);
            console.log(haalGegevens);
            var arr = haalGegevens;
            var tabel = "<table border = '1'><tr><th>ID</th><th>Voornaam</th><th>Achternaam</th><th>Rating</th><th>Leeftijd</th><th>Geslacht</th><th></th>"
            for (var i=0;i<arr.length;i++){
                tabel+="<tr><td>"+arr[i].squashClubMemberId+"</td><td>"+arr[i].firstName+"</td><td>"+arr[i].lastName+"</td><td>"+arr[i].rating+"</td><td>"+arr[i].age+"</td><td>"+arr[i].gender+"</td><td><button class='deletebtn' onclick='deleteMember("+arr[i].squashClubMemberId+")' style='vertical-align:middle'><span>Delete</span></button></td></tr>"
            }
            tabel+="</table>";
            document.getElementById("memberlist").innerHTML = tabel;
            document.getElementById("totaalaantalspelers").innerHTML = "Totaal aantal spelers: " + arr.length;
            //console.log(arr.length);
            document.getElementById("ledenlijstnaam").innerHTML = "Spelerlijst ";
        }
    }
    xhr.open("GET", "http://localhost:8082/allsquashclubmembers", true);
    xhr.send();
}

function deleteMember(squashClubMemberId) {
    console.log("delete");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () { }
    xhr.open("DELETE", "http://localhost:8082/squashclubmembers/" + squashClubMemberId + "/delete", true)
    xhr.send();
    window.location.reload();
}

function inschrijvenToernooi() {
    //alert("verstuurd")
    var voornaam = document.getElementById("vn").value;
    var achternaam = document.getElementById("an").value;
    var rating = document.getElementById("rating").value;
    var geslacht = document.getElementById("geslacht").value;
    var geboortedatum = document.getElementById("gebdat").value;

    var mijnGegevensObject = {}
    mijnGegevensObject.firstName = voornaam;
    mijnGegevensObject.lastName = achternaam;
    mijnGegevensObject.rating = rating;
    mijnGegevensObject.gender = geslacht;
    mijnGegevensObject.dateOfBirth = geboortedatum;

    var mijnGegevens = JSON.stringify(mijnGegevensObject)
    console.log(mijnGegevens);
    postDataInschrijvenToernooi(mijnGegevens);    
}

function postDataInschrijvenToernooi(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 202) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "http://localhost:8082/allsquashclubmembers", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
    //console.log(data);
}

function zoeken() {
    var zoekterm = document.getElementById("zoekterm").value;
    var mijnZoekterm = JSON.stringify(zoekterm);
    var zoekfunctie = new XMLHttpRequest();
    zoekfunctie.onreadystatechange = function() {
    }
    zoekfunctie.open("GET", "http://localhost:8082/zoek/" + zoekterm, true);
    zoekfunctie.send();
    alert("gezocht op: " + zoekterm);
}

function scoresOphalen() {
}

function scoresInvoeren() {
    var match_id = document.getElementById("match_id").value;
    var score1 = document.getElementById("score1").value;
    var score2 = document.getElementById("score2").value;
    var scoreObject = {}
    scoreObject.scorePlayer1 = score1;
    scoreObject.scorePlayer2 = score2;
    scoreObject.match_id = match_id;
    var scoreGegevens = JSON.stringify(scoreObject)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        console.log(scoreGegevens);
        if(this.readyState == 4 && this.status == 202){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("PUT", "http:/localhost:8082/admin/scoreinput/"+match_id+"/"+score1+"/"+score2, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(scoreGegevens);
    
}