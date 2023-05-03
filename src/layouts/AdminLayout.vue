<script setup>
const menu = [
  {
    label: 'Статистика',
    link: 'admin-statistics'
  },
  {
    label: 'Банери/Слайдери',
    link: 'admin-banners'
  },
  {
    label: 'Фільми',
    link: 'admin-films',
    sublist: [
      {
        label: 'Сторінка фільму',
        link: 'admin-films-page',
      }
    ]
  },
  {
    label: 'Кінотеатри',
    link: 'admin-cinemas'
  },
  {
    label: 'Новини',
    link: 'admin-news'
  },
  {
    label: 'Акції',
    link: 'admin-promotions'
  },
  {
    label: 'Сторінки',
    link: 'admin-pages'
  },
  {
    label: 'Користувачі',
    link: 'admin-users'
  },
  {
    label: 'Розсилка',
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
        <router-link :to="{name: 'home'}" class="brand-link admin-logo">
          <div class="logo__img-wrap">
            <img src="@/assets/imgs/logo.png" alt="logo" class="logo__img">
          </div>
        </router-link>

        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li v-for="menuItem in menu" class="nav-item menu-open">
              <router-link :to="{name: menuItem.link}" class="nav-link"
                           :class="{active: $route.name === menuItem.link}">
                <p>
                  {{ menuItem.label }}
                </p>
                <i v-if="menuItem.sublist && menuItem.sublist.length" class="right fas fa-angle-left"></i>
              </router-link>

              <ul v-if="menuItem.sublist && menuItem.sublist.length" class="nav nav-treeview">
                <li v-for="submenuItem in menuItem.sublist" class="nav-item">
                  <router-link :to="{name: submenuItem.link}" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ submenuItem.label }}</p>
                  </router-link>
                </li>
              </ul>
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
@import "admin-lte/dist/css/adminlte.css";
@import "toastr/build/toastr.css";
</style>
