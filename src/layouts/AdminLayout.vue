<script setup>
const menu = [
  {
    label: 'Статистика',
    link: 'admin-statistics'
  },
  {
    label: 'Баннера/Слайдера',
    link: 'admin-banners'
  },
  {
    label: 'Фильмы',
    link: 'admin-films'
  },
  {
    label: 'Кинотеатры',
    link: 'admin-cinemas'
  },
  {
    label: 'Новости',
    link: 'admin-news'
  },
  {
    label: 'Акции',
    link: 'admin-promotions'
  },
  {
    label: 'Страницы',
    link: 'admin-pages'
  },
  {
    label: 'Пользователи',
    link: 'admin-users'
  },
  {
    label: 'Рассылка',
    link: 'admin-subscribe'
  },
]
</script>

<template>
  <main class="layout-fixed layout-navbar-fixed">
    <div class="wrapper">
      <div class="main-header navbar navbar-expand navbar-light admin-header pr-5">
        <div class="ml-auto admin-header__content">
          <h5 class="admin-user mr-4">
            <span class="admin-user__icon">
              <i class="fa-solid fa-user"></i>
            </span>
            <span>Administrator</span>
          </h5>

          <button class="admin-user__logout">
            <h5>
              <i class="fa-solid fa-power-off"></i>
            </h5>
          </button>
        </div>
      </div>

      <aside class="main-sidebar sidebar-dark-primary admin-sidebar">
        <router-link :to="{name: 'admin-home'}" class="brand-link admin-logo">
          <div class="logo__img-wrap">
            <img src="@/assets/imgs/logo.png" alt="logo" class="logo__img">
          </div>
        </router-link>

        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li v-for="menuItem in menu" class="nav-item menu-open">
              <router-link :to="{name: menuItem.link}" class="nav-link" :class="{active: $route.name === menuItem.link}">
                <p>
                  {{ menuItem.label }}
                </p>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="content-wrapper pt-4 pb-4 pr-5 pl-5">
        <slot></slot>
      </div>
    </div>
  </main>
</template>

<style>
@import "admin-lte/dist/css/adminlte.min.css";
</style>
