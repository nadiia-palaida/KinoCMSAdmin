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
            path: '/cinemas-hall/:id?',
            name: 'admin-cinemas-hall',
            component: () => import('../views/AdminCinemaHallView.vue')
        },
        {
            path: '/cinema-page/:id?',
            name: 'admin-cinemas-page',
            component: () => import('../views/AdminCinemaPageView.vue')
        },
        {
            path: '/promotions',
            name: 'admin-promotions',
            component: () => import('../views/AdminPromotionsView.vue')
        },
        {
            path: '/news',
            name: 'admin-news',
            component: () => import('../views/AdminNewsView.vue')
        },
        {
            path: '/pages',
            name: 'admin-pages',
            component: () => import('../views/AdminPagesView.vue')
        },
        {
            path: '/users',
            name: 'admin-users',
            component: () => import('../views/AdminUsersView.vue')
        },
        {
            path: '/subscribe',
            name: 'admin-subscribe',
            component: () => import('../views/AdminSubscribeView.vue')
        }
    ]
})

export default router
