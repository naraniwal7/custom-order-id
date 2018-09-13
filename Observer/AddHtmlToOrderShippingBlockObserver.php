<?php
namespace Amit\CustomOrderId\Observer;

use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;

class AddHtmlToOrderShippingBlockObserver implements ObserverInterface
{
    /**
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $objectManager;

    /**
     * @param \Magento\Framework\ObjectManagerInterface $objectManager
     */
    public function __construct(\Magento\Framework\ObjectManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
    }

    public function execute(EventObserver $observer)
    {
        if($observer->getElementName() == 'sales.order.info') {
            $orderShippingViewBlock = $observer->getLayout()->getBlock($observer->getElementName());
            $order = $orderShippingViewBlock->getOrder();

            $externalOrderIdBlock = $this->objectManager->create('Magento\Framework\View\Element\Template');
            $externalOrderIdBlock->setExternalOrderId($order->getExternalOrderId());
            $externalOrderIdBlock->setTemplate('Amit_CustomOrderId::order_info_shipping_info.phtml');
            $html = $observer->getTransport()->getOutput() . $externalOrderIdBlock->toHtml();
            $observer->getTransport()->setOutput($html);
        }
    }
}