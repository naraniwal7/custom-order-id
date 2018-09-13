var config = {
    "map": {
        "*": {
            'Magento_Checkout/js/model/shipping-save-processor/default': 'Amit_CustomOrderId/js/model/shipping-save-processor/default'
        }
    },
    config: {
	    mixins: {
	        'Magento_Checkout/js/view/shipping': {
	            'Amit_CustomOrderId/js/view/shipping': true
	        },
	        'Magento_Checkout/js/view/payment/default': {
	            'Amit_CustomOrderId/js/view/payment/default': true
	        }
	    }
	}    
};