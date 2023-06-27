/**
 ///////////////////////////////////////////////////////
 **/

let customerValideaction = [];

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#txtCustomerID").focus();


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


function clearCustomerInputFields() {
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css("border", "1px solid #ced4da");
    $("#txtCustomerID").focus();
    setBtn();
}

setBtn();

//disable tab
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on("keydown keyup", function (e) {

    let indexNo = customerValideaction.indexOf(customerValideaction.find((c) => c.field.attr("id") == e.target.id));


    if (e.key == "Tab") {
        e.preventDefault();
    }


    checkValidations(customerValideaction[indexNo]);

    setBtn();


    if (e.key == "Enter") {
        $("#txtCustomerID").val(generateNewId());
        if (e.target.id != customerValideaction[customerValideaction.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(customerValideaction[indexNo])) {
                customerValideaction[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(customerValideaction[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.reg.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
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

function checkAll() {
    for (let i = 0; i < customerValideaction.length; i++) {
        if (!checkValidations(customerValideaction[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnDelete").prop("disabled", true);
    $("#btnUpdate").prop("disabled", true);

    if (checkAll()) {
        $("#save").prop("disabled", false);
    } else {
        $("#save").prop("disabled", true);
    }

    let id = $("#txtCustomerID").val();
    if (searchCustomer(id) == undefined) {
        $("#btnDelete").prop("disabled", true);
        $("#btnUpdate").prop("disabled", true);
    } else {
        $("#btnDelete").prop("disabled", false);
        $("#btnUpdate").prop("disabled", false);
    }

}




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


