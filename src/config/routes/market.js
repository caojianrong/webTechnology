//服务商
import ServiceProvider from '@/pages/CloudMarket/ServiceProvider';
import ServiceProviderFirst from '@/pages/CloudMarket/ServiceProviderFirst';
import ServiceProviderSecond from '@/pages/CloudMarket/ServiceProviderSecond';
import ServiceProviderDetail from '@/pages/CloudMarket/ServiceProvider/Detail';
import ServiceProviderFirstDetail from '@/pages/CloudMarket/ServiceProviderFirst/Detail';
import ServiceProviderSecondDetail from '@/pages/CloudMarket/ServiceProviderSecond/Detail';
//产品
import MarketProduct from '@/pages/CloudMarket/MarketProduct';
import MarketProductDetail from '@/pages/CloudMarket/MarketProduct/Detail';
import MarketProductFirst from '@/pages/CloudMarket/MarketProductFirst';
import MarketProductFirstDetail from '@/pages/CloudMarket/MarketProductFirst/Detail';
import MarketProductSecond from '@/pages/CloudMarket/MarketProductSecond';
import MarketProductSecondDetail from '@/pages/CloudMarket/MarketProductSecond/Detail';


export default [
    // 服务商
    {
        path: '/market/service/list',
        exact: true,
        component: ServiceProvider,
    },
    {
        path: '/market/service/list/detail',
        exact: true,
        component: ServiceProviderDetail,
    },
    {
        path: '/market/service/firstlist',
        exact: true,
        component: ServiceProviderFirst,
    },
    {
        path: '/market/service/firstlist/detail',
        exact: true,
        component: ServiceProviderFirstDetail,
    },
    {
        path: '/market/service/seclist',
        exact: true,
        component: ServiceProviderSecond,
    },
    {
        path: '/market/service/seclist/detail',
        exact: true,
        component: ServiceProviderSecondDetail,
    },
    // 产品
    {
        path: '/market/product/list',
        exact: true,
        component: MarketProduct,
    },
    {
        path: '/market/product/list/detail',
        exact: true,
        component: MarketProductDetail,
    },{
        path: '/market/product/firstlist',
        exact: true,
        component: MarketProductFirst,
    },
    {
        path: '/market/product/firstlist/detail',
        exact: true,
        component: MarketProductFirstDetail,
    },{
        path: '/market/product/seclist',
        exact: true,
        component: MarketProductSecond,
    },
    {
        path: '/market/product/seclist/detail',
        exact: true,
        component: MarketProductSecondDetail,
    }
];