<template>
  <div class="test-page-container">
    <div>
      <!-- <h1>Utils for Testing Below:</h1>
      <hr />
      <input type="text" v-model="filename" />
      <button @click="fetchImage">Fetch Image</button>
      <h2>API Response <code>/api/image</code>:</h2>
      <pre>{{ response }}</pre>
      <h2>Page Data:</h2>
      <pre>{{ page }}</pre>
      <h2>Sanitized Content:</h2>
      <pre>{{ sanitizeContent }}</pre> -->
    </div>
    <div>
      <h1>Markdown Document Below</h1>
      <hr />
      <ContentRenderer :value="page" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  MinimalElement,
  MinimalNode,
  MinimalText,
  MinimalTree,
} from "@nuxt/content";

type NodeVisitor = (
  type: string,
  props: Record<string, unknown>
) => Record<string, unknown>;

type TextNodeVisitor = (content: string) => string;

interface VisitorConfig {
  textNodeVisitors?: TextNodeVisitor[];
  nodeVisitors?: NodeVisitor[];
}

function processTree(
  minimalTree: MinimalTree,
  config: VisitorConfig
): MinimalTree {
  return {
    ...minimalTree,
    value: minimalTree.value.map((node) => visitNode(node, config)),
  };
}

function visitNode(
  minimalNode: MinimalNode,
  config: VisitorConfig
): MinimalNode {
  const { textNodeVisitors = [], nodeVisitors = [] } = config;

  if (typeof minimalNode === "string") {
    // it's a text node
    const result: MinimalText = textNodeVisitors.reduce(
      (content, visitor) => visitor(content),
      minimalNode
    );
    return result;
  }

  // it's some other element
  const [type, initialProps, ...children] = minimalNode;
  const updatedChildren = children.map((child) => visitNode(child, config));
  const updatedProps = nodeVisitors.reduce(
    (props, visitor) => visitor(type, props),
    initialProps
  );
  const result: MinimalElement = [type, updatedProps, ...updatedChildren];
  return result;
}

function imgSrcRewriter(urlRoot: string): NodeVisitor {
  return (type: string, props: Record<string, unknown>) => {
    if (type !== "img") return props;

    return {
      ...props,
      src: `${REPO_URL}${props.src}`,
    };
  };
}

// Usage example:
// declare const someTree: MinimalTree;

const REPO_URL = "https://raw.githubusercontent.com/herodevs/cli/HEAD/docs/";
const { data: page } = await useAsyncData(`page-hd-cli`, async () => {
  const response = await queryCollection("cli")
    .where("id", "=", "cli/docs/nes-init.md")
    .first();

  response.body = processTree(response.body, {
    nodeVisitors: [imgSrcRewriter(REPO_URL)],
  });
  return response;
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
