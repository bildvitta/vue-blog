<template>
  <article class="post-card">
    <header class="post-card__header">
      <h3 class="post-card__title">
        <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">{{ post.title }}</router-link>
      </h3>
    </header>

    <div v-if="post.body" class="post-card__content">
      {{ post.body }}
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      default: () => ({}),
      required: true,
      type: Object
    }
  }
}
</script>
