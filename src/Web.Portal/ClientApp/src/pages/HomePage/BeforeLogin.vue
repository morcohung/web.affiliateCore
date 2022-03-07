<template>
  <!-- <StaticContentTestPage /> -->
  <div>
    <VRow dense>
      <VCol cols="12" lg="6">
        <!-- template start -->
        <section>
          <VCard elevation="4" outlined min-height="25rem">
            <v-img
              src="https://doc.188contents.com/contents/aff/Images/Affiliates/TVScreen/888x400-sample-image.jpg"
              height="25.25rem"
              gradient="to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"
              class="d-flex align-end"
            >
              <div class="pa-4 text-center">
                <h1 class="black--text text-xxxl  font-weight-bold">
                  Official Asian Sponsor of Formula 1
                </h1>
                <h2 class="gray--text text-md mb-2">
                  Sign up, promote us and start earning.
                </h2>
                <VBtn depressed color="primary mb-2" :to="{ path: `/en-gb/Register` }">Sign Up</VBtn>
                <div class="text--disabled">
                  Already have an account? <a href="/en-gb/Login">Log in</a>
                </div>
              </div>
            </v-img>
          </VCard>
        </section>
        <!-- -->
      </VCol>
      <VCol cols="12" lg="6">
        <VRow dense>
          <VCol cols="12" sm="4" lg="12">
            <!--template start -->
            <section style="height:100%">
              <VCard elevation="4" outlined height="100%" min-height="8rem">
                <v-img
                  src="https://doc.188contents.com/contents/aff/Images/Affiliates/TVScreen/575x128-sample-image.jpg"
                  min-height="8rem"
                  class="d-flex align-center"
                >
                  <div class="d-flex align-center pa-4">
                    <v-avatar color="black">
                      <span class="white--text">icon</span>
                    </v-avatar>
                    <div class="px-4">
                      <h1 class="black--text text-md  font-weight-bold">
                        Promote and earn
                      </h1>
                      <h2
                        class="text--secondary text-sm mb-2"
                        style="line-height:1.2em"
                      >
                        Learn how to be an affiliate in 3 fast and easy steps!
                      </h2>
                    </div>
                  </div>
                </v-img>
              </VCard>
            </section>
            <!-- -->
          </VCol>
          <VCol cols="12" sm="4" lg="12">
            <!--template start -->
            <section style="height:100%">
              <VCard elevation="4" outlined height="100%" min-height="8rem">
                <v-img min-height="8rem" class="d-flex align-center">
                  <div class="d-flex align-center pa-4">
                    <v-avatar color="black">
                      <span class="white--text">icon</span>
                    </v-avatar>
                    <div class="px-4">
                      <h1 class="black--text text-md  font-weight-bold">
                        Easy Commission Plan
                      </h1>
                      <h2
                        class="text--secondary text-sm mb-2"
                        style="line-height:1.2em"
                      >
                        Get to know how our commission plan works
                      </h2>
                    </div>
                  </div>
                </v-img>
              </VCard>
            </section>
            <!-- -->
          </VCol>
          <VCol cols="12" sm="4" lg="12">
            <!--template start -->
            <section style="height:100%">
              <VCard elevation="4" outlined height="100%" min-height="8rem">
                <v-img min-height="8rem" class="d-flex align-center">
                  <div class="d-flex align-center pa-4">
                    <v-avatar color="black">
                      <span class="white--text">icon</span>
                    </v-avatar>
                    <div class="px-4">
                      <h1 class="black--text text-md  font-weight-bold">
                        Exclusive Promotions
                      </h1>
                      <h2
                        class="text--secondary text-sm mb-2"
                        style="line-height:1.2em"
                      >
                        Enjoy the latest affiliate-exclusive promotions
                      </h2>
                    </div>
                  </div>
                </v-img>
              </VCard>
            </section>
            <!-- -->
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';
import { mapState, mapActions } from 'vuex';
import { VBtn, VImg, VCard, VCardTitle, VAvatar } from 'vuetify/lib';

export default {
  name: 'BeforeLogin',
  data: () => ({
    showRegistrationDrawer: false,
    template: '',
  }),
  components: {
    VRuntimeTemplate,
    VBtn,
    VImg,
    VCard,
    VCardTitle,
    VAvatar,
  },
  computed: {
    ...mapState({
      language: (state) => state.gv.lan,
      response: (state) => state.Auth.AuthResponse,
    }),
  },
  async created() {
    // const path = this.path || window.location.pathname;
    // const response = await getCDNContents(path);
  },
  methods: {
    ...mapActions({
      login: 'Auth/login',
    }),
    toggleRegistration(state) {
      this.showRegistrationDrawer = state;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_before-login';
</style>
