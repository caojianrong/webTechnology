import {
  CreateAttribute,
  CreateCategory,
  CreateProduct,
  ProductDetail,
  AttributeList,
  CategoryList,
  Management,
  UpperAndLower,
} from '@/pages/ProductCenter';

export default [
  {
    path: '/product/category-list',
    exact: true,
    component: CategoryList,
  },
  {
    path: '/product/attribute-list',
    exact: true,
    component: AttributeList,
  },
  {
    path: '/product/create-category',
    exact: true,
    component: CreateCategory,
  },
  {
    path: '/product/create-category/:id',
    exact: true,
    component: CreateCategory,
  },
  {
    path: '/product/create-attribute',
    exact: true,
    component: CreateAttribute,
  },
  {
    path: '/product/management',
    exact: true,
    component: Management,
  },
  {
    path: '/product/detail/:id',
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/product/upper-and-lower/:id',
    exact: true,
    component: UpperAndLower,
  },
  {
    path: '/product/config',
    exact: true,
    component: CreateProduct,
  },
  {
    path: '/product/config/:id',
    exact: true,
    component: CreateProduct,
  },
];
