<template>
  <div id="home" style="display:flex; flex-direction:row; margin-left: 50px" class="row">
    <div class="col-8">
      <b-card title="Questions" class="shadow bg-white" style="border-radius: 5px"></b-card>
      <Question v-for="question in questions" :key="question._id" :question="question" />
    </div>
    <div class="ml-1 col-3">
      <b-card>
          <p>
            <button class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Watched Tags
            </button>
          </p>
          <div class="collapse" id="collapseExample">
              <b-form @submit.prevent="addTag">
                <b-form-input id="watchedTag" class="my-2" v-model="tag" type="text" placeholder="Input a tag" required></b-form-input>
              </b-form>
          </div>
          <div id="tags" class="mt-2">
            <b-button v-for="(tag, i) in $store.state.tags" :key="i" variant="outline-secondary" size="sm" pill style="font-size: 0.8em; margin-left: 5px" @click="fetchTagQuestions(tag)">{{ tag }}</b-button>
          </div>
      </b-card>
      <b-card class="mt-2">
        <button class="btn btn-warning mb-3">Job Opportunity</button>
        <div class="mt-3" v-for="(job,i) in jobs" :key="i">
          <b>{{ job.title}}</b>
          <br>
          <p v-html="job.how_to_apply"></p>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { Question },
  computed: mapState(['questions', 'jobs']),
  data () {
    return {
      tag: ''
    }
  },
  methods: {
    goToDetail (id) {
      this.$router.push(`/questions/${id}`)
    },
    addTag () {
      this.$store.dispatch('addTag', { tag: this.tag })
        .then(message => {
          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
          this.$router.push('/')
        })
        .catch(errors => {
          console.log(errors, 'ini errorsss')
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'warning',
              title: error
            })
          })
        })
      this.tag = ''
    },
    fetchTagQuestions (tag) {
      this.$store.dispatch('fetchTagQuestions', { tag })
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('fetchTags')
    this.$store.dispatch('fetchJobs')
  }
}
</script>
