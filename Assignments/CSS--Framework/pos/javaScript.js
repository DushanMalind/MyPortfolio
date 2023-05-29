/*
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
*/


document.getElementById("save").addEventListener("click",function (){
    let id=document.getElementById("txtCustomerID").value;
    let name=document.getElementById("txtCustomerName").value;
    let address=document.getElementById("txtCustomerAddress").value;
    let contact=document.getElementById("txtCustomerContact").value;


   let txtId= document.createElement("td");
   let b=document.createElement("td");
   let c=document.createElement("td");
   let d=document.createElement("td");

txtId.appendChild(id);
b.appendChild(name);
c.appendChild(address);
d.appendChild(contact);

   let g=document.createElement("tr");
   g.appendChild(txtId);
   g.appendChild(b);
   g.appendChild(c);
   g.appendChild(d);

  document.getElementById("tblCustomer").appendChild(g);


});

