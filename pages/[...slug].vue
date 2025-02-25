<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("content").path(route.path).first()
);
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <NuxtLink to="/test-page">
      <h1 class="text-4xl font-bold mb-4">TEST PAGE CLICK HERE</h1>
    </NuxtLink>
    <ContentRenderer v-if="page" :value="page">
      <template #empty>
        <div class="text-center py-8">
          <h1 class="text-4xl font-bold mb-4">Page not found</h1>
          <NuxtLink to="/" class="text-blue-500 hover:underline">
            Return home
          </NuxtLink>
        </div>
      </template>
    </ContentRenderer>
  </main>
</template>
