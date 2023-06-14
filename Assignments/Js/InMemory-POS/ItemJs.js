initiateUI();

function initiateUI() {
    clearAll();
    $("#customerContent").css("display", "block");

    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "ordersContent":
            localStorage.setItem("view", "ORDERS");
            break;
        case "placeOrdersContent":
            localStorage.setItem("view", "PLACEORDERS");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDERS":
            setView($("#ordersContent"));
            break;
        case "PLACEORDERS":
            setView($("#placeOrdersContent"));
            break;
        default:
            setView($("#customerContent"));
    }
}

function clearAll() {
    $("#customerContent,#itemContent,#ordersContent,#placeOrdersContent").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#customers").click(function () {
    setView($("#customerContent"));
});

$("#items").click(function () {
    setView($("#itemContent"));
});

$("#orders").click(function () {
    setView($("#ordersContent"));
});

$("#placeOrders").click(function () {
    setView($("#placeOrdersContent"));
});


var items=[];

$("#btnItemSave").click(function (){
    let itemIds=$("#txtItemId").val();
    let itemDescription=$("#txtItemDescription").val();
    let itemUnitprice=$("#txtItemUnitprice").val();
    let itemQty=$("#txtItemQty").val();

    var itemObject={
        itemId:itemIds,
        descriptions:itemDescription,
        unitprice:itemUnitprice,
        qty:itemQty

    }

    items.push(itemObject);

    loadAllItems();
    loadAllItemId();

    bindRowClickEventsItems();
});


function bindRowClickEventsItems() {
    $("#tblItem>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let descriptions = $(this).children(":eq(1)").text();
        let unitprice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();

        $('#txtItemId').val(itemId);
        $('#txtItemDescription').val(descriptions);
        $('#txtItemUnitprice').val(unitprice);
        $('#txtItemQty').val(qty);

    });
}


function loadAllItems() {

    $("#tblItem").empty();

    for (var item of items) {
        var row = `<tr><td>${item.itemId}</td><td>${item.descriptions}</td><td>${item.unitprice}</td><td>${item.qty}</td></tr>`;

        $("#tblItem").append(row);
    }
}


$("#btnItemDelete").click(function (){
    /*bindRowClickEventsItems();*/
    let deleteIds=$("#txtItemId").val();

    let option=confirm("Do you Sure?"+deleteIds);
    if (option){
        if (deleteItem(deleteIds)) {
            alert("Item Successfully Deleted..");
            setTextfieldValuesItem("", "", "", "");
        } else {
            alert("No such Item to delete");
        }
    }
});

$("#btnClearItem").click(function (){
    $('#txtItemId').val("");
    $('#txtItemDescription').val("");
    $('#txtItemUnitprice').val("");
    $('#txtItemQty').val("");
});


$("#btnItemUpdate").click(function () {
   /* bindRowClickEventsItems();*/
    let ItemId = $("#txtItemId").val();
    let responses = updateItem(ItemId);
    if (responses) {
        alert("Item Updated Successfully");
        setTextfieldValuesItem("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});


$("#txtItemId").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedIds = $("#txtItemId").val();
        let item = searchItem(typedIds);
        if (item != null) {
            setTextfieldValuesItem(item.itemId, item.descriptions, item.unitprice, item.qty);
        } else {
            alert("There is no cusotmer available for that " + typedIds);
            setTextfieldValuesItem("", "", "", "");
        }
    }
});

function deleteItem(ItemID) {
    let Item = searchItem(ItemID);
    if (Item != null) {
        let indexNumber = items.indexOf(Item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValuesItem(itemId, descriptions, unitprice, qty) {
    bindRowClickEventsItems();
    $("#txtItemId").val(itemId);
    $("#txtItemDescription").val(descriptions);
    $("#txtItemUnitprice").val(unitprice);
    $("#txtItemQty").val(qty);
}


function searchItem(itemID) {
    for (let item of items) {
        if (item.itemId == itemID) {
            return item;
        }
    }
    return null;
}

function updateItem(Items) {
    let item = searchItem(Items);
    if (item != null) {
        item.itemId = $("#txtItemId").val();
        item.descriptions = $("#txtItemDescription").val();
        item.unitprice = $("#txtItemUnitprice").val();
        item.qty = $("#txtItemQty").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }

}

