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
/*
<script>
    /!* document.getElementById("customers").addEventListener("click",function (){
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

});*!/

    var customers=[];

    $("#save").click(function (){
    let cusId=$("#txtCustomerID").val();
    let cusName=$("#txtCustomerName").val();
    let cusAddress=$("#txtCustomerAddress").val();
    let cusContact=$("#txtCustomerContact").val();

    var customerObject={
    id:cusId,
    name:cusName,
    address:cusAddress,
    contact:cusContact

}

    customers.push(customerObject);

    loadAllCustomers();

    bindRowClickEvents();
});


    function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);

    });
}


    function loadAllCustomers() {

    $("#tblCustomer").empty();

    for (var customer of customers) {
    var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

    $("#tblCustomer").append(row);
}
}


    $("#btnDelete").click(function (){

    let deleteId=$("#txtCustomerID").val();

    let option=confirm("Do you Sure?"+deleteId);
    if (option){
    if (deleteCustomer(deleteId)) {
    alert("Customer Successfully Deleted..");
    setTextfieldValues("", "", "", "");
} else {
    alert("No such customer to delete");
}
}
});

    $("#btnUpdate").click(function () {
    let customerID = $("#txtCustomerID").val();
    let response = updateCustomer(customerID);
    if (response) {
    alert("Customer Updated Successfully");
    setTextfieldValues("", "", "", "");
} else {
    alert("Update Failed..!");

}
});


    $("#txtCustomerID").on('keyup', function (event) {
    if (event.code == "Enter") {
    let typedId = $("#txtCustomerID").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
    setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
} else {
    alert("There is no cusotmer available for that " + typedId);
    setTextfieldValues("", "", "", "");
}
}
});

    function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
    let indexNumber = customers.indexOf(customer);
    customers.splice(indexNumber, 1);
    loadAllCustomers();
    return true;
} else {
    return false;
}
}

    function setTextfieldValues(id, name, address, contact) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}


    function searchCustomer(cusID) {
    for (let customer of customers) {
    if (customer.id == cusID) {
    return customer;
}
}
    return null;
}

    function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
    customer.id = $("#txtCustomerID").val();
    customer.name = $("#txtCustomerName").val();
    customer.address = $("#txtCustomerAddress").val();
    customer.contact = $("#txtCustomerContact").val();
    loadAllCustomers();
    return true;
} else {
    return false;
}

}

</script>*/




