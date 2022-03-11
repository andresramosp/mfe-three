<template>
  <div class="hello">
    <h1>{{ 'Hello from Micro Frontend Three' }}</h1>
    <ChildComponent />
  </div>
</template>

<script>
import { ref } from "vue";
// import 'element-plus/dist/index.css'
import ChildComponent from './MfeThree-ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  props: {
  },

  setup() {
    const count = ref(0);

    // expose to template and other options API hooks
    return {
      count,
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
</style>
