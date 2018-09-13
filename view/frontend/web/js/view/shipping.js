define(
    [
        'jquery',
        'underscore',
        'Magento_Ui/js/form/form',
        'ko',
        'Magento_Customer/js/model/customer',
        'Magento_Customer/js/model/address-list',
        'Magento_Checkout/js/model/address-converter',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/create-shipping-address',
        'Magento_Checkout/js/action/select-shipping-address',
        'Magento_Checkout/js/model/shipping-rates-validator',
        'Magento_Checkout/js/model/shipping-address/form-popup-state',
        'Magento_Checkout/js/model/shipping-service',
        'Magento_Checkout/js/action/select-shipping-method',
        'Magento_Checkout/js/model/shipping-rate-registry',
        'Magento_Checkout/js/action/set-shipping-information',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Ui/js/modal/modal',
        'Magento_Checkout/js/model/checkout-data-resolver',
        'Magento_Checkout/js/checkout-data',
        'uiRegistry',
        'mage/translate',
        'Magento_Checkout/js/model/shipping-rate-service'
    ],function (
        $,
        _,
        Component,
        ko,
        customer,
        addressList,
        addressConverter,
        quote,
        createShippingAddress,
        selectShippingAddress,
        shippingRatesValidator,
        formPopUpState,
        shippingService,
        selectShippingMethodAction,
        rateRegistry,
        setShippingInformationAction,
        stepNavigator,
        modal,
        checkoutDataResolver,
        checkoutData,
        registry,
        $t) {
    'use strict';

    var mixin = {

        setShippingInformation: function () {
            var orderIdVal = $('#external_order_id').val();
            var allowedLetters = /^[a-zA-Z0-9]+$/;
            if (orderIdVal.trim() != '') {
                if(orderIdVal!= '' && orderIdVal.length > 40){
                    $(".order_id_section .message").addClass('error');
                    $(".order_id_section .message").text($t('Please enter upto 40 character.'));
                    return false;
                }
                if(!allowedLetters.test(orderIdVal)){
                    $(".order_id_section .message").addClass('error');
                    $(".order_id_section .message").text($t('Please enter alphanumeric character only.'));
                    return false;
                }
                $(".order_id_section .message").removeClass('error');
                $(".order_id_section .message").text("");
            }
            else{
                $(".order_id_section .message").addClass('error');
                $(".order_id_section .message").text($t('Please enter order id.'));
                return false;
            }

            if (this.validateShippingInformation()) {
                setShippingInformationAction().done(
                    function () {
                        stepNavigator.next();
                    }
                );
            }
        }
    };

    return function (target) { // target == Result that Magento_Ui/.../default returns.
    return target.extend(mixin); // new result that all other modules receive 
};
});