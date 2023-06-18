/**
 ///////////////////////////////////////////////////////
 **/
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
}