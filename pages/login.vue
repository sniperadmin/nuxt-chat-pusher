<template>
  <div class="login">
    <b-jumbotron
      header="Nuxt Pusher Chat"
      lead="Powered by Bootstrap-Vue and pusher"
      bg-variant="info"
      text-variant="white"
    >
      <p>For more information visit website</p>
      <b-btn target="_blank" href="https://pusher.com/">
        More Info
      </b-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col lg="4" md="3" />
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
