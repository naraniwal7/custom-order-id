<?php
namespace Amit\CustomOrderId\Setup;


use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

/**
 * @codeCoverageIgnore
 */
class InstallSchema implements InstallSchemaInterface
{

    /**
     * {@inheritdoc}
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;
        $installer->startSetup();

        $installer->getConnection()->addColumn(
            $installer->getTable('quote'),
            'external_order_id',
            [
                'type' => 'text',
                'nullable' => true,
                'comment' => 'external_order_id',
            ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order'),
            'external_order_id',
            [
                'type' => 'text',
                'nullable' => true,
                'comment' => 'external_order_id',
            ]
        );

        $installer->getConnection()->addColumn(
            $installer->getTable('sales_order_grid'),
            'external_order_id',
            [
                'type' => 'text',
                'nullable' => true,
                'comment' => 'external_order_id',
            ]
        );

        $setup->endSetup();
    }
}