<template>
  <b-container id="home">
    <b-card title="My Answers" class="shadow bg-white" style="border-radius: 5px"></b-card>
    <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="border-radius: 8px !important;">
      <ListAnswer class="px-3" v-for="answer in answers" :key="answer._id" :answer="answer"></ListAnswer>
    </b-card>
  </b-container>
</template>

<script>
// @ is an alias to /src
import ListAnswer from '@/components/ListAnswer'
import { mapState } from 'vuex'

export default {
  name: 'myanswer',
  components: { ListAnswer },
  computed: mapState(['answers']),
  methods: {
    goToDetail (id) {
      this.$router.push(`/questions/${id}`)
    }
  },
  created () {
    this.$store.dispatch('fetchMyAnswers')
  }
}
</script>
