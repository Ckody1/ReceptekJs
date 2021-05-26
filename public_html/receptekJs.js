$(function(){ 
    $.ajax({
        url: "receptek.json",
        success: function(result){
            console.log(result);
            receptekTomb = result;
            kiir();
        }
    }); 
    $("#bal").click(balraLeptet);
    $("#jobb").click(jobbraLeptet);
    $("article").on("click", "tr", receptKivalaszt);
});

var receptekTomb = [];
var leptetoIndex = 0;

function kiir(){
    $("article").append("<table>");
    $("article table").append("<tr>");
    $("article table tr").append("<th>Recept név</th><th>Elkészítési idő</th><th>Leírás</th><th>Kép</th><th>Hozzávalók</th>");
    
    for (var i = 0; i < receptekTomb.length; i++) {
        $("article table").append("<tr id='"+ i +"'>");
        for (var item in receptekTomb[i]) {
            $("article table tr").eq(i + 1).append("<td>" + receptekTomb[i][item] + "</td>");
        }
    }
    //$("article table tr").click(receptKivalaszt());
}

function receptKivalaszt(){
//    console.log("itt vagyok");
    
    var id = $(this).attr("id");
    console.log(id);
    console.log(receptekTomb[id]);
    leptetoIndex = id;
    megjelenit(id);
}

function megjelenit(id){
    $("#recept").empty();
    $("#recept").append("<img src='" +receptekTomb[id].kep+"' alt='"+receptekTomb[id].nev+"'>")
    $("#recept").append("<h2>");
    $("#recept h2").append(receptekTomb[id].nev);
    $("#recept").append("<p>");
    $("#recept p").append(receptekTomb[id].leiras);
    $("#recept").append("<p>");
    $("#recept p").eq(1).append("Elkészítési idő: " + receptekTomb[id].ido);
    $("#recept").append("<h3>");
    $("#recept h3").append("Hozzávalók");
    $("#recept").append("<ul>");
    var hozzavalok = receptekTomb[id].hozzavalok;
    console.log(hozzavalok);
    for (var i = 0; i < hozzavalok.length; i++) {
        for (var item in hozzavalok[i]) {
            $("#recept ul").append("<li>"+ item + " " + hozzavalok[i][item] + "</li>");
        }
    }
}

function balraLeptet(){
    leptetoIndex --;
    if(leptetoIndex < 0){
        leptetoIndex = receptekTomb.length-1;
    }
    megjelenit(leptetoIndex);
}
function jobbraLeptet(){
    leptetoIndex ++;
    if(leptetoIndex > receptekTomb.length - 1){
        leptetoIndex = 0;
    }
    megjelenit(leptetoIndex);
}