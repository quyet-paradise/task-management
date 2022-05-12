<template>
  <v-row justify="center" align="center">
    <v-col class="text-center" cols="12" sm="8" md="6">
      <v-btn
        class="ma-2"
        outlined
        large
        color="indigo"
        @click="router.push('/staff')"
      >
        <v-icon>mdi-account-supervisor</v-icon>
        <span>Staff management</span>
      </v-btn>
    </v-col>

    <v-col class="text-center" cols="12" sm="8" md="6">
      <v-btn
        class="ma-2"
        outlined
        large
        color="indigo"
        @click="router.push('/task')"
      >
        <v-icon>mdi-calendar-check</v-icon>
        <span>Task management</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const router = useRouter()

    return {
      router
    }
  }
})
</script>
