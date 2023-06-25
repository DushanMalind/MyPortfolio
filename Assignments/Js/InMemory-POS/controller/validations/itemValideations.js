/**
 ///////////////////////////////////////////////////////
 **/

let itemValideaction = [];

const itmIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemDescRegEx = /^[A-z ]{5,20}$/;
const itemUnitRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQTYtRegEx = /^[0-9]{1,7}$/;

$("#txtCustomerID").focus();



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




function clearCustomerInputFieldsItem() {
    $("#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty").val("");
    $("#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty").css("border", "1px solid #ced4da");
    $("#txtItemId").focus();
    setBtnItem();
}

setBtnItem();

//disable tab
$("#txtItemId,#txtItemDescription,#txtItemUnitprice,#txtItemQty").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = itemValideaction.indexOf(itemValideaction.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidationsItem(itemValideaction[indexNo]);

    setBtnItem();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != itemValideaction[itemValideaction.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(itemValideaction[indexNo])) {
                itemValideaction[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(itemValideaction[indexNo])) {
                itemSave();
            }
        }
    }
});


function checkValidationsItem(object) {
    if (object.reg.test(object.field.val())) {
        setBorderItems(true, object)
        return true;
    }
    setBorderItems(false, object)
    return false;
}

function setBorderItems(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < itemValideaction.length; i++) {
        if (!checkValidationsItem(itemValideaction[i])) return false;
    }
    return true;
}

function setBtnItem() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItemSave").prop("disabled", false);
    } else {
        $("#btnItemSave").prop("disabled", true);
    }

    let id = $("#txtItemId").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }

}




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
    /*setItemButtonState(errorCount);*/
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

/*
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
