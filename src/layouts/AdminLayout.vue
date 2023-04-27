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
  <div class="wrapper">
    <div class="main-header">

    </div>
    <div class="main-sidebar sidebar-dark-primary admin-sidebar">
      <router-link :to="{name: 'admin-home'}">
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
                <i class="right fas fa-angle-left"></i>
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style>
@import "admin-lte/dist/css/adminlte.min.css";
</style>
