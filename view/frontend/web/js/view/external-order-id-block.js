define([
    'jquery',
    'ko',
    'uiComponent'
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Amit_CustomOrderId/external-order-id-block'
        },        

        config: {
            availableExtension: window.checkoutConfig.shipping.external_order_id.disabled,
            isEnabled: function () {
                return true;
            }
        }
    });
});
