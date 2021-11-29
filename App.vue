<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello?",
    };
  },
};
</script>

<style scoped lang="scss">
$color: red;

h1 {
  color: $color;
  display: flex;
}
</style>