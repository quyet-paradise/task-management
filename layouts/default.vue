<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',

  setup() {
    const drawer = ref(false)
    const miniVariant = ref(false)
    const title = ref('Dashboard')
    const items = reactive([
      {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-account-supervisor',
          title: 'Staff management',
          to: '/staff'
        },
        {
          icon: 'mdi-calendar-check',
          title: 'Task management',
          to: '/task'
        }
    ])

    return {
      drawer,
      items,
      miniVariant,
      title
    }
  }
  
})
</script>
