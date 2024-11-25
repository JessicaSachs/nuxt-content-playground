<template>
  <div class="code-block">  
    <pre v-html="code" v-if="!highlighted"></pre>
    <pre v-html="highlighted" v-else></pre>
  </div>
</template>

<script setup lang="ts">
import { useShiki } from '#imports'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  lang?: string
  code: string
}>()

const highlighted = ref('')
const highlighter = useShiki()

onMounted(async () => {
  highlighted.value = await highlighter.highlight(props.code, props.lang || 'plaintext')
})
</script>

<style scoped>
.code-block :deep(pre) {
  margin: 0;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
