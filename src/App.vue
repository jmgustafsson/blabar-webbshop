<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- <Checkout /> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
// import Checkout from "./views/Checkout";

export default {
  components: {
    Navbar,
    // Checkout,
  },
};
</script>

<style lang="scss" scoped></style>
