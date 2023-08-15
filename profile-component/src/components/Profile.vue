<template>
  <div  class="profile">

    <h1 class="my__connects">Мои коннекты</h1>
      
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
            <div v-if="activeProfile" class="profile__events">
              <span>Био</span>
              <span>События</span>
              <span>Локации</span>
              <span>Группы</span>
              <span>Меню</span>
            </div>

        <!-- Outer Profile -->
        <div  v-for="profile in profiles" :key="profile">
          <div v-if="!activeProfile" class="profile__outer">
            <img @click="openProfile(profile)" v-if="profile.images[0]" class="profile__outer__avatar" :src="profile.images[0]" alt="">
         <div class="profile__outer__info">
           <h1>{{profile.name}}</h1>
           <div class="profile__outer__info__action">
             <span class="status">{{profile.status}}</span>
             <span class="action">{{profile.lastAction}}</span>
            </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop, Ref } from 'vue-facing-decorator'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { gsap } from 'gsap'
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
    }
})
export default class Profile extends Vue {
  activeProfile: any = null;
  @Ref('avatar') avatar!: HTMLElement;
  @Prop({ type: Array as () => Array<UserProfile>, required: true })
    private profiles!: UserProfile[];
    
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
  private closeProfile(status: any): void {
    this.activeProfile = null
    this.$emit('close-profile', status)
    const avatarImage = this.avatar
    gsap.fromTo(avatarImage, { opacity: 1 }, { opacity: 0, duration: 1 });
  }
}
</script>

<style lang="scss" scoped>
.my__connects{
  color: white;
  text-align: center;
  font-size: 1.5rem;
}
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
  &__events{
    display: flex;
    gap: 1rem;
    span{
    cursor: pointer;
    color: #9eb3b6;
    font-size: 0.8rem;
    padding: 1rem;
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