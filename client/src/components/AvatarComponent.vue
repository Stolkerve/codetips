<template>
  <v-avatar
    size="32"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/john.jpg"
      alt="avatar"
    >
    </v-img>
  </v-avatar>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"

@Component
export default class AvatarComponent extends Vue {

}
</script>