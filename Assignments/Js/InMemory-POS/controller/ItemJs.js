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


/*var items = [];*/

$("#btnItemSave").click(function () {
    itemSave();
    /* let itemIds=$("#txtItemId").val();
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

     bindRowClickEventsItems();*/
});

function itemSave() {
    let itemIds = $("#txtItemId").val();
    if (searchItem(itemIds.trim()) == undefined) {
        let itemDescription = $("#txtItemDescription").val();
        let itemUnitprice = $("#txtItemUnitprice").val();
        let itemQty = $("#txtItemQty").val();

       /* var itemObject = {
            itemId: itemIds,
            descriptions: itemDescription,
            unitprice: itemUnitprice,
            qty: itemQty

        }
*/

        let newItems=Object.assign({},itemObject);
        newItems.itemId=itemIds;
        newItems.descriptions=itemDescription;
        newItems.unitprice=itemUnitprice;
        newItems.qty=itemQty;

        items.push(newItems);

        loadAllItems();
        loadAllItemId();

        bindRowClickEventsItems();
        clearCustomerInputFieldsItem();
    } else {
        alert("Item already exits.!");
    }
}

function clearItemData() {
    $('#txtItemId').val("");
    $('#txtItemDescription').val("");
    $('#txtItemUnitprice').val("");
    $('#txtItemQty').val("");
}


$('#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty').keydown(function (e) {
    /* e.preventDefault();*/
    if (e.key == "Tab") {
        e.preventDefault();
    }

    $("#txtItemId").keydown(function (e) {
        let itemId = $("#txtItemId").val();

        if (e.key == "Enter") {
            if (itmIDRegEx.test(itemId)) {
                $("#txtItemDescription").focus();
            } else {

            }

        }
    });

    let itemDesc = $("#txtItemDescription").val();

    $("#txtItemDescription").keydown(function (e) {
        if (e.key == "Enter") {
            if (itemDescRegEx.test(itemDesc)) {
                $("#txtItemUnitprice").focus();
            }

        }
    });

    let itemUnit = $("#txtItemUnitprice").val();
    $("#txtItemUnitprice").keydown(function (e) {
        if (e.key == "Enter") {
            if (itemUnitRegEx.test(itemUnit)) {
                $("#txtItemQty").focus();
            }

        }
    });

    let itemQty = $("#txtItemQty").val();
    $("#txtItemQty").keydown(function (e) {
        if (e.key == "Enter") {
            if (itemQTYtRegEx.test(itemQty)) {
                $("#btnItemSave").focus();
            }

        }
    });


})

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

        setItemButtonUpdate(2);
        $("#btnItemUpdate").attr('disabled', false);
    });
    $("#btnItemUpdate").attr('disabled', true);
}

function setItemButtonUpdate(value) {
    if (value > 1) {
        $("#btnItemUpdate").attr('disabled', true);
    } else {
        $("#btnItemUpdate").attr('disabled', disabled);
    }
}

function loadAllItems() {

    $("#tblItem").empty();

    for (var item of items) {
        var row = `<tr><td>${item.itemId}</td><td>${item.descriptions}</td><td>${item.unitprice}</td><td>${item.qty}</td></tr>`;

        $("#tblItem").append(row);
    }
}


$("#btnItemDelete").click(function () {
    /*bindRowClickEventsItems();*/
    let deleteIds = $("#txtItemId").val();

    let option = confirm("Do you Sure?" + deleteIds);
    if (option) {
        if (deleteItem(deleteIds)) {
            alert("Item Successfully Deleted..");
            setTextfieldValuesItem("", "", "", "");
        } else {
            alert("No such Item to delete");
        }
    }
});

$("#btnClearItem").click(function () {
    clearItemData();
    /*$('#txtItemId').val("");
    $('#txtItemDescription').val("");
    $('#txtItemUnitprice').val("");
    $('#txtItemQty').val("");*/
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

function addTable() {
    $("#tblItem> tr").detach();

    for (var itm of itemAr){
        var row="<tr><td>"+itm.itemId+"</td><td>"+itm.descriptions+"</td><td>"+itm.unitprice+"</td><td>"+itm.qty+"</td></tr>";
        $('#tblItem').append(row);
    }
    trSelector();

}
/*/!**
 ///////////////////////////////////////////////////////
 **!/
const itmIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemDescRegEx = /^[A-z ]{5,20}$/;
const itemUnitRegEx = /^[0-9/A-z. ,]{7,}$/;
const itemQTYtRegEx = /^[0-9]{1,}[0-9]{1,2}$/;

$("#txtCustomerID").focus();

let itemValideaction = [];

itemValideaction.push({reg: itmIDRegEx, field: $('#txtItemId'), error: 'Item ID Pattern is Wrong : I00-001'});
itemValideaction.push({
    reg: itemDescRegEx,
    field: $('#txtItemDescription'),
    error: 'Item Description Pattern is Wrong : Ram'
});
itemValideaction.push({
    reg: itemUnitRegEx,
    field: $('#txtItemUnitprice'),
    error: 'Item UnitPrice Pattern is Wrong : 2000.00'
});
itemValideaction.push({reg: itemQTYtRegEx, field: $('#txtItemQty'), error: 'Item Qty Pattern is Wrong : 10'});

$('#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty').on('keyup', function (event) {
    checkCusValidityItem();
});

$('#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty').on('blur', function (event) {
    checkCusValidityItem();
});


function checkCusValidityItem() {
    let errorCount = 0;
    for (let validation of itemValideaction) {
        if (checkItem(validation.reg, validation.field)) {
            textItemSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setItemTextError(validation.field, validation.error);
        }
    }
    setItemButtonState(errorCount);
}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textItemSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setItemTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function defaultCusText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function setItemButtonState(value) {
    if (value > 0) {
        $("#btnItemSave").attr('disabled', true);
    } else {
        $("#btnItemSave").attr('disabled', false);
    }
}

$("#btnClearItem").click(function () {
    clearAllItemData();
});

function clearAllItemData() {
    $('#txtItemId').val("");
    $('#txtItemDescription').val("");
    $('#txtItemUnitprice').val("");
    $('#txtItemQty').val("");

    $('#itemId').val("");
    $('#descriptions').val("");
    $('#unitprice').val("");
    $('#qty').val("");
}*/




