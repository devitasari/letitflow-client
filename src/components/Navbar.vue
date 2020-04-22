<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container>
        <b-navbar-brand style="color: #FB9A3F; cursor: pointer" @click="goToHome"><img alt="Qries" src="https://img.icons8.com/color/48/000000/stackoverflow.png" width="70" height="30"><span style="font-size: 1.5rem">LetIt</span><span style="font-size: 1.5rem; font-weight: bold">Flow</span></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="auth.token" href="" @click.prevent="goToAddQuestion">+ Question</b-nav-item>
            <b-nav-item v-if="!auth.token" href="" @click.prevent="goToSignin">Login</b-nav-item>
            <b-nav-item-dropdown v-if="auth.token" right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ auth.payload.name }}</em>
              </template>
              <b-dropdown-item data-toggle="modal" data-target="#exampleModal">Delete Watched Tag</b-dropdown-item>
              <b-dropdown-item href="" @click.prevent="goToMyQuestion">My Question</b-dropdown-item>
              <b-dropdown-item href="" @click.prevent="goToMyAnswer">My Answer</b-dropdown-item>
              <b-dropdown-item href="" @click.prevent="signout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Tag</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input v-model="tag">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteTag">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: mapState(['auth']),
  data () {
    return {
      tag: ''
    }
  },
  methods: {
    deleteTag () {
      this.$store.dispatch('deleteTag', { tag: this.tag })
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
          this.tag = ''
          this.$router.push('/')
        })
        .catch(errors => {
          this.loading = false
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
    },
    goToHome () {
      this.$store.dispatch('fetchQuestions')
      this.$router.push('/')
    },
    goToSignin () {
      this.$router.push('/signin')
    },
    goToAddQuestion () {
      this.$router.push('/ask')
    },
    goToMyQuestion () {
      this.$router.push('/question/my')
    },
    goToMyAnswer () {
      this.$router.push('/answer/my')
    },
    signout () {
      let msg

      this.$swal.fire({
        title: 'Are you sure to Signout?',
        text: 'You will be signed out!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign out!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('signout')
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

              this.$router.push('/signin')
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
