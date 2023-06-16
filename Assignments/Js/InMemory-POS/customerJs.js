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


var customers = [];

$("#save").click(function () {

    saveCustomer();
    /* let cusId=$("#txtCustomerID").val();
     if (searchCustomer(cusId.trim()==undefined))
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
     loadAllCustomerId();
     bindRowClickEvents();
     clearAllData();*/
});


function saveCustomer() {
    let cusId = $("#txtCustomerID").val();
    if (searchCustomer(cusId.trim()) == undefined) {
        let cusName = $("#txtCustomerName").val();
        let cusAddress = $("#txtCustomerAddress").val();
        let cusContact = $("#txtCustomerContact").val();

        var customerObject = {
            id: cusId,
            name: cusName,
            address: cusAddress,
            contact: cusContact

        }

        customers.push(customerObject);

        loadAllCustomers();
        loadAllCustomerId();
        bindRowClickEvents();
        clearAllDataCustomer();
    } else {
        alert("Customer already exits.!");
    }

}

function clearAllDataCustomer() {
    $('#txtCustomerID').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
}

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').keydown(function (e) {
    /* e.preventDefault();*/
    if (e.key == "Tab") {
        e.preventDefault();
    }

    $("#txtCustomerID").keydown(function (e) {
        let cid = $("#txtCustomerID").val();

        if (e.key == "Enter") {
            if (cusIDRegEx.test(cid)) {
                $("#txtCustomerName").focus();
            } else {

            }

        }
    });

    let cid = $("#txtCustomerName").val();

    $("#txtCustomerName").keydown(function (e) {
        if (e.key == "Enter") {
            if (cusNameRegEx.test(cid)) {
                $("#txtCustomerAddress").focus();
            }

        }
    });

    $("#txtCustomerAddress").keydown(function (e) {
        if (e.key == "Enter") {
            $("#txtCustomerContact").focus();
        }
    });

    $("#txtCustomerContact").keydown(function (e) {
        if (e.key == "Enter") {
            $("#save").focus();
        }
    });


})

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

        setCusButtonUpdate(2);
        $("#btnUpdate").attr('disabled', false);
    });
    $("#btnUpdate").attr('disabled', disabled);


}

function setCusButtonUpdate(values) {
    if (values > 1) {
        $("#btnUpdate").attr('disabled', true);
    } else {
        $("#btnUpdate").attr('disabled', disabled);
    }
}


function loadAllCustomers() {

    $("#tblCustomer").empty();

    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

        $("#tblCustomer").append(row);
    }
}


$("#btnDelete").click(function () {

    let deleteId = $("#txtCustomerID").val();

    let option = confirm("Do you Sure?" + deleteId);
    if (option) {
        if (deleteCustomer(deleteId)) {
            alert("Customer Successfully Deleted..");
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete");
        }
    }
});


$("#btnClear").click(function () {
    /* $('#txtCustomerID').val("");
     $('#txtCustomerName').val("");
     $('#txtCustomerAddress').val("");
     $('#txtCustomerContact').val("");*/
    clearAllDataCustomer();
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
    bindRowClickEvents();
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}

/*function searchCustomer(id) {
    return customers.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.id == id;
    });
}*/

function searchCustomer(id) {
    for (let customer of customers) {
        if (customer.id == id) {
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

$("#clear").click(function () {
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






