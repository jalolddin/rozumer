<template>
  <Profile 
  :user="userProfile"
  @open-profile="openProfile"
  @close-profile="closeProfile"
  />
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop } from 'vue-facing-decorator'
import Profile from './components/Profile.vue'
@Component({
    components: { 
      Profile
    }
})
export default class App extends Vue { 
  userProfile = {
      opened: false,
      name: 'Brendans',
      status: 'Сейчас свободен',
      lastAction: 'Был рядом 30 минут назад',
      images: [ 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg', 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80']
    }
  openProfile(status: any){
    status.opened = true
  }
  closeProfile(status: any) {
    status.opened = false
  }
}

</script>