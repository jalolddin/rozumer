<template>
    <div class="profile__events">
        <span @click="chooseTab(info)" v-for="info in event" :key="info" :class="{'activeEvent': selectedTab === info}"> {{info}}</span>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative, Prop, Ref } from 'vue-facing-decorator'
interface UserEvents {
  bio: string;
  connection: string;
  events: string;
  location: string;
  groups: string;
  menu: string
}
@Component
export default class Tabs extends Vue {
selectedTab = 'Био'
@Prop({ type: Object, required: true })
    private event!: UserEvents;
    chooseTab(tab: string){
      this.selectedTab = tab
    }
}

</script>>
<style scoped lang="scss">
.profile__events{
    display: flex;
    justify-content: space-evenly;
    padding: 1rem;
    overflow-x: scroll;
    scrollbar-width: none; 
   -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; 
    }
    span{
    cursor: pointer;
    color: #9eb3b6;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    height: 2rem;
    width: 5rem;
    border-radius: 0.5rem;
    align-items: center;
  }
  .activeEvent{
      background: #59C9FB;
      color: white;
      font-weight: 600;
      transition: all ease 0.3s;
    }
  }
</style>