<template>
  <div class="post-detail">
    <router-link :to="{ name: 'PostList' }">Voltar para a lista de artigos.</router-link>

    <div v-if="hasErrors" class="post-detail__error">
      Deu ruim!
    </div>

    <div v-if="isLoading" class="post-detail__loading">
      Carregando o artigo, aguarde...
    </div>

    <template v-if="hasPost">
      <post-card :post="post" />
    </template>
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
    hasPost () {
      const post = Object.keys(this.post)
      return post && post.length
    },

    id () {
      return this.$route.params.id
    },

    ...mapGetters([
      'post'
    ])
  },

  created () {
    this.fetchPost(this.id)
  },

  destroyed () {
    this.clearPost()
  },

  methods: {
    async fetchPost (id) {
      if (this.isLoading) {
        return null
      }

      this.hasErrors = false
      this.isLoading = true

      try {
        await this.getPost(id)
      } catch (error) {
        this.hasErrors = true
        throw new Error('Não foi possível carregar o artigo.')
      } finally {
        this.isLoading = false
      }
    },

    ...mapActions([
      'clearPost',
      'getPost'
    ])
  }
}
</script>
