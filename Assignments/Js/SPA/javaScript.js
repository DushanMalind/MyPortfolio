document.getElementById("customer")
document.getElementById("item").style.display="none";
document.getElementById("orders").style.display="none";
document.getElementById("placeOrders").style.display="none";

document.getElementById("customers").addEventListener("click",function (){
    document.getElementById("customer").style.display="block"
    document.getElementById("item").style.display="none";
    document.getElementById("orders").style.display="none";
    document.getElementById("placeOrders").style.display="none";
});


document.getElementById("save").addEventListener("click",function (){
    let id=document.getElementById("ids").value;
    let name=document.getElementById("name").value;
    let address=document.getElementById("address").value;
    let contact=document.getElementById("contact").value;


   let a= document.createElement("td").append(id);
   let b=document.createElement("td").append(name);
   let c=document.createElement("td").append(address);
   let d=document.createElement("td").append(contact);

   let g=document.createElement("tr");
   e.appendChild(a);
   e.appendChild(b);
   e.appendChild(c);
   e.appendChild(d);

  document.getElementById("tbodys").appendChild(g);


});

