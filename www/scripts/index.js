﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
////////////outside functions


////stop default initialization
//$(document).one("pagebeforeshow", "#page-signature", function () {
//    $(':mobile-pagecontainer').pagecontainer('change', '#main-page');  
//});

//$(document).on("mobileinit", function () {
//    $.mobile.autoInitializePage = false;
//});

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    sigCapture = new SignatureCapture("signature");

};

function onPause() {
    // TODO: This application has been suspended. Save application state here.
};

function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
};

var sigCapture = null;
$(document).ready(function (e) {
    window.location.hash = 'main-page';
    //// #initialise jQM
    $.mobile.initializePage();

    $('form').validate({
        rules: {
            applicantSurname: {
                required: true
            },
            applicantFirstName: {
                required: true
            },
            applicantIDNumber: {
                required: true
            }
        },
        messages: {
            applicantSurname: {
                required: "Please enter your surname."
            },
            applicantFirstName: {
                required: "Please enter your first name."
            },
            applicantIDNumber: {
                required: "Please enter your ID Number."
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().prev());
        },
        submitHandler: function (form) {
            $(':mobile-pagecontainer').pagecontainer('change', '#success', {
                reload: false
            });
            return false;
        }
    });
        
    $('#submit-btn').click(function () {
        var sig = sigCapture.toString();
        $('#signatureBytes').val(sig);
        var data = $('form').serialize();
        alert(data);
    });

    $('#clear-canvas').click(function () {
        var sig = sigCapture.clear();
    });


    $('[data-role=header]').on('click','.home', function (event, ui) {
        $.mobile.changePage('#main-page');
        //global_vars = default_global_vars;
    });



    //medical history
    $('.medicalCondition').change(function () {
        var isChecked = false;
        $('.medicalCondition').each(function (index, element) {
            var checked_value = $(element).is(':checked');
            if (checked_value) {
                isChecked = true;
                return true;
            }
        })
        if (isChecked) {
            $('#medicalConditionDetails').show();
        }
        else {
            $('#medicalConditionDetails').hide();
        }
    });




    //vehicle-all-accidents
    setAllAccidentsYears();
    function setAllAccidentsYears() {
        var currentYear = new Date().getFullYear();
        for (i = 1; i < 4; i++) {
            currentYear = currentYear - i;
            var option = $('<option/>');
            option.attr('Value', currentYear);
            option.text(currentYear);
            option.appendTo($('#accidentYear'));
            
        }
    }

    $('#vehicle-all-accidents').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input').val('');
        resetAllAccident();
    });

    $('#vehicle-all-accidents').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetAllAccident();
    });

    function resetAllAccident() {
        var objectList = [
       { "class": "year", "name": "accidentYear" },
       { "class": "cost", "name": "accidentCost" },
       { "class": "month", "name": "accidentMonth" },
       { "class": "driver", "name": "accidentDriver" },
       { "class": "brief", "name": "accidentBrief" }
        ];
        var elementClass = $('.vehicle-accident-block');
        resetObjects(objectList, elementClass, "Add", "Delete", "Accident");
    }



    //garageOutBuildingClass
    $('#garageOutBuildingExists').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.garageOutBuildingClass').show();
        }
        else if (select_value == 'no') {
            $('.garageOutBuildingClass').hide();
        }
    });

    //set Last Three Years of Ownership()
    setLastThreeYearsOwnership();

    //resetHomeAllRiskArticles
    $('#HomeAllRiskInsured').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input').val('');
        resetHomeAllRiskArticles();
        SetHomeAllRiskInsuredValue();
    });

    $('#HomeAllRiskInsured').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetHomeAllRiskArticles();
        SetHomeAllRiskInsuredValue();
    });

    function SetHomeAllRiskInsuredValue() {
        var valList = [];
        $('#HomeAllRiskInsured .article-value').find('input').each(function (index, element) {
            valList.push($(element).val());
        });
        $('#HomeAllRiskTotalAmount').val(GetTotal(valList));
    }

    $('#HomeAllRiskInsured').on('keyup', '.article-value input', function () {
        SetHomeAllRiskInsuredValue();
    });
    



    //HomeInsurance
    $('#homeInsuranceProperty').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input').val('');
        resetHomeInsuranceProperty();
        SetHomeInsuranceValue();
    });

    $('#homeInsuranceProperty').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetHomeInsuranceProperty();
        SetHomeInsuranceValue();
    });

    function SetHomeInsuranceValue() {
        var valList = [];
        $('#homeInsuranceProperty .article-value').find('input').each(function (index, element) {
            valList.push($(element).val());
        });
        $('#homeInsurancePropertySum').val(GetTotal(valList));
    }

    $('#homeInsuranceProperty').on('keyup', '.article-value input', function () {
        SetHomeInsuranceValue();
    });


    $('#HomeInsuranceContent .article-value').on('keyup', 'input', function () {
        var valList = [];
        $('#HomeInsuranceContent .article-value').find('input').each(function (index, element) {
            valList.push($(element).val());
        });
        $('#HomeInsuranceContentTotalAmount').val(GetTotal(valList));
    });

    ////totalValueExceedOneThirdTotalSum
    //$('#totalValueExceedOneThirdTotalSum').change(function () {
    //    var select_value = $(this).val();
    //    if (select_value == 'yes') {
    //        $('#totalValueExceedOneThirdTotalSumIfYesAmount').removeAttr('disabled'); //.show();
    //    }
    //    else if (select_value == 'no') {
    //        $('#totalValueExceedOneThirdTotalSumIfYesAmount').attr('disabled', 'disabled');
    //    }
    //});

    
    //homeInGoodState
    $('#homeInGoodState').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('#divhomeInGoodStateDetails').show();
        }
        else if (select_value == 'yes') {
            $('#divhomeInGoodStateDetails').hide();
        }
    });


    //homeHasWatersideStructure
    $('#homeHasWatersideStructure').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divhomeHasWatersideStructure').show();
        }
        else if (select_value == 'no') {
            $('#divhomeHasWatersideStructure').hide();
        }
    });



    //homeHaveInterestFromIndividual
    $('#homeHaveInterestFromIndividual').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divhomeHaveInterestFromIndividual').show();
        }
        else if (select_value == 'no') {
            $('#divhomeHaveInterestFromIndividual').hide();
        }
    });




    //homeOccupiedByApplicantFamily
    $('#homeUsedForIncomeActivity').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divhomeUsedForIncomeActivity').show();
        }
        else if (select_value == 'no') {
            $('#divhomeUsedForIncomeActivity').hide();
        }
    });

    //homeOccupiedByApplicantFamily
    $('#homeOccupiedByApplicantFamily').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('#divhomeOccupiedByApplicantFamily').show();
        }
        else if (select_value == 'yes') {
            $('#divhomeOccupiedByApplicantFamily').hide();
        }
    });

   
    //applicantRelativeInPublicOffice
    $('#applicantRelativeInPublicOffice').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#publicofficerelation').show();
        }
        else if (select_value == 'no') {
            $('#publicofficerelation').hide();
        }
    });

    //homeInGoodState
    $('#homeInGoodState').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('#divhomeInGoodStateDetails').show();
        }
        else if (select_value == 'yes') {
            $('#divhomeInGoodStateDetails').hide();
        }
    });

    //currentPolicyWithCompanyOrInsurer
    $('#currentPolicyWithCompanyOrInsurer').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divcurrentPolicyWithCompanyOrInsurerDetails').show();
        }
        else if (select_value == 'no') {
            $('#divcurrentPolicyWithCompanyOrInsurerDetails').hide();
        }
    });

    //HomeInsuranceDeclined
    $('#HomeInsuranceDeclined').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsuranceDeclined').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsuranceDeclined').hide();
        }
    });

    //HomeInsuranceRequiredSpecialTerm
    $('#HomeInsuranceRequiredSpecialTerm').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsuranceRequiredSpecialTermDetails').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsuranceRequiredSpecialTermDetails').hide();
        }
    });

    //HomeInsuranceCancelled
    $('#HomeInsuranceCancelled').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsuranceCancelledDetails').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsuranceCancelledDetails').hide();
        }
    });

    //HomeInsuranceIncreasedPremium
    $('#HomeInsuranceIncreasedPremium').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsuranceIncreasedPremiumDetails').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsuranceIncreasedPremiumDetails').hide();
        }
    });

    //HomeInsurancePerilsSuffer
    $('#HomeInsurancePerilsSuffer').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsurancePerilsSufferDetails').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsurancePerilsSufferDetails').hide();
        }
    });

    //HomeInsuranceSufferLoss
    $('#HomeInsuranceSufferLoss').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#divHomeInsuranceSufferLossDetails').show();
        }
        else if (select_value == 'no') {
            $('#divHomeInsuranceSufferLossDetails').hide();
        }
    });



    $('#publicofficerelation').on('click', '.applicantRelativeInPublicOfficeAdd', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input:text').val('');
        resetApplicantRelativeInPublicOffice();
    });

    $('#publicofficerelation').on('click', '.applicantRelativeInPublicOfficeDelete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetApplicantRelativeInPublicOffice();
    });


    //resetInexperiencedDriver()
    $('.inexperiencedDriver').change(function () {
        var isChecked = false;
        $('.inexperiencedDriver').each(function (index, element) {
            var checked_value = $(element).is(':checked');
            if (checked_value) {
                isChecked = true;
                return true;
            }
        })
        if (isChecked) {
            $('#inexperiencedDriversId').show();
        }
        else {
            $('#inexperiencedDriversId').hide();
        }
    });

    $('#inexperiencedDriversId').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input:text').val('');
        resetInexperiencedDriver();
    });

    $('#inexperiencedDriversId').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetInexperiencedDriver();
    });


    //resetRegularDriver
    $('#regularDriver').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('#regularDriversId').show();
        }
        else if (select_value == 'yes') {
            $('#regularDriversId').hide();
        }
    });

    $('#regularDriversId').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input:text').val('');
        resetRegularDriver();
    });

    $('#regularDriversId').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetRegularDriver();
    });

    //lienHolder
    $('#lienHolder').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.lienHolderClass').show();
        }
        else if (select_value == 'no') {
            $('.lienHolderClass').hide();
        }
    });

    //accidents
    $('#involvedInAccident').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.involvedInAccidentClass').show();
        }
        else if (select_value == 'no') {
            $('.involvedInAccidentClass').hide();
        }
    });




    //vehicle to be insured
    $('#isOwnerOfVehicle').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('.vehicleNameAddressOfOwner').show();
        }
        else if (select_value == 'yes') {
            $('.vehicleNameAddressOfOwner').hide();
        }
    });

    $('#vehicleToBeInsuredCtrl').on('click', '.Add', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.clone().insertAfter(elementGroup).show().find('input:text').val('');
        resetVehiclesToBeInsured();
    });

    $('#vehicleToBeInsuredCtrl').on('click', '.Delete', function () {
        var elementGroup = $(this).parent().parent().parent();
        elementGroup.remove();
        resetVehiclesToBeInsured();
    });


    $('#menu-vehicle').click(function () {
        setmenu(getVehicleMenu(), "Vehicle Insurance");
        SetPageHeaderFooter(getVehicleMenu());
        $.mobile.changePage($("#personal-main-page"), "none");
    });

    $('#menu-property').click(function () {
        setmenu(getPropertyMenu(), "Property Insurance");
        SetPageHeaderFooter(getPropertyMenu());
        $.mobile.changePage($("#personal-main-page"), "none");
    });

    //anti-theft device
    $('#vehicleAntiTheftDevice').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.VehicleAntiTheftDeviceProviderClass').show();
        }
        else if (select_value == 'no') {
            $('.VehicleAntiTheftDeviceProviderClass').hide();
        }
    });

    //vehicleRegularCustodyDetails
    $('#vehicleRegularCustody').change(function () {
        var select_value = $(this).val();
        if (select_value == 'no') {
            $('.vehicleRegularCustodyDetailsClass').show();
        }
        else if (select_value == 'yes') {
            $('.vehicleRegularCustodyDetailsClass').hide();
        }
    });

    //vehicleGaragedAtProposersHome
    $('#vehicleGaragedAtProposersHome').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.vehicleGaragedAtProposersHomeDetailsClass').hide();
        }
        else if (select_value == 'no') {
            $('.vehicleGaragedAtProposersHomeDetailsClass').show();
        }
    });

    //vehicleKeptIn
    $('input[type=radio][name=vehicleKeptIn]').change(function () {
        var select_value = $(this).val();
        if (select_value == 'vehicleKeptInOther') {
            $('.vehicleKeptInOtherClass').show();
        }
        else {
            $('.vehicleKeptInOtherClass').hide();
        }
    });

    //proposerInsured
    $('#proposerInsured').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.proposerInsuranceDetailsClass').show();
        }
        else if (select_value == 'no') {
            $('.proposerInsuranceDetailsClass').hide();
        }
    });


    //proposerEntitledToNOClaimDiscount
    $('#proposerEntitledToNOClaimDiscount').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('#proposerEntitledToNOClaimDiscountProof').show();
        }
        else if (select_value == 'no') {
            $('#proposerEntitledToNOClaimDiscountProof').hide();
        }
    });

    //applicantOtherInsurer
    $('#applicantOtherInsurer').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.applicantOtherInsurerTypeClass').show();
        }
        else if (select_value == 'no') {
            $('.applicantOtherInsurerTypeClass').hide();
        }
    });

    //applicantOtherInsurer
    $('#applicantPreviouslyInsured').change(function () {
        var select_value = $(this).val();
        if (select_value == 'yes') {
            $('.ApplicantPreviouslyInsuredClass').show();
        }
        else if (select_value == 'no') {
            $('.ApplicantPreviouslyInsuredClass').hide();
        }
    });


    //validate function
    loadCountriesOptions();

});




//country functions
function loadCountriesOptions() {
    $('.countries').each(function (index, item) {
        var selectObj = $(this);
        selectObj.html('');
        $.each(_countries, function (i, json) {
            if (json.code == 'JM') {
                selectObj.append('<option value="' + json.code + '" selected="selected">' + json.name + '</option>');
            } else {
                selectObj.append('<option value="' + json.code + '">' + json.name + '</option>');
            }
        });
    });
}

$('#mailingAddressSame').change(function () {
    var select_value = $(this).val();
    if (select_value == 'yes') {
        $('#mailingAddress').hide();
    }
    else if (select_value == 'no') {
        $('#mailingAddress').show();
    }
});



$('#applicantHomeCountry').change(function () {
    var select_value = $(this).val();
    if (select_value == "JM") {
        $('#homeAddress .jamaica').show();
        $('#homeAddress .international').hide();
    } else {
        $('#homeAddress .jamaica').hide();
        $('#homeAddress .international').show();
    }
});


$('#applicantMailCountry').change(function () {
    var select_value = $(this).val();
    if (select_value == "JM") {
        $('#mailingAddress').find('.jamaica').show();
        $('#mailingAddress').find('.international').hide();
    } else {
        $('#mailingAddress').find('.jamaica').hide();
        $('#mailingAddress').find('.international').show();
    }
});


$('#employerNationality').change(function () {
    var select_value = $(this).val();
    if (select_value == "JM") {
        $('#employer').find('.jamaica').show();
        $('#employer').find('.international').hide();
    } else {
        $('#employer').find('.jamaica').hide();
        $('#employer').find('.international').show();
    }
});




//miscellaneous functions
function GetTotal(InputArray) {
    var sum = 0;
    $.each(InputArray, function (index, val) {
        sum = sum + Number(val ? val : 0);
    })
    return '$' + sum.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function resetHomeAllRiskArticles() {
    var objectList = [
   { "class": "article-name", "name": "HomeAllRiskArticleDescription" },
   { "class": "article-value", "name": "HomeAllRiskArticleValue" }
    ];
    var elementClass = $('.HomeAllRiskArticles');
    resetObjects(objectList, elementClass, "Add", "Delete", "Article");
}

function resetHomeInsuranceProperty() {
    var objectList = [
   { "class": "article-name", "name": "homeInsurancePropertyItem" },
   { "class": "article-value", "name": "homeInsurancePropertyItemValue" }
    ];
    var elementClass = $('.homeInsurancePropertyItems');
    resetObjects(objectList, elementClass, "Add", "Delete", "Building");
}


//
function resetInexperiencedDriver() {

    var objectList = [
   { "class": "name", "name": "inexperiencedDriversName" },
   { "class": "occupation", "name": "inexperiencedDriversOccupation" },
   { "class": "DateOfBirth", "name": "inexperiencedDriversDateOfBirth" },
   { "class": "DriversDL", "name": "inexperiencedDriversDL" },
   { "class": "DriversDLOriginalDateOfIssue", "name": "inexperiencedDriversDLOriginalDateOfIssue" },
    { "class": "DriversRelationshipToProposer", "name": "inexperiencedDriversRelationshipToProposer" }
    ];
    var elementClass = $('.inexperiencedDriversCls');

    resetObjects(objectList, elementClass, "Add", "Delete", "Driver");
}

//regular drivers
function resetRegularDriver() {

    var objectList = [
   { "class": "name", "name": "regularDriversName" },
   { "class": "occupation", "name": "regularDriversOccupation" },
   { "class": "DateOfBirth", "name": "regularDriversDateOfBirth" },
   { "class": "DriversDL", "name": "regularDriversDL" },
   { "class": "DriversDLOriginalDateOfIssue", "name": "regularDriversDLOriginalDateOfIssue" },
    { "class": "DriversRelationshipToProposer", "name": "regularDriversRelationshipToProposer" }
    ];
    var elementClass = $('.regularDriversCls');

    resetObjects(objectList, elementClass, "Add", "Delete", "Driver");
}


function resetApplicantRelativeInPublicOffice() {

    var objectList = [
   { "class": "office", "name": "applicantRelativeTypePublicOffice" },
   { "class": "address", "name": "applicantRelativeTypePublicAddress" },
   { "class": "relation", "name": "applicantRelativeTypePublicRelation" },
   { "class": "name", "name": "applicantRelativeInPublicOfficeName" }
    ];
    var elementClass = $('.publicofficerelations');

    resetObjects(objectList, elementClass, "applicantRelativeInPublicOfficeAdd", "applicantRelativeInPublicOfficeDelete", "Relative");
}

function resetVehiclesToBeInsured() {
    var objectList = [
    { "class": "registration", "name": "vehicleRegistrationNo" },
    { "class": "make", "name": "vehicleMake" },
    { "class": "model", "name": "vehicleModel" },
    { "class": "engine", "name": "vehicleEngineNo" },
    { "class": "chassis", "name": "vehicleChassisNo" },
    { "class": "year", "name": "vehicleYearOfMake" },
    { "class": "rating", "name": "vehicleCcRating" },
    { "class": "seating", "name": "vehicleSeating" },
    { "class": "body", "name": "vehicleTypeOfBody" },
    { "class": "insured", "name": "vehicleSumInsured" },
    { "class": "trailer", "name": "vehicleTrailerUsed" }
    ];
    var elementClass = $('.vehicleToBeInsured');
    resetObjects(objectList, elementClass, "Add", "Delete", "Vehicle");
}

function SignatureItem() {
    return { "name": "Signature", "value": "page-signature" };
}

function SetupSignaturePage() {
    var signaturePage = $('#page-signature');
    signaturePage.find("[data-role=header]").find("h1").text("Signature");
    signaturePage.find("[data-role=footer]").find("h4").text("IronRock App");
    signaturePage.find("[data-role=main]").show();
}

function getPersonalMenu() {
    return [
       //{ "name": "Start Page", "value": "main-page" },
        { "name": "Personal Details", "value": "personal-main-page" },
        { "name": "Contact Details", "value": "personal-contact-page" },
        //{ "name": "Home Address", "value": "personal-home-address-page" },
        //{ "name": "Mailing Address", "value": "personal-mailing-address-page" },
        { "name": "Employer Details", "value": "personal-employer-details-page" }//,
        //{ "name": "Public Office Association", "value": "personal-relative-public-office-page" }
    ];
}

function getVehicleMenu() {
    var vehicleMenuList = [
        { "name": "Vehicle Particulars", "value": "vehicle-particulars-page" },
        //{ "name": "Vehicle Particular Con't", "value": "vehicle-particular-continued" },
        //{ "name": "Vehicle Mortgagee Details", "value": "vehicle-mortgagee-details-page" },        
        { "name": "Drivers Details", "value": "vehicle-driver-details-page" },
        //{ "name": "Other Drivers", "value": "vehicle-other-drivers-page" },        
        //{ "name": "Vehicles Owned", "value": "vehicles-owned-page" },
        { "name": "Accidents", "value": "vehicle-accidents-page" },
        { "name": "Medical History", "value": "vehicle-medical-history-page" }
    ];
    var newList = getPersonalMenu().concat(vehicleMenuList);
    newList.push(SignatureItem());
    return newList;
}


function getPropertyMenu() {
    var propertyMenuList = [
        { "name": "Home Particulars", "value": "home-particulars-page" },
        { "name": "Home Particulars Con't", "value": "home-particulars-continued-page" },
        { "name": "Home Property Details", "value": "home-property-details-page" },
        { "name": "All Risk Insurance", "value": "home-all-risk-insurance-page" }
    ];
    var newList = getPersonalMenu().concat(propertyMenuList);
    newList.push(SignatureItem());
    return newList;
}


function SetPageHeaderFooter(menu_list) {
    // <a href="#main-page" class="ui-btn ui-btn-left ui-btn-corner-all ui-icon-arrow-l ui-btn-icon-notext" rel="prev">Home</a>
    //<a href="#personal-contact-page" class="ui-btn ui-btn-right ui-btn-corner-all ui-icon-arrow-r ui-btn-icon-notext" rel="next">Next</a>       
    for (var i = 0; i < menu_list.length; i++) {
        var currentPage = $('#' + menu_list[i].value);
        currentPage.find("[data-role=header]").find("h1").text(menu_list[i].name);
        var prevI = i - 1;
        var nextI = i + 1;
        if (i > 0) {
            //insert previous link               
            var prevLink = '<a href="#' + menu_list[prevI].value + '" class="ui-btn ui-btn-left ui-btn-corner-all ui-icon-arrow-l ui-btn-icon-notext" rel="prev">Home</a>';
            currentPage.find('[data-role=footer]').append(prevLink);
        }
        if (i < menu_list.length - 1) {
            //insert next link
            var nextLink = '<a href="#' + menu_list[nextI].value + '" class="ui-btn ui-btn-right ui-btn-corner-all ui-icon-arrow-r ui-btn-icon-notext" rel="next">Next</a>';
            currentPage.find('[data-role=footer]').append(nextLink);
        }
    }
}


function setmenu(menu_list, menu_header) {
    var panelItems = "";
    $.each(menu_list, function (key, item) {
        panelItems = panelItems + '<li><a href="#' + item.value + '">' + item.name + '</a></li>';
    });
    var p = 1;
    var last_page_dom = $("#" + menu_list[menu_list.length - 1].value).get(0);
    $.each(menu_list, function (key, item) {
        var currentPage = $('#' + item.value);
        var current_page_dom = currentPage.get(0);
        if (currentPage.find('[data-role=panel]').length == 0 && last_page_dom != current_page_dom) {
            var panel = '<div data-role="panel" data-display="overlay" data-mini="true" class="menu" id="panel' + p + '" data-dismissible="true" data-swipe-close="true" data-position="left">';
            panel = panel + '<h2>' + menu_header + '</h2><ol data-role="listview" data-inset="true" data-mini="true">' + panelItems + '</ol></div>';
            currentPage.prepend(panel);
            var panelBtn = '<a href="#panel' + p + '" class="ui-btn ui-btn-left ui-btn-corner-all ui-icon-bars ui-btn-icon-notext" rel="search">Menu</a>'
            currentPage.find('[data-role=header]').append(panelBtn);
        }
        p++;
    });
}



var _countries =
    [

  { "name": 'Afghanistan', "code": 'AF' },
  { "name": 'Åland Islands', "code": 'AX' },
  { "name": 'Albania', "code": 'AL' },
  { "name": 'Algeria', "code": 'DZ' },
  { "name": 'American Samoa', "code": 'AS' },
  { "name": 'AndorrA', "code": 'AD' },
  { "name": 'Angola', "code": 'AO' },
  { "name": 'Anguilla', "code": 'AI' },
  { "name": 'Antarctica', "code": 'AQ' },
  { "name": 'Antigua and Barbuda', "code": 'AG' },
  { "name": 'Argentina', "code": 'AR' },
  { "name": 'Armenia', "code": 'AM' },
  { "name": 'Aruba', "code": 'AW' },
  { "name": 'Australia', "code": 'AU' },
  { "name": 'Austria', "code": 'AT' },
  { "name": 'Azerbaijan', "code": 'AZ' },
  { "name": 'Bahamas', "code": 'BS' },
  { "name": 'Bahrain', "code": 'BH' },
  { "name": 'Bangladesh', "code": 'BD' },
  { "name": 'Barbados', "code": 'BB' },
  { "name": 'Belarus', "code": 'BY' },
  { "name": 'Belgium', "code": 'BE' },
  { "name": 'Belize', "code": 'BZ' },
  { "name": 'Benin', "code": 'BJ' },
  { "name": 'Bermuda', "code": 'BM' },
  { "name": 'Bhutan', "code": 'BT' },
  { "name": 'Bolivia', "code": 'BO' },
  { "name": 'Bosnia and Herzegovina', "code": 'BA' },
  { "name": 'Botswana', "code": 'BW' },
  { "name": 'Bouvet Island', "code": 'BV' },
  { "name": 'Brazil', "code": 'BR' },
  { "name": 'British Indian Ocean Territory', "code": 'IO' },
  { "name": 'Brunei Darussalam', "code": 'BN' },
  { "name": 'Bulgaria', "code": 'BG' },
  { "name": 'Burkina Faso', "code": 'BF' },
  { "name": 'Burundi', "code": 'BI' },
  { "name": 'Cambodia', "code": 'KH' },
  { "name": 'Cameroon', "code": 'CM' },
  { "name": 'Canada', "code": 'CA' },
  { "name": 'Cape Verde', "code": 'CV' },
  { "name": 'Cayman Islands', "code": 'KY' },
  { "name": 'Central African Republic', "code": 'CF' },
  { "name": 'Chad', "code": 'TD' },
  { "name": 'Chile', "code": 'CL' },
  { "name": 'China', "code": 'CN' },
  { "name": 'Christmas Island', "code": 'CX' },
  { "name": 'Cocos (Keeling) Islands', "code": 'CC' },
  { "name": 'Colombia', "code": 'CO' },
  { "name": 'Comoros', "code": 'KM' },
  { "name": 'Congo', "code": 'CG' },
  { "name": 'Congo, The Democratic Republic of the', "code": 'CD' },
  { "name": 'Cook Islands', "code": 'CK' },
  { "name": 'Costa Rica', "code": 'CR' },
  { "name": 'Cote D\'Ivoire', "code": 'CI' },
  { "name": 'Croatia', "code": 'HR' },
  { "name": 'Cuba', "code": 'CU' },
  { "name": 'Cyprus', "code": 'CY' },
  { "name": 'Czech Republic', "code": 'CZ' },
  { "name": 'Denmark', "code": 'DK' },
  { "name": 'Djibouti', "code": 'DJ' },
  { "name": 'Dominica', "code": 'DM' },
  { "name": 'Dominican Republic', "code": 'DO' },
  { "name": 'Ecuador', "code": 'EC' },
  { "name": 'Egypt', "code": 'EG' },
  { "name": 'El Salvador', "code": 'SV' },
  { "name": 'Equatorial Guinea', "code": 'GQ' },
  { "name": 'Eritrea', "code": 'ER' },
  { "name": 'Estonia', "code": 'EE' },
  { "name": 'Ethiopia', "code": 'ET' },
  { "name": 'Falkland Islands (Malvinas)', "code": 'FK' },
  { "name": 'Faroe Islands', "code": 'FO' },
  { "name": 'Fiji', "code": 'FJ' },
  { "name": 'Finland', "code": 'FI' },
  { "name": 'France', "code": 'FR' },
  { "name": 'French Guiana', "code": 'GF' },
  { "name": 'French Polynesia', "code": 'PF' },
  { "name": 'French Southern Territories', "code": 'TF' },
  { "name": 'Gabon', "code": 'GA' },
  { "name": 'Gambia', "code": 'GM' },
  { "name": 'Georgia', "code": 'GE' },
  { "name": 'Germany', "code": 'DE' },
  { "name": 'Ghana', "code": 'GH' },
  { "name": 'Gibraltar', "code": 'GI' },
  { "name": 'Greece', "code": 'GR' },
  { "name": 'Greenland', "code": 'GL' },
  { "name": 'Grenada', "code": 'GD' },
  { "name": 'Guadeloupe', "code": 'GP' },
  { "name": 'Guam', "code": 'GU' },
  { "name": 'Guatemala', "code": 'GT' },
  { "name": 'Guernsey', "code": 'GG' },
  { "name": 'Guinea', "code": 'GN' },
  { "name": 'Guinea-Bissau', "code": 'GW' },
  { "name": 'Guyana', "code": 'GY' },
  { "name": 'Haiti', "code": 'HT' },
  { "name": 'Heard Island and Mcdonald Islands', "code": 'HM' },
  { "name": 'Holy See (Vatican City State)', "code": 'VA' },
  { "name": 'Honduras', "code": 'HN' },
  { "name": 'Hong Kong', "code": 'HK' },
  { "name": 'Hungary', "code": 'HU' },
  { "name": 'Iceland', "code": 'IS' },
  { "name": 'India', "code": 'IN' },
  { "name": 'Indonesia', "code": 'ID' },
  { "name": 'Iran, Islamic Republic Of', "code": 'IR' },
  { "name": 'Iraq', "code": 'IQ' },
  { "name": 'Ireland', "code": 'IE' },
  { "name": 'Isle of Man', "code": 'IM' },
  { "name": 'Israel', "code": 'IL' },
  { "name": 'Italy', "code": 'IT' },
  { "name": 'Jamaica', "code": 'JM' },
  { "name": 'Japan', "code": 'JP' },
  { "name": 'Jersey', "code": 'JE' },
  { "name": 'Jordan', "code": 'JO' },
  { "name": 'Kazakhstan', "code": 'KZ' },
  { "name": 'Kenya', "code": 'KE' },
  { "name": 'Kiribati', "code": 'KI' },
  { "name": 'Korea, Democratic People\'S Republic of', "code": 'KP' },
  { "name": 'Korea, Republic of', "code": 'KR' },
  { "name": 'Kuwait', "code": 'KW' },
  { "name": 'Kyrgyzstan', "code": 'KG' },
  { "name": 'Lao People\'S Democratic Republic', "code": 'LA' },
  { "name": 'Latvia', "code": 'LV' },
  { "name": 'Lebanon', "code": 'LB' },
  { "name": 'Lesotho', "code": 'LS' },
  { "name": 'Liberia', "code": 'LR' },
  { "name": 'Libyan Arab Jamahiriya', "code": 'LY' },
  { "name": 'Liechtenstein', "code": 'LI' },
  { "name": 'Lithuania', "code": 'LT' },
  { "name": 'Luxembourg', "code": 'LU' },
  { "name": 'Macao', "code": 'MO' },
  { "name": 'Macedonia, The Former Yugoslav Republic of', "code": 'MK' },
  { "name": 'Madagascar', "code": 'MG' },
  { "name": 'Malawi', "code": 'MW' },
  { "name": 'Malaysia', "code": 'MY' },
  { "name": 'Maldives', "code": 'MV' },
  { "name": 'Mali', "code": 'ML' },
  { "name": 'Malta', "code": 'MT' },
  { "name": 'Marshall Islands', "code": 'MH' },
  { "name": 'Martinique', "code": 'MQ' },
  { "name": 'Mauritania', "code": 'MR' },
  { "name": 'Mauritius', "code": 'MU' },
  { "name": 'Mayotte', "code": 'YT' },
  { "name": 'Mexico', "code": 'MX' },
  { "name": 'Micronesia, Federated States of', "code": 'FM' },
  { "name": 'Moldova, Republic of', "code": 'MD' },
  { "name": 'Monaco', "code": 'MC' },
  { "name": 'Mongolia', "code": 'MN' },
  { "name": 'Montserrat', "code": 'MS' },
  { "name": 'Morocco', "code": 'MA' },
  { "name": 'Mozambique', "code": 'MZ' },
  { "name": 'Myanmar', "code": 'MM' },
  { "name": 'Namibia', "code": 'NA' },
  { "name": 'Nauru', "code": 'NR' },
  { "name": 'Nepal', "code": 'NP' },
  { "name": 'Netherlands', "code": 'NL' },
  { "name": 'Netherlands Antilles', "code": 'AN' },
  { "name": 'New Caledonia', "code": 'NC' },
  { "name": 'New Zealand', "code": 'NZ' },
  { "name": 'Nicaragua', "code": 'NI' },
  { "name": 'Niger', "code": 'NE' },
  { "name": 'Nigeria', "code": 'NG' },
  { "name": 'Niue', "code": 'NU' },
  { "name": 'Norfolk Island', "code": 'NF' },
  { "name": 'Northern Mariana Islands', "code": 'MP' },
  { "name": 'Norway', "code": 'NO' },
  { "name": 'Oman', "code": 'OM' },
  { "name": 'Pakistan', "code": 'PK' },
  { "name": 'Palau', "code": 'PW' },
  { "name": 'Palestinian Territory, Occupied', "code": 'PS' },
  { "name": 'Panama', "code": 'PA' },
  { "name": 'Papua New Guinea', "code": 'PG' },
  { "name": 'Paraguay', "code": 'PY' },
  { "name": 'Peru', "code": 'PE' },
  { "name": 'Philippines', "code": 'PH' },
  { "name": 'Pitcairn', "code": 'PN' },
  { "name": 'Poland', "code": 'PL' },
  { "name": 'Portugal', "code": 'PT' },
  { "name": 'Puerto Rico', "code": 'PR' },
  { "name": 'Qatar', "code": 'QA' },
  { "name": 'Reunion', "code": 'RE' },
  { "name": 'Romania', "code": 'RO' },
  { "name": 'Russian Federation', "code": 'RU' },
  { "name": 'RWANDA', "code": 'RW' },
  { "name": 'Saint Helena', "code": 'SH' },
  { "name": 'Saint Kitts and Nevis', "code": 'KN' },
  { "name": 'Saint Lucia', "code": 'LC' },
  { "name": 'Saint Pierre and Miquelon', "code": 'PM' },
  { "name": 'Saint Vincent and the Grenadines', "code": 'VC' },
  { "name": 'Samoa', "code": 'WS' },
  { "name": 'San Marino', "code": 'SM' },
  { "name": 'Sao Tome and Principe', "code": 'ST' },
  { "name": 'Saudi Arabia', "code": 'SA' },
  { "name": 'Senegal', "code": 'SN' },
  { "name": 'Serbia and Montenegro', "code": 'CS' },
  { "name": 'Seychelles', "code": 'SC' },
  { "name": 'Sierra Leone', "code": 'SL' },
  { "name": 'Singapore', "code": 'SG' },
  { "name": 'Slovakia', "code": 'SK' },
  { "name": 'Slovenia', "code": 'SI' },
  { "name": 'Solomon Islands', "code": 'SB' },
  { "name": 'Somalia', "code": 'SO' },
  { "name": 'South Africa', "code": 'ZA' },
  { "name": 'South Georgia and the South Sandwich Islands', "code": 'GS' },
  { "name": 'Spain', "code": 'ES' },
  { "name": 'Sri Lanka', "code": 'LK' },
  { "name": 'Sudan', "code": 'SD' },
  { "name": 'Suriname', "code": 'SR' },
  { "name": 'Svalbard and Jan Mayen', "code": 'SJ' },
  { "name": 'Swaziland', "code": 'SZ' },
  { "name": 'Sweden', "code": 'SE' },
  { "name": 'Switzerland', "code": 'CH' },
  { "name": 'Syrian Arab Republic', "code": 'SY' },
  { "name": 'Taiwan, Province of China', "code": 'TW' },
  { "name": 'Tajikistan', "code": 'TJ' },
  { "name": 'Tanzania, United Republic of', "code": 'TZ' },
  { "name": 'Thailand', "code": 'TH' },
  { "name": 'Timor-Leste', "code": 'TL' },
  { "name": 'Togo', "code": 'TG' },
  { "name": 'Tokelau', "code": 'TK' },
  { "name": 'Tonga', "code": 'TO' },
  { "name": 'Trinidad and Tobago', "code": 'TT' },
  { "name": 'Tunisia', "code": 'TN' },
  { "name": 'Turkey', "code": 'TR' },
  { "name": 'Turkmenistan', "code": 'TM' },
  { "name": 'Turks and Caicos Islands', "code": 'TC' },
  { "name": 'Tuvalu', "code": 'TV' },
  { "name": 'Uganda', "code": 'UG' },
  { "name": 'Ukraine', "code": 'UA' },
  { "name": 'United Arab Emirates', "code": 'AE' },
  { "name": 'United Kingdom', "code": 'GB' },
  { "name": 'United States', "code": 'US' },
  { "name": 'United States Minor Outlying Islands', "code": 'UM' },
  { "name": 'Uruguay', "code": 'UY' },
  { "name": 'Uzbekistan', "code": 'UZ' },
  { "name": 'Vanuatu', "code": 'VU' },
  { "name": 'Venezuela', "code": 'VE' },
  { "name": 'Viet Nam', "code": 'VN' },
  { "name": 'Virgin Islands, British', "code": 'VG' },
  { "name": 'Virgin Islands, U.S.', "code": 'VI' },
  { "name": 'Wallis and Futuna', "code": 'WF' },
  { "name": 'Western Sahara', "code": 'EH' },
  { "name": 'Yemen', "code": 'YE' },
  { "name": 'Zambia', "code": 'ZM' },
  { "name": 'Zimbabwe', "code": 'ZW' }
    ];





function resetObjects(objectList, elementClass, addBtnName, delBtnName, elementTitle) {
    var firstElement = elementClass.first();
    var lastElement = elementClass.last();
    var i = 0;

    elementClass.each(function (index, e) {
        var element = $(this);
        //change ids and names
        $.each(objectList, function (jIndex, item) {
            element.find('.' + item.class + ' input').attr('id', item.name + i).attr('name', item.name + i);
            element.find('.' + item.class + ' label').attr('for', item.name + i);
        })

        //set controls
        if (element.is(firstElement) && element.is(lastElement)) {
            firstElement.find('.' + delBtnName).hide();
            lastElement.find('.' + addBtnName).show();
        }
        else if (element.is(firstElement)) {
            element.find('.' + delBtnName).hide();
            element.find('.' + addBtnName).hide();
        } else if (element.is(lastElement)) {
            element.find('.' + delBtnName).show();
            element.find('.' + addBtnName).show();
        }
        else {
            element.find('.' + delBtnName).hide();
            element.find('.' + addBtnName).hide();
        }
        //change title
        element.find('h4').text(elementTitle + ' ' + ++i);
    });
}


//set years
function setLastThreeYearsOwnership() {
    var currentYear = new Date().getFullYear();
    for (i = 1; i < 4; i++) {
        var previousYear = currentYear - i;
        var YearName = 'numberOfVehiclesOwned'+previousYear;
        var YearHtml = $('<div/>');
        YearHtml.addClass('ui-field-contain');
        var YearLabel = $('<label/>');
        YearLabel.attr('for', YearName);
        YearLabel.text(previousYear+':Number of vehicles owned:')
        YearLabel.appendTo(YearHtml);
        var yearText = $('<input/>');
        yearText.attr('type', 'number');
        yearText.attr('name', YearName);
        yearText.attr('id', YearName);
        yearText.appendTo(YearHtml);
        YearHtml.appendTo($('#numberOfVehiclesOwned'));
    }

}
