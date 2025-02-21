<template>
  <main class="container mx-auto px-4 py-8">
    <ContentRenderer v-if="data" :value="data" />
    <div v-else>Loading...</div>
  </main>
</template>

<script setup>
const { data } = await useAsyncData("readme", () =>
  queryCollection("vuejs").where("id", "=", "vuejs/README.md").first()
);

watch(
  data,
  (newVal) => {
    console.log("data", newVal);
  },
  { immediate: true }
);
</script>

<style>
.container :deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.container :deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.container :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.container :deep(code) {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

.container :deep(pre) {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.container :deep(ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.container :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
