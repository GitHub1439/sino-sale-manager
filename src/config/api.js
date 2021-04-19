const API = {
    price: {
        findProduct: '/sino-dst/product/list-by-is-fixed',
        findDefaultPriceTactic: '/sino-dst/product-price/default-price/list',
        update: '/sino-dst/product-price/update',
        remove: '/sino-dst/product-price/remove',
        save: '/sino-dst/product-price/save',
        saveList: '/sino-dst/product-price/save-list',
        saveLabelList: '/sino-dst/product-price/save-label-list', //新增多条 标签特价 post
        listcust: '/sino-dst/customer/list',
        findSpecialPriceTactic: '/sino-dst/product-price/special-price/list',
        findSpecialPriceByCustomerId: '/sino-dst/product-price/special-price/list-by-customer'

    },
    shop: {
        detail: '/sino-dst/store/detail',
        update: '/sino-dst/store/update',
        collectionDetail: '/sino-dst/store/collectionDetail',
        updateStoreCollection: '/sino-dst/store/updateStoreCollection',
        importMerchantStoreExt: '/sino-dst/product/import-from-factory'
    },
    shopInit: {
        dictionary: '/sino-dst/dict/list',
        getAllProductList: '/sino-dst/factory-product/auth/product/list',
        getAllProduct: '/sino-dst/factory-product/list-by-type',
        merchantStoreInit: '/sino-dst/store/merchantStoreInit'
    },
    extra: {
        detail: '/sino-dst/store/detail',
        dictionary: '/sino-dst/dict/dictionary',
        transportDetail: '/sino-dst/transport/detail',
        transportSubmit: '/sino-dst/transport/submit',
        transportSave: '/sino-dst/transport/save',
        transportList: '/sino-dst/transport/list',
        transportRemove: '/sino-dst/transport/remove'
    },
    customermanage: {
        exportcustome: '/sino-dst/customer/list/export', //产品列表导出
        listCust: '/sino-dst/customer/list',
        applyList: '/sino-dst/customer-apply/list',
        applyDetail: '/sino-dst/customer-apply/detail',
        applyAudit: '/sino-dst/customer-apply/audit',
        queryCustDetail: '/sino-dst/customer/detail',
        update_cust: '/sino-dst/customer/update',
        remove: '/sino-dst/customer-address/remove',
        custOrder: '/sino-dst/order/credit-order',
        topList: '/sino-dst/customer/credit-record/top-list',
        create: '/sino-dst/customer-settle-accounts/create',
        getCustomerLabel: '/sino-dst/customer/list-customer-label', // 客户标签
        customerLabelList: '/sino-dst/customerLabel/list', // 客户标签列表查询
        customerLabelRemove: '/sino-dst/customerLabel/remove', // 客户标签列表查询
        customerLabelSubmit: '/sino-dst/customerLabel/submit', // 客户标签列表查询
        labelCustomer: "/sino-dst/customer/label-customer", //查询标签关联客户 get
        labelClash: "/sino-dst/product-price/special-price/label-clash", // 标签特价冲突查询 get
        customerClash: "/sino-dst/product-price/special-price/customer-clash", // 客户特价冲突查询 get
    },
    activity: {
        activityList: '/sino-dst/activity/list',
        activitySubmit: '/sino-dst/activity/submit',
        merchantProductList: '/sino-dst/product/list',
        getAllProductList: '/sino-dst/factory-product/list',
        updateStatus: '/sino-dst/activity/change-status',
        detail: '/sino-dst/activity/detail',
        merGiftList: '/sino-dst/order/store-gift/list',
        facGiftList: '/sino-dst/order/factory-gift/list',
        delivery: '/sino-dst/order/delivery'
    },
    order: {
        statisticsList: '/sino-dst/statistics/order/list',
        orderList: '/sino-dst/order/store-order/page',
        orderDetail: '/sino-dst/order/detail',
        orderDelivery: '/sino-dst/order/delivery',
        orderAudit: '/sino-dst/order/audit',
        exportOrder: '/sino-dst/order/list/export', //订单列表导出
        orderSelectAll: '/sino-dst/order/batch-audit', //订单批量确认
    },
    product: {
        exportProduct: '/sino-dst/product/list/export', //产品列表导出
        productList: '/sino-dst/product/list',
        pushShelves: '/sino-dst/product/put-on-shelves',
        productRemove: '/sino-dst/product/remove',
        category: '/sino-dst/product/add//category',
        detail: '/sino-dst/product/detail',
        update: '/sino-dst/product/update',
        down_product: '/sino-dst/product/put-off-shelves',
        proCategorys: '/sino-dst/store-product-category/list',
        productDetail: '/sino-dst/product/detail',
        saveProduct: '/sino-dst/product/create',
        updateProduct: '/sino-dst/product/update',
        productCategory: '/sino-dst/store-product-category/list',
        remove: '/sino-dst/store-product-category/remove',
        categorySubmit: '/sino-dst/store-product-category/submit',
        brandList:'/sino-dst/factory/list',
        brandAdd:'/sino-dst/factory/save',
        brandUpdate:'/sino-dst/factory/update',
        brandRemove:'/sino-dst/factory/remove',

        specList:'/sino-dst/factory-product-spec/list',
        specUpdateOrAdd:'/sino-dst/factory-product-spec/submit',
        specRemove:'/sino-dst/factory-product-spec/remove'

    },
    factoryProduct: {
        getAllProductList: '/sino-dst/factory-product/list',
        SpecList: '/sino-dst/factory-product-category/list',
        addPro: '/sino-dst/factory-product/submit',
				shopAddPro: '/sino-dst/merchant/submit',
				shopCreate: '/sino-dst/merchant/create',
				shopUpdata: '/sino-dst/merchant/updata',
        detail: '/sino-dst/factory-product/detail',
				list: '/sino-dst/merchant/list',
        merchantList: '/sino-dst/merchant/list-all',
        authList: '/sino-dst/factory-product/mch/auth/list',
        saveAuth: '/sino-dst/factory-product/mch/auth',
        authRemove: '/sino-dst/factory-merchant-auth/remove',
				shopDetail: '/sino-dst/merchant/detail',

    },
    taskCenter: {
        taskCnt:'/sino-dst/notice/statistical',
    },
    report: {
        salesman:'/sino-dst/statistics/salesman/list',
        customerType:'/sino-dst/statistics/merchant/customer/type/count',
        customerTypeOrder:'/sino-dst/statistics/merchant/customer/type/order/count',
        merchantActive:'/sino-dst/statistics/merchant/active/detail',
    }

}

export default API
