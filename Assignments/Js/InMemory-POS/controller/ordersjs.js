
/*var orders=[];*/

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
    $("#itemIdOrd").empty();
    for (let itemArElement of items){
        $("#itemIdOrd").append(`<option>${itemArElement.itemId}</option>`);
    }
}

$("#itemIdOrd").on('change',function (){

    let items=searchItem($('#itemIdOrd').val());

    $("#item").val(items.descriptions);
    $("#priceOrd").val(items.unitprice);
    $("#qtyOnHandOrd").val(items.qty);

});

$('#btnAddToCart').click(function (){

    let itemCode=$('#itemIdOrd').val();
    let itmName = $('#item').val();
    let itmPrice = $('#priceOrd').val();
    let itemOrderQty = $('#orderQty').val();

    let total =itmPrice*itemOrderQty;


    let rowExists = searchRowExists(itemCode);
    if(rowExists!=null){
        let newQty=((parseInt(rowExists.orItemQTY))+(parseInt(itemOrderQty)));


        rowExists.orItemQTY=newQty;
        rowExists.orItemTotal=parseFloat(itmPrice)*newQty;
        addCartData();

    }else{
        tempCartModal(itemCode,itmName,itmPrice,itemOrderQty,total)
        addCartData();
    }

    minQty(itemCode,itemOrderQty);

});

function addCartData() {
    $("#tblCart> tr").detach();

    for (var tc of tempOrderCartAr){
        var row="<tr><td>"+tc.orItemCOde+"</td><td>"+tc.orItemName+"</td><td>"+tc.orItemPrice+"</td><td>"+tc.orItemQTY+"</td><td>"+tc.orItemTotal+"</td></tr>";
        $('#tblCart').append(row);
    }
    trCusSelector();
    getTotal();
}

let tempTot=0;
function getTotal() {

    for (let tempOrderCartArElement of tempOrderCartAr) {
        tempTot=tempTot+tempOrderCartArElement.orItemTotal;
    }
    $('#total').val(tempTot);

}

let disTOGave=0;
$('#discount').on('keyup',function (){
    let dis=$('#discount').val();
    let tot=$('#total').val();
    var totMin=0;
    let subTot=0;

    console.log(dis+"=="+tot);
    totMin=parseFloat(tot)*(dis/100);
    console.log("dis Dis: "+totMin)

    subTot=tot-totMin;
    disTOGave=totMin;

    $('#subTotal').val(subTot);


})


$('#cash').on('keyup',function (){
    let cash=$('#cash').val();
    let subT=$('#subTotal').val();


   /* $('#balance').val((cash-subT)-tempTot);*/
    $('#balance').val((parseFloat(cash-subT))-parseFloat(tempTot));
})


function searchRowExists(itemCode) {
    for (let tempOr of tempOrderCartAr) {
        console.log(tempOr.orItemCOde+"-----"+itemCode);
        if(tempOr.orItemCOde===itemCode){
            return tempOr
        }
    }
    return null;
}

function minQty(itemCode,orderQty) {
    for (let itemArElement of itemAr) {
        if(itemArElement.itemCode===itemCode){
            itemArElement.qtyOnHand=parseInt(itemArElement.qtyOnHand)-parseInt(orderQty);
        }
    }
    addTable();
    clearData();
}

function clearData() {
    $('#qtyOnHandOrd').val("");
    $('#item').val("");
    $('#priceOrd').val("");
    $('#orderQty').val("");
}

$('#purchaseOrder').click(function (){
    let orderId = $('#orderId').val();
    let orderDate = $('#OrderDate').val();
    let customerName = $('#customerNameOrd').val();
    let discount = disTOGave;
    let subTotal = $('#subTotal').val();

    orderModal(orderId,orderDate,customerName,discount,subTotal);

    loadAllOrder();
    blindOrderRowClickEvent();
    clearOrderTexts();

    for (var tempOrder of tempOrderCartAr){
        tempOrderCartAr.pop();
    }
    tempOrderCartAr.pop();
    addCartData();

    // console.log(orderArray);
});

function blindOrderRowClickEvent(){

    $('#tblOrder>tr').click(function (){
        let ordId = $(this).children(':eq(0)').text();
        $('#orderIdDash').val(ordId);
        let ordDate = $(this).children(':eq(1)').text();
        $('#OrderDateDash').val(ordDate);
        let ordName = $(this).children(':eq(2)').text();
        $('#customerNameDash').val(ordName);
        let ordDis = $(this).children(':eq(3)').text();
        $('#discountDash').val(ordDis);
        let ordCost = $(this).children(':eq(4)').text();
        $('#subTotDash').val(ordCost);
    });
}

function clearOrderTexts(){
    $('#orderId').val("");
    $('#OrderDate').val("");
    $('#customerNameOrd').val("");


    $('#item').val("");
    $('#priceOrd').val("");
    $('#qtyOnHandOrd').val(0);
    $('#orderQty').val("");

    $('#cash').val("");
    $('#discount').val(0);
    $('#balance').val("");
    $('#subTotal').val(0);
}

function loadAllOrder(){
    $("#tblOrder> tr").detach();
    for (var i of orders){
        $('#tblOrder').append('<tr><td>'+i.orId+'</td>'+'<td>'+i.orDate+'</td>'+'<td>'+i.orCusName+'</td>'+'<td>'+i.orDis+'</td>'+'<td>'+i.orSubTotal+'</td></tr>');
    }
}