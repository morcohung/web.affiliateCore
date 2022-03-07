<template>
  <ValidationObserver v-slot="v" ref="form">
    <VNavigationDrawer
      class="login-drawer"
      hide-overlay
      right
      fixed
      width="100%"
      v-model="showLoginDrawer"
    >
      <VCardText>
        <VBtn icon @click="closeLogin()"
          ><span class="betfont icon-close"></span
        ></VBtn>
        <VContainer fluid class="px-8">
          <VRow>
            <VCol cols="12" class="d-flex justify-center">
              <div class="brand-logo no-resize" :class="`${setlangCode}`"></div>
            </VCol>
            <VCol cols="12">
              <h2>{{ $t(`login`) }}</h2>
            </VCol>
            <VCol v-if="LoginResponseModel.Status === 1">
              <VCard class="rounded-lg" flat color="#fdeaed">
                <VCardText>
                  <span class="text-xs black--text">
                    {{ $t(LoginResponseModel.Message) }}
                  </span>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12">
              <ValidationProvider
                name="username"
                rules="required"
                v-slot="{ invalid }"
              >
                <VTextField
                  filled
                  :label="$t(`username`)"
                  v-model="LoginModel.Username"
                >
                </VTextField>
                <span v-if="invalid" style="color:red;">{{
                  $t(`jquery.validator.required`)
                }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ invalid }"
              >
                <VTextField
                  filled
                  :label="$t(`password`)"
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="
                    showPass ? 'icon-show-password' : 'icon-hide-password'
                  "
                  v-model="LoginModel.Password"
                  hide-details="auto"
                  @click:append="showPass = !showPass"
                ></VTextField>
                <span v-if="invalid" style="color:red;">{{
                  $t(`jquery.validator.required`)
                }}</span>
              </ValidationProvider>
            </VCol>
              <VCol cols="6">
              {{$t(`not.yet.a.membe`)}}?
              <a
                class="text-link text-decoration-none"
                href="#"
                @click="onRegistration()"
                >{{$t(`sign.up`)}}</a
              >
            </VCol>
            <VCol cols="6" class="text-right">
              <VBtn
                color="primary"
                @click="postLogin()"
                large
                :disabled="v.invalid"
                >{{ $t(`login`) }}
                <span class="betfont stick-arrow-right ml-4"></span></VBtn
            ></VCol>          
          </VRow>
        </VContainer>
      </VCardText>
    </VNavigationDrawer>
  </ValidationObserver>
</template>
<script>
import { VBtn, VRow, VCol, VCard, VCardText, VCardSubtitle } from 'vuetify/lib';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import { required } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
export default {
  data: () => ({
    LoginModel: {
      Username: '',
      Password: '',
      Blackbox: '',
    },
    showPass: false,
    LoginResponseModel:{
    Status: 0,
    Message:''       
    }
  }),
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardSubtitle,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    showLoginDrawer: { default: false },
    setlangCode: { default: '' }
  },
  created: function() {
    this.LoginResponseModel.Status = 0;
    this.LoginResponseModel.Message = '';   
  },
  computed: {
    ...mapState('Auth', ['AuthModel']),
  },
  mounted() {
    extend('required', { ...required });
  },
  methods: {
    ...mapActions('Auth', ['login', 'checkSession']),
    closeLogin: function(event) {
      this.$emit('onCloselogin');
    },
    async postLogin() {
      var username = this.LoginModel.Username;
      var password = this.LoginModel.Password;
      var blackbox = window.GetIovationBlackBox(1);
      await this.login({ username, password, blackbox })
      Object.keys(this.AuthModel).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this.LoginResponseModel, key)) {
          this.LoginResponseModel[key] = this.AuthModel[key];
        }
      }); 
      await this.checkSession()
      this.$emit('onPostLogin');
    },
    onRegistration() {
      this.$emit('onRegistration');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_login-drawer';
</style>
``