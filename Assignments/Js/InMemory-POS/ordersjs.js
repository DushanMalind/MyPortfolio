function loadAllCustomerId(){
    $("#customerOrdID").empty();
    for (let customerArElement of customers){
        $("#customerOrdID").append(`<option>${customerArElement.id}</option>`);
    }
}

$("#customerOrdID").on('change',function (){

    let customer=searchCustomer($('#customerOrdID').val());

    $("#customerNameOrd").val(customer.name);
});



function loadAllItemId(){
    $("#ItemIdOrd").empty();
    for (let itemArElement of items){
        $("#ItemIdOrd").append(`<option>${itemArElement.itemId}</option>`);
    }
}

$("#ItemIdOrd").on('change',function (){

    let customer=searchItem($('#ItemIdOrd').val());

    $("#desOrd").val(customer.descriptions);
    $("#qtyOrd").val(customer.unitprice);
    $("#unitOrd").val(customer.qty);

});