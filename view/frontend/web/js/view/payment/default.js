/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'jquery',
    'uiComponent',
    'Magento_Checkout/js/action/place-order',
    'Magento_Checkout/js/action/select-payment-method',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/payment-service',
    'Magento_Checkout/js/checkout-data',
    'Magento_Checkout/js/model/checkout-data-resolver',
    'uiRegistry',
    'Magento_Checkout/js/model/payment/additional-validators',
    'Magento_Ui/js/model/messages',
    'uiLayout',
    'Magento_Checkout/js/action/redirect-on-success',
    'Magento_Ui/js/modal/modal'
], function (
    ko,
    $,
    Component,
    placeOrderAction,
    selectPaymentMethodAction,
    quote,
    customer,
    paymentService,
    checkoutData,
    checkoutDataResolver,
    registry,
    additionalValidators,
    Messages,
    layout,
    redirectOnSuccessAction,
    modal
) {
    'use strict';

    var mixin = {
        /**
         * Place order.
         */
        placeOrder: function (data, event) {

            var options = {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                title: 'popup modal title',
                modelClass: 'custom-block-customer-login',
                buttons: false
            };

            var popup = modal(options, $('#popup-modal'));
            $("#popup-modal").modal("openModal");
            return false;

            var self = this;

            if (event) {
                event.preventDefault();
            }

            if (this.validate() && additionalValidators.validate()) {
                this.isPlaceOrderActionAllowed(false);

                this.getPlaceOrderDeferredObject()
                    .fail(
                        function () {
                            self.isPlaceOrderActionAllowed(true);
                        }
                    ).done(
                        function () {
                            self.afterPlaceOrder();

                            if (self.redirectAfterPlaceOrder) {
                                redirectOnSuccessAction.execute();
                            }
                        }
                    );

                return true;
            }

            return false;
        }
    }
    
    return function (target) { // target == Result that Magento_Ui/.../default returns.
        return target.extend(mixin); // new result that all other modules receive 
    };    
});
