<template>
  <div class="test-page-container">
    <div>
      <h1>Utils for Testing Below:</h1>
      <hr />
      <input type="text" v-model="filename" />
      <button @click="fetchImage">Fetch Image</button>
      <h2>API Response <code>/api/image</code>:</h2>
      <pre>{{ response }}</pre>
      <h2>Page Data:</h2>
      <pre>{{ page }}</pre>
      <h2>Sanitized Content:</h2>
      <pre>{{ sanitizeContent }}</pre>
    </div>
    <div>
      <h1>Markdown Document Below</h1>
      <hr />
      <ContentRenderer :value="sanitizeContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MinimalNode, MinimalTree } from "@nuxt/content";

const response = ref("");
const REPO_URL = "https://raw.githubusercontent.com/herodevs/cli/HEAD";

const filename = ref("nes-init.png");
// First, fetch the page data
const { data: page } = await useAsyncData(`page-hd-cli`, () => {
  return queryCollection("cli")
    .where("id", "=", "cli/docs/nes-init.md")
    .first();
});

const fetchImage = async () => {
  response.value = await $fetch("/api/image/" + filename.value);
};

await fetchImage();

/**
 * Then transform the content to be used in the page
 * 1. Handle duplicated UI
 *     * We need to remove the H1 if it exists and is identical
 *     * We need to extract the description from the first paragraph to ensure it's not duplicated
 * 2. Local Assets are not available relative to the Markdown sources they come from.
 *     * We need to transform the relative paths to absolute paths
 *     * OR I need to write a `server/api/[filename].ts` endpoint that returns the asset relative to the page
 *     * Option 2 is preferred, but I couldn't figure out how to do it.
 */
const sanitizeContent = computed(() => {
  return page.value;
  if (!("value" in (page.value?.body ?? {}))) return page.value;

  const body = page.value?.body as unknown as MinimalTree;
  let bodyValue = body.value;
  let result = { ...page.value };

  console.log("Initial bodyValue:", JSON.stringify(bodyValue, null, 2));

  // Process nodes recursively
  const processNodes = (nodes: MinimalNode[]): MinimalNode[] => {};

  // Extract H1 if it exists
  if (bodyValue[0]?.[0] === "h1") {
    console.log("Removing H1");
    bodyValue = bodyValue.slice(1);
  }

  // Extract description from first paragraph if it exists
  if (bodyValue[0]?.[0] === "p") {
    console.log("Extracting description from paragraph");
    result.description = bodyValue[0][1];
    bodyValue = bodyValue.slice(1);
  }

  // Process all nodes and update the result
  result.body = {
    ...body,
    value: processNodes(bodyValue),
  };

  console.log("Final result:", result);
  return { ...result, ...result.meta };
});
</script>

<style>
.test-page-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

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

pre {
  max-height: 400px;
  overflow-y: auto;
  max-width: 500px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
