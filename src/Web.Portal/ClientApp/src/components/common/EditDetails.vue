<template>
  <div class="edit-details">
    <SelectMenu
      :onOpenSelect="onOpenSelect"
      @onCloseSelect="closeSelect"
      :optionsPayload="optionsPayload"
      :selectType="selectType"
    ></SelectMenu>
    <VOverlay v-if="EditDetailsStatus">
      <div @click.stop="onCloseDetails"></div>
    </VOverlay>
    <VNavigationDrawer
      v-model="EditDetailsStatus"
      class="edit-my-account-items"
      width="100%"
      fixed
      right
      hide-overlay
      :permanent="EditDetailsStatus"
    >
      <VAppBar height="auto" flat fixed>
        <VBtn icon class="ml-n3" @click.stop="onCloseDetails">
          <span class="betfont icon-stick-arrow-left"></span>
        </VBtn>
        <VSpacer
          ><h2 class="text-md">{{ headerTitle }}</h2></VSpacer
        >
        <VBtn
          text
          class="color-link font-weight-bold d-block d-sm-block d-md-block d-xl-none  d-lg-none"
          @click.stop="enableTextField"
          v-if="!enableEdit"
        >
          {{ $t(`edit`) }}
        </VBtn>
      </VAppBar>
      <div class="v-app-bar"></div>
      <div v-if="detailPage == `generalAccountDetail`">
        <GeneralAccount
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        />
      </div>
      <div v-if="detailPage == `accountPasswordDetail`">
        <AccountPassword
          mode="edit"
          :enableEdit="enableEdit"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        />
      </div>
      <div v-if="detailPage == `locationDetail`">
        <Location
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        ></Location>
      </div>
      <div v-if="detailPage == `contactDetail`">
        <Contact
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        />
      </div>
      <div v-if="detailPage == `websiteDetail`">
        <Website
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        />
      </div>
      <div v-if="detailPage == `transactionDetail`">
        <Transaction
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        ></Transaction>
      </div>
      <div v-if="detailPage == `securityDetail`">
        <Security
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile()"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        ></Security>
      </div>
      <div v-if="detailPage == `extrasDetail`">
        <Extras
          mode="edit"
          :enableEdit="enableEdit"
          :profileModel="profileModel"
          @onUpdateProfile="onUpdateProfile()"
          @onCloseDetails="onCloseDetails"
          @openSelect="openSelect"
        ></Extras>
      </div>
    </VNavigationDrawer>
  </div>
</template>
<script>
import SelectMenu from '@/components/common/SelectMenu';
import AccountPassword from '@/components/myaccount/AccountPassword';
import GeneralAccount from '@/components/myaccount/GeneralAccount';
import Location from '@/components/myaccount/Location';
import Contact from '@/components/myaccount/Contact';
import Website from '@/components/myaccount/Website';
import Transaction from '@/components/myaccount/Transaction';
import Security from '@/components/myaccount/Security';
import Extras from '@/components/myaccount/Extras';
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      enableEdit: false,
      selectType: '',
      onOpenSelect: false,
      optionsPayload: [],
      EditDetailsStatus: this.onEditDetails,
    };
  },
  components: {
    AccountPassword,
    GeneralAccount,
    Location,
    Contact,
    SelectMenu,
    Website,
    Transaction,
    Security,
    Extras,
  },
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    onEditDetails: { default: false },
    detailPage: { default: undefined },
    headerTitle: { default: '' },
  },
  computed: {
    ...mapGetters({
      Languages: 'Languages',
    }),
  },
  methods: {
    editCard() {
      this.onEditCard = true;
    },
    onCloseDetails() {
      this.enableEdit = false;
      this.$emit('onCloseDetails');
      this.loadAffiliateProfile();
    },
    enableTextField() {
      this.enableEdit = true;
    },
    openSelect(optionsPayload, selectType) {
      this.onOpenSelect = true;
      this.EditDetailsStatus = false;
      this.optionsPayload = optionsPayload;
      this.selectType = selectType;
    },
    closeSelect(selectedKey, selectType) {
      if (selectType === 'lang') {
        this.profileModel.Language = selectedKey;
      }
      if (selectType === 'Country') {
        this.profileModel.Country = selectedKey;
      }
      if (selectType === 'ChatTool') {
        this.profileModel.ChatTool = selectedKey;
      }
      if (selectType === 'DialCode') {
        this.profileModel.DialCode = selectedKey;
      }
      if (selectType === 'SecurityQuestion') {
        this.profileModel.SecurityQuestion = selectedKey;
      }
      this.onOpenSelect = false;
      this.EditDetailsStatus = true;
    },
    onUpdateProfile() {
      this.$emit('onUpdateProfile');
    },
    loadAffiliateProfile() {
      this.$emit('loadAffiliateProfile');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_edit-details';
</style>
