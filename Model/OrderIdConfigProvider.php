<?php
namespace Amit\CustomOrderId\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Store\Model\ScopeInterface;

class OrderIdConfigProvider implements ConfigProviderInterface
{
    const EXTENSION_STATUS_PATH = 'external_order_id_section/general/enable';

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    /**
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        $this->storeManager = $storeManager;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfig()
    {
        $store = $this->getStoreId();

        $config = [
            'shipping' => [
                'external_order_id' => [
                    'disabled' => $this->getExtensionStatus()
                ]
            ]
        ];

        return $config;
    }

    public function getStoreId()
    {
        return $this->storeManager->getStore()->getStoreId();
    }

    public function getExtensionStatus(){
        $status = $this->scopeConfig->getValue(self::EXTENSION_STATUS_PATH, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        if($status == '' || $status == 0)
            return 0;
        return 1;
    }
}