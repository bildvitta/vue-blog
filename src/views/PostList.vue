<template>
  <div class="post-list">
    <h1 class="post-list__title">Lista de artigos</h1>

    <div v-if="hasErrors" class="post-list__error">
      Deu ruim!
    </div>

    <template v-if="hasPosts">
      <post-card v-for="post in posts" :key="post.id" :post="post" />
    </template>

    <div v-if="isLoading" class="post-list__loading">
      Carregando os artigos, aguarde...
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PostCard
  },

  data () {
    return {
      hasErrors: false,
      isLoading: false
    }
  },

  computed: {
    hasPosts () {
      return this.posts && this.posts.length
    },

    ...mapGetters([
      'posts'
    ])
  },

  created () {
    this.fetchPosts()
  },

  destroyed () {
    this.clearPosts()
  },

  methods: {
    async fetchPosts () {
      if (this.isLoading) {
        return null
      }

      this.hasErrors = false
      this.isLoading = true

      try {
        await this.getPosts()
      } catch (error) {
        this.hasErrors = true
        throw new Error('Não foi possível carregar os artigos.')
      } finally {
        this.isLoading = false
      }
    },

    ...mapActions([
      'clearPosts',
      'getPosts'
    ])
  }
}
</script>
