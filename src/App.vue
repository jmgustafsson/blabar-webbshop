<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- <Checkout /> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped></style>
