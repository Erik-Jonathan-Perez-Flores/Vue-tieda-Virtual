import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
const Denied = () => import(/* webpackChunkName: "Denied" */ '../components/Denied.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ContentClient" */ '../views/client/ContentClient.vue'),
    children:[
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/client/data/HomeClient.vue'),
      },
      {
        path: '/detailproduct/:id',
        name: 'DetailProduct',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "DetailProduct" */ '../views/client/data/DetailProduct.vue'),
        props:true
      },
      {
        path: '/contact',
        name: 'ContactClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ContactClient" */ '../views/client/data/ContactClient.vue'),
      },
      {
        path: '/shoppingcart',
        name: 'ShoppingCartClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ShoppingCartClient" */ '../views/client/data/ShoppingCartClient.vue'),
      },
      {
        path: '/payment',
        name: 'PaymentClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "PaymentClient" */ '../views/client/data/PaymentClient.vue'),
      },
      {
        path: '/detailsuser',
        name: 'DetailsUserClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "DetailsUserClient" */ '../views/client/data/DetailsUserClient.vue'),
      },
      {
        path: '/orders',
        name: 'OrderClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "OrderClient" */ '../views/client/data/OrderClient.vue'),
      },
      {
        path: '/qr/:id',
        name: 'QrDetailsClient',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "QrDetailsClient" */ '../views/client/data/QrDetailsClient.vue'),
        props:true
      },
      {
        path: '/clientbusiness',
        name: 'ClientBussines',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ClientBussines" */ '../views/client/data/Bussines.vue'),
      },
    ]
  },
  {
    path: '/homeadm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ContentClient" */ '../views/admin/ContentAdmin.vue'),
    children:[
      {
        path: '',
        name: 'HomeAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* HomeAdmin: "Home" */ '../views/admin/data/HomeAdmin.vue'),
      },
      {
        path: '/uploadadm',
        name: 'NewProduct',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* HomeAdmin: "NewProduct" */ '../views/admin/data/NewProduct.vue'),
      },
      {
        path: '/productlistadm',
        name: 'ProductList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "NewPrProductListoduct" */ '../views/admin/data/ProductList.vue'),
      },
      {
        path: '/producteditadm/:id',
        name: 'EditProduct',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "EditProduct" */ '../views/admin/data/EditProduct.vue'),
        props:true
      },
      {
        path: '/techservice',
        name: 'TechnicalService',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "TechnicalService" */ '../views/admin/data/TechnicalService.vue'),
      },
      {
        path: '/reqqr',
        name: 'QrResponse',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "QrResponse" */ '../views/admin/data/QrResponse.vue'),
      },
      {
        path: '/payment/:id',
        name: 'DetailsPayment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "DetailsPayment" */ '../views/admin/data/DetailsPayment.vue'),
        props:true
      },
      {
        path: '/quot',
        name: 'Quot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "Quot" */ '../views/admin/data/Quot.vue'),
        props:true
      },
      {
        path: '/detailsquot/:id',
        name: 'DetailsQuot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "DetailsQuot" */ '../views/admin/data/DetailsQuot.vue'),
        props:true
      },
      {
        path: '/business',
        name: 'Business',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "Business" */ '../views/admin/data/Business.vue'),
      },
      {
        path: '/reports',
        name: 'Reports',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "Reports" */ '../views/admin/data/Reports.vue'),
      },
      {
        path: '/admins',
        name: 'Admins',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "Admins" */ '../views/admin/data/Admins.vue'),
      },
      {
        path: '/detailsadmin',
        name: 'DetailsAdmin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component:() => import(/* ProductList: "DetailsAdmin" */ '../views/admin/data/DetailsAdmin.vue')
      },
      {
        path: '/uploadcategory',
        name: 'UploadCategory',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/* ProductList: "UploadCategory" */ '../views/admin/data/UploadCategory.vue'),
      },
      {
        path: '/categorylist',
        name: 'CategoryList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/*  "CategoryList" */ '../views/admin/data/CategoryList.vue'),
      },
      {
        path: '/updatecategory/:id',
        name: 'EditCategory',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
        component: () => import(/*  "EditCategory" */ '../views/admin/data/EditCategory.vue'),
        props:true
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginClient',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "LoginClient" */ '../views/client/LoginClient.vue'),
  },
  {
    path: '/register',
    name: 'RegisterClient',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "RegisterClient" */ '../views/client/RegisterClient.vue'),
  },
  {
    path: '/admin',
    name: 'LoginAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "LoginAdmin" */ '../views/admin/LoginAdmin.vue'),
  },
  {
    path: '/registeradm',
    name: 'RegisterAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route      // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "RegisterClient" */ '../views/admin/RegisterAdmin.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
