<template>
  <section class="content">
    <h1>Profile</h1>

    <profile-card :user="user" />

    <h2>My Status</h2>
    
    <router-link to="/">Choose my next visa</router-link>

    <visa-dates-card class="dates-card" :user="user" />

    <h2>Tools</h2>

    <tools :user="user" />
  </section>
</template>

<script>
import profileCard from '@/components/profile/ProfileCard'
import visaDatesCard from '@/components/profile/VisaDatesCard'
import tools from '@/components/profile/Tools'

export default {
  props: { user: { required: true, type: Object } },
  components: { profileCard, visaDatesCard, tools }
}
</script>
