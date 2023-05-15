import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/AdminHomeView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/statistics',
            name: 'admin-statistics',
            component: () => import('../views/AdminStatisticsView.vue')
        },
        {
            path: '/banners',
            name: 'admin-banners',
            component: () => import('../views/AdminBannersView.vue')
        },
        {
            path: '/films',
            name: 'admin-films',
            component: () => import('../views/AdminFilmsView.vue')
        },
        {
            path: '/films-page/:id?',
            name: 'admin-films-page',
            component: () => import('../views/AdminFilmsPageView.vue')
        },
        {
            path: '/cinemas',
            name: 'admin-cinemas',
            component: () => import('../views/AdminCinemasView.vue')
        },
        {
            path: '/cinema-page/:id?',
            name: 'admin-cinemas-page',
            component: () => import('../views/AdminCinemaPageView.vue')
        },
        {
            path: '/seans-page/:id?',
            name: 'admin-seans-page',
            component: () => import('../views/AdminSeansPageView.vue'),
        },
        {
            path: '/seanses',
            name: 'admin-seanses',
            component: () => import('../views/AdminSeansesView.vue')
        },
        {
            path: '/promotions',
            name: 'admin-promotions',
            component: () => import('../views/AdminPromotionsView.vue')
        },
        {
            path: '/promotions-page/:id?',
            name: 'admin-promotions-page',
            component: () => import('../views/AdminPromotionPageView.vue')
        },
        {
            path: '/news',
            name: 'admin-news',
            component: () => import('../views/AdminNewsView.vue')
        },
        {
            path: '/news-page/:id?',
            name: 'admin-news-page',
            component: () => import('../views/AdminNewsPageView.vue')
        },
        {
            path: '/pages',
            name: 'admin-pages',
            component: () => import('../views/AdminPagesView.vue')
        },
        {
            path: '/pages/default-page/:id?',
            name: 'admin-pages-default',
            component: () => import('../views/pages/DefaultPageView.vue')
        },
        {
            path: '/pages/main-page',
            name: 'admin-pages-main',
            component: () => import('../views/pages/MainPageView.vue')
        },
        {
            path: '/pages/contacts-page',
            name: 'admin-pages-contacts',
            component: () => import('../views/pages/ContactsPageView.vue')
        },
        {
            path: '/pages/cafe',
            name: 'admin-pages-cafe',
            component: () => import('../views/pages/CafePageView.vue')
        },
        {
            path: '/users',
            name: 'admin-users',
            component: () => import('../views/AdminUsersView.vue')
        },
        {
            path: '/users-page/:id',
            name: 'admin-users-page',
            component: () => import('../views/AdminUsersPageView.vue')
        },
        {
            path: '/subscribe',
            name: 'admin-subscribe',
            component: () => import('../views/AdminSubscribeView.vue')
        }
    ]
})

export default router
