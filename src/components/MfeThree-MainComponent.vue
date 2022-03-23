<template>
  <div class="hello">
    <h1>{{ 'Micro Frontend Three (Vue 3 + Leaflet)' }}</h1>
    <div class="login-info">
      <div class="logged" v-if="logged">Logged in with token {{ token }}</div>
      <div class="not-logged" v-else>Not Logged</div>
    </div>
    <MfeThreeChildComponent v-if="logged" />
  </div>
</template>

<script>
import { ref } from "vue";
import { auth$ } from "ModuleAuth/ModuleAuth";
import MfeThreeChildComponent from './MfeThree-ChildComponent.vue'

export default {
  components: {
    MfeThreeChildComponent
  },
  props: {
  },

  setup() {
    const count = ref(0);
    const logged = ref(false);
    const user = ref("");
    const token = ref("");

    auth$.subscribe((payload) => {
      token.value = payload.sessionToken;
      user.value = payload.user;
      logged.value = !!payload.sessionToken;
    });

    // expose to template and other options API hooks
    return {
      count,
      logged,
      user,
      token,
    };
  },

  mounted() {
    console.log(this.count); // 0
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.not-logged {
  background-color: pink;
  width: 100px;
}
.logged {
  background-color: greenyellow;
  width: 250px;
}
</style>
