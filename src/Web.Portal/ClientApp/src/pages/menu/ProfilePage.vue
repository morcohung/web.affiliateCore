<template>
  <div class="general-account-lobby">
    <EditDetails
      v-if="onEditDetails"
      :onEditDetails="onEditDetails"
      :detailPage="detailPage"
      :profileModel="profileModel"
      :headerTitle="headerTitle"
      @loadAffiliateProfile="loadAffiliateProfile()"
      @onUpdateProfile="onUpdateProfile()"
      @onCloseDetails="onCloseDetails()"
    ></EditDetails>
    <VContainer>
      <VRow>
        <VCol>
          <AccountPassword
            @openEditDetails="
              editDetails('accountPasswordDetail', $t(`password`))
            "
            v-ripple="$vuetify.breakpoint.mdAndDown"
            mode="view"
            :profileModel="profileModel"
            @UpdateProfile="onUpdateProfile"
          ></AccountPassword>
        </VCol>
      </VRow>
      <VCard
        class="mt-3 rounded-lg py-2 py-sm-0"
        :color="$vuetify.breakpoint.smAndDown ? undefined : 'transparent'"
        :elevation="$vuetify.breakpoint.smAndDown ? '4' : '0'"
        outlined
      >
        <VRow dense>
          <VCol cols="12" sm="6">
            <VRow dense class="mt-sm-n2 mt-md-n1">
              <VCol cols="12" class="py-0 py-sm-1  pt-md-0">
                <GeneralAccount
                  @openEditDetails="
                    editDetails('generalAccountDetail', $t(`generalaccount`))
                  "
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                  @onUpdateProfile="onUpdateProfile()"
                ></GeneralAccount>
              </VCol>
              <VDivider class="col mx-1 py-0 d-block d-sm-none" />
              <VCol cols="12" class="py-0 py-sm-1">
                <Location
                  @openEditDetails="
                    editDetails('locationDetail', $t(`location`))
                  "
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                  @onUpdateProfile="onUpdateProfile()"
                ></Location>
              </VCol>
              <VDivider class="col mx-1 py-0 d-block d-sm-none" />
              <VCol cols="12" class="py-0 py-sm-1">
                <Contact
                  @openEditDetails="editDetails('contactDetail', $t(`contact`))"
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                  @onUpdateProfile="onUpdateProfile()"
                ></Contact>
              </VCol>
              <VDivider class="col mx-1 pt-0 pb-1 d-block d-sm-none" />
            </VRow>
          </VCol>
          <VCol cols="12" sm="6">
            <VRow dense class="mt-sm-n2">
              <VCol cols="12" class="py-0 py-sm-1">
                <Website
                  @openEditDetails="editDetails('websiteDetail', $t(`website`))"
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                  @onUpdateProfile="onUpdateProfile()"
                ></Website>
              </VCol>
              <VDivider class="col mx-1 py-0 d-block d-sm-none" />
              <VCol cols="12" class="py-0 py-sm-1">
                <Transaction
                  @openEditDetails="
                    editDetails('transactionDetail', $t(`transaction`))
                  "
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                  @onUpdateProfile="onUpdateProfile()"
                ></Transaction>
              </VCol>
              <VDivider class="col mx-1 py-0 d-block d-sm-none" />
              <VCol cols="12" class="py-0 py-sm-1">
                <Security
                  @openEditDetails="editDetails('securityDetail', $t(`extras`))"
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  mode="view"
                  :profileModel="profileModel"
                ></Security>
              </VCol>
              <VDivider class="col mx-1 py-0 d-block d-sm-none" />
              <VCol cols="12" class="py-0 py-sm-1">
                <Extras
                  @openEditDetails="editDetails('extrasDetail', $t(`extras`))"
                  v-ripple="$vuetify.breakpoint.mdAndDown"
                  :profileModel="profileModel"
                ></Extras>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCard>
    </VContainer>
  </div>
</template>
<script>
import AccountPassword from '@/components/myaccount/AccountPassword';
import GeneralAccount from '@/components/myaccount/GeneralAccount';
import Location from '@/components/myaccount/Location';
import Contact from '@/components/myaccount/Contact';
import Website from '@/components/myaccount/Website';
import Transaction from '@/components/myaccount/Transaction';
import Security from '@/components/myaccount/Security';
import Extras from '@/components/myaccount/Extras';
import EditDetails from '@/components/common/EditDetails';
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  inject: ['reload'],
  data() {
    return {
      onEditDetails: false,
      detailPage: '',
      headerTitle: '',
      profileModel: {
        Id: '',
        Code: '',
        FirstName: '',
        LastName: '',
        Language: '',
        Currency: '',
        Email: '',
        DialCode: '',
        ContactNo: '',
        ChatTool: '',
        ChatAddress: '',
        Address: '',
        City: '',
        Country: '',
        Postal: '', //PostalCodeZip
        OwnWebsite: 0,
        Describe: '',
        WebsiteList: [
          {
            Id: '',
            Url: '',
            Descr: '',
          },
        ],
        CommRcvOpt: '',
        CommRcvList: [
          {
            FieldName: '',
            Description: '',
            Support: false,
            Data: [
              {
                FieldName: '',
                FieldValue: '',
                Description: '',
              },
            ],
          },
        ],
        SecurityQuestion: '',
        SecurityAnswer: '',
        ProfileList: [
          {
            FieldName: '',
            FieldValue: '',
            Description: '',
          },
        ],
      },
    };
  },
  components: {
    AccountPassword,
    GeneralAccount,
    Location,
    Contact,
    Website,
    Transaction,
    Security,
    Extras,
    EditDetails,
  },
  created: function() {
    this.loadAffiliateProfile();
    this.getLanguage(1);
    this.getCountry(this.langCode);
    this.getChatTools(this.langCode);
    this.getDialCode(), this.fetchSecurityQuestions();

    Promise.all([this.checkSession()]).then(() => {
      if (this.SessionModel.Status != 1) {
        this.$router.push({ path: `/${this.langCode}/` });
        this.reload();
      }
    });
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),
    ...mapState('Account', ['AccountProfile']),
    ...mapState('Common', ['Languages', 'Countrys', 'ChatTools', 'DialCodes']),
    ...mapState('Web', ['SecurityQuestions']),
    ...mapState('Auth', ['SessionModel']),
  },
  methods: {
    ...mapActions('Account', ['fetchAffiliateProfile', 'updateProfile']),
    ...mapActions('Common', [
      'getLanguage',
      'getCountry',
      'getChatTools',
      'getDialCode',
    ]),
    ...mapActions('Web', ['fetchSecurityQuestions']),
    ...mapActions('Auth', ['checkSession']),
    editDetails(payLoad, headerTitle) {
      this.onEditDetails = true;
      this.detailPage = payLoad;
      this.headerTitle = headerTitle;
    },
    onCloseDetails() {
      this.onEditDetails = false;
    },
    async loadAffiliateProfile() {
      Promise.all([this.fetchAffiliateProfile()]).then(() => {
        Object.keys(this.AccountProfile).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(this.profileModel, key)) {
            this.profileModel[key] = this.AccountProfile[key];
          }
        });
      });
    },
    async onUpdateProfile() {
      const data = {
        Id: this.profileModel.Id ? this.profileModel.Id : '',
        FirstName: this.profileModel.FirstName,
        LastName: this.profileModel.LastName,
        Language: this.profileModel.Language,
        Currency: this.profileModel.Currency,
        Email: this.profileModel.Email,
        DialCode: this.profileModel.DialCode,
        ContactNo: this.profileModel.ContactNo,
        ChatTool: this.profileModel.ChatTool,
        ChatAddress: this.profileModel.ChatAddress,
        Address: this.profileModel.Address,
        City: this.profileModel.City,
        Country: this.profileModel.Country,
        Postal: this.profileModel.Postal,
        OwnWebsite: this.profileModel.OwnWebsite,
        Describe: this.profileModel.Describe,
        WebsiteList: this.profileModel.WebsiteList,
        CommRcvOpt: this.profileModel.CommRcvOpt,
        CommRcvList: this.profileModel.CommRcvList,
        SecurityQuestion: this.profileModel.SecurityQuestion,
        SecurityAnswer: this.profileModel.SecurityAnswer,
        ProfileList: this.profileModel.ProfileList,
      };
      const response = await this.updateProfile(data);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_general-account-page';
</style>
