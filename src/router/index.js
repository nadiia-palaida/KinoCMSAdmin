import {createRouter, createWebHistory} from 'vue-router'

const adminRoutes = [
    {
        path: '/admin',
        name: 'admin-home',
        component: () => import('../views/admin/AdminHomeView.vue')
    },
    {
        path: '/admin/statistics',
        name: 'admin-statistics',
        component: () => import('../views/admin/AdminStatisticsView.vue')
    },
    {
        path: '/admin/banners',
        name: 'admin-banners',
        component: () => import('../views/admin/AdminBannersView.vue')
    },
    {
        path: '/admin/films',
        name: 'admin-films',
        component: () => import('../views/admin/AdminFilmsView.vue')
    },
    {
        path: '/admin/cinemas',
        name: 'admin-cinemas',
        component: () => import('../views/admin/AdminCinemasView.vue')
    },
    {
        path: '/admin/promotions',
        name: 'admin-promotions',
        component: () => import('../views/admin/AdminPromotionsView.vue')
    },
    {
        path: '/admin/news',
        name: 'admin-news',
        component: () => import('../views/admin/AdminNewsView.vue')
    },
    {
        path: '/admin/pages',
        name: 'admin-pages',
        component: () => import('../views/admin/AdminPagesView.vue')
    },
    {
        path: '/admin/users',
        name: 'admin-users',
        component: () => import('../views/admin/AdminUsersView.vue')
    },
    {
        path: '/admin/subscribe',
        name: 'admin-subscribe',
        component: () => import('../views/admin/AdminSubscribeView.vue')
    },
]

const clientRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/',
        name: 'client-home',
        component: () => import('../views/client/ClientHomeView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...adminRoutes,
        ...clientRoutes
    ]
})

export default router
