<template>
  <div  class="profile">

    <div class="profile__header">
      <span class="profile__header__back">Назад</span>
      <div>
        <h1>NEIRA</h1>
        <span>бот</span>
      </div>
      <img src="../assets/images/menu.svg" alt="">
    </div>
      
          <!-- Inner profile -->
          <div v-show="activeProfile" class="profile__inner">
            <img  @click="closeProfile(activeProfile)" class="back" src="../assets/images/arrow-back.svg" alt="">
              <swiper v-if="activeProfile" class="profile__inner__slider">
                <swiper-slide ref="avatar" v-for="(image, index) in activeProfile.images" :key="image">
                  <span class="avatar-image-count">{{index + 1}} / {{activeProfile.images.length}}</span>
                  <img  class="avatar-image" :src="image" alt="">
                </swiper-slide>
              </swiper>
              <div v-if="activeProfile" class="profile__inner__info">
                <h1>{{activeProfile.name}}</h1>
                <div class="profile__inner__info__action">
                  <span class="status">{{activeProfile.status}}</span>
                  <span class="action">{{activeProfile.lastAction}}</span>
                </div>
              </div>
            </div>

              <!-- Outer Profile -->
                <div v-if="!activeProfile" class="profile__outer">
                  <img @click="openProfile(user)" v-if="user.images[0]" class="profile__outer__avatar" :src="user.images[0]" alt="">
              <div class="profile__outer__info">
                <h1>{{user.name}}</h1>
                <div class="profile__outer__info__action">
                  <span class="status">{{user.status}}</span>
                  <span class="action">{{user.lastAction}}</span>
                  </div>
                </div>
              </div>
            
            <!-- TABS -->
              <Tabs :event="UserEvents" />
   </div>
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop, Ref } from 'vue-facing-decorator'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { gsap } from 'gsap'
import Tabs from './Tabs.vue';
interface UserProfile {
  opened: boolean;
  images: string;
  name: string;
  status: string;
  lastAction: string;
}

@Component({
    components: {
      Swiper,
      SwiperSlide,
      Tabs
    }
})

export default class Profile extends Vue {
    activeProfile: any = null;
    UserEvents = {
      bio: "Био",
      connection: "Связи",
      events: "События",
      location: "Локации",
      groups: "Группы",
      menu: "Меню",
    };
    @Ref('avatar') avatar!: HTMLElement;
    @Prop({ type: Object, required: true })
    private user!: UserProfile;

    // open the profile
    private openProfile(status: any): void {
    this.activeProfile = status
    this.$emit('open-profile', status);
    const avatarImage = this.avatar
    gsap.from(avatarImage, {
      x: "100%", // Move the element from the right side
      y: "100%", // Move the element from the bottom side
      duration: 1,
    });
  }

  // close the profile
  private closeProfile(status: any): void {
    this.activeProfile = null
    this.$emit('close-profile', status)
    const avatarImage = this.avatar
    gsap.fromTo(avatarImage, { opacity: 1 }, { opacity: 0, duration: 1 });
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    padding-top: 1rem;
    width: 28rem;
  height: 46rem;
  position: absolute;
  font-family: sans-serif;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 10rem;
  background-color: #262D30;
  overflow: auto;
  &__header{
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: -0.5rem;
  justify-content: space-between;
  &__back{
    color: white;
    cursor: pointer;
  }
  img{
    height: 1.8rem;
    cursor: pointer;
  }
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -1rem;
    h1{
      font-size: 1.3rem;
      color: white;
    }
    span{
      font-size: 0.8rem;
      margin-top: -0.7rem;
      color: #9eb3b6;
    }
  }
  }
  &__outer {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: -0.5rem;
      padding: 1rem;
       &__avatar {
          object-position: center;  
          height: 5rem; 
          width: 5rem;
          object-fit: cover;
          border-radius: 0.5rem;
          cursor: pointer;
      }
      &__info {
          display: flex;
          flex-direction: column;
          margin-top: -1.1rem;
          h1 {
              color: #39B6C5;
              font-size: 1.3rem;
          }
          &__action {
              margin-top: -0.8rem;
              display: flex;
              flex-direction: column;
              gap: 0.2rem;
              .status {
                  color: white;
                  font-size: 0.8rem;
              }
              .action {
                  font-size: 0.7rem;
                  color: #9eb3b6;
              }
          }
      }
  }
  &__inner{    
    position: relative; 
    right: 0;
    .back{
      position: absolute;
      height: 2rem;
      z-index: 99;
      left: 5%;
      top: 5%;
      cursor: pointer;
    }
    &__slider {
        height: 24rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        padding: 0;
        display: flex;
        align-items: flex-end;
        position: relative;
        .avatar-image {
            width: 100%;
        }
        .avatar-image-count {
          color: white;
          position: absolute;
          right: 5%;
          top: 5%;
          z-index: 99;
      }
    }
    &__info {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        bottom: 0;
        z-index: 99;
        position: absolute;
        h1 {
          color: white;
          font-size: 1.7rem;
          margin: 1rem;
      }
      &__action{
        margin: 1rem;
        margin-top: -0.8rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        .status {
            color: lightgreen;
            opacity: 0.8;
            font-size: 0.9rem;
        }
        .action {
            font-size: 0.8rem;
            color: white;
            opacity: 0.7;
        }
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .profile{
    width: 90%;
  }
}

</style>