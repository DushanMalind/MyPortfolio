/**
 ///////////////////////////////////////////////////////
 **/
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#txtCustomerID").focus();

let customerValideaction = [];

customerValideaction.push({
    reg: cusIDRegEx,
    field: $('#txtCustomerID'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValideaction.push({
    reg: cusNameRegEx,
    field: $('#txtCustomerName'),
    error: 'Customer Name Pattern is Wrong : Kamal'
});
customerValideaction.push({
    reg: cusAddressRegEx,
    field: $('#txtCustomerAddress'),
    error: 'Customer Address Pattern is Wrong : Galle'
});
customerValideaction.push({
    reg: cusContactRegEx,
    field: $('#txtCustomerContact'),
    error: 'Customer Contact Pattern is Wrong : 077125147'
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('keyup', function (event) {
    checkCusValidity();
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('blur', function (event) {
    checkCusValidity();
});


function checkCusValidity() {
    let errorCounts = 0;
    for (let validation of customerValideaction) {
        if (checkCus(validation.reg, validation.field)) {
            textCusSuccess(validation.field, "");
        } else {
            errorCounts = errorCounts + 1;
            setCusTextError(validation.field, validation.error);
        }
    }
    setCusButtonState(errorCounts);
}

function checkCus(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textCusSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setCusTextError(txtField, error) {
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

function setCusButtonState(value) {
    if (value > 0) {
        $("#save").attr('disabled', true);
    } else {
        $("#save").attr('disabled', false);
    }
}

$("#btnClear").click(function () {
    clearAllCusData();
});

function clearAllCusData() {
    $('#txtCustomerID').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");

    $('#id').val("");
    $('#name').val("");
    $('#address').val("");
    $('#contact').val("");
}