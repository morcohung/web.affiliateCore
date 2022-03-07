<template>
  <VCard
    class="website-view rounded-lg"
    :class="{ white: $vuetify.breakpoint.smAndDown }"
    :elevation="$vuetify.breakpoint.mdOnly && mode == `view` ? '4' : '0'"
    :outlined="$vuetify.breakpoint.smAndUp && mode == `view`"
  >
    <div
      @click.stop="$vuetify.breakpoint.mdAndDown ? editDetails() : undefined"
    >
      <VCardTitle class="pb-1 pb-lg-4" v-if="mode == `view`">
        <h2 class="text-md">{{ $t(`website`) }}</h2>
        <VSpacer></VSpacer>
        <VBtn
          text
          class="color-link font-weight-bold d-none d-md-none d-lg-block"
          @click.stop="editDetails()"
        >
          {{ $t(`edit`) }}
        </VBtn>
      </VCardTitle>
      <VCardSubtitle class="pt-1 d-block d-lg-none" v-if="mode == `view`">
        {{ $t(`your.preferred.promotion.method`) }}
      </VCardSubtitle>
    </div>
    <div :class="{ 'd-none d-lg-block': mode == 'view' }">
      <VDivider></VDivider>
      <VCardText class="mb-0" v-show="mode != 'view'">
        <span class="text-md">{{
          $t(`please.choose.your.preferred.promoting`)
        }}</span>
      </VCardText>
      <VRadioGroup
        v-model="profileModel.OwnWebsite"
        :class="{ 'mt-n5 mb-n3': mode == 'view' }"
      >
        <VCardText v-show="mode != 'view'">
          <VRadio
            :value="1"
            on-icon="icon-radio-on"
            off-icon="icon-radio-off"
            :disabled="!enableEdit && $vuetify.breakpoint.mdAndDown"
            @click="checkOwnWebsiteMode(1)"
          >
            <template v-slot:label>
              <div>
                {{ $t(`i.have.website`) }}
              </div>
            </template>
          </VRadio>
        </VCardText>
        <VCardText v-show="profileModel.OwnWebsite == 1">
          <VRow dense v-if="mode == 'edit'">
            <VCol
              cols="12"
              v-for="(item, index) in WebSiteModel"
              v-bind:key="index"
            >
              <VTextField
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                  'field--active':
                    ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                    (enableEdit && mode != 'view'),
                }"
                :append-outer-icon="
                  (mode == 'edit' && $vuetify.breakpoint.lgAndUp) ||
                  (mode == 'edit' && enableEdit)
                    ? 'icon-trashbin'
                    : ''
                "
                @click:append-outer="deleteWebsite(item.Id)"
                filled
                :label="`Promotion website URL`"
                v-model="item.Url"
                hide-details="auto"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow dense v-if="mode == 'view'">
            <VCol
              cols="12"
              v-for="(item, index) in profileModel.WebsiteList"
              v-bind:key="index"
            >
              <VTextField
                v-if="item.Url != ''"
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                  'field--active':
                    ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                    (enableEdit && mode != 'view'),
                }"
                @click:append-outer="deleteWebsite(item.Id)"
                filled
                :label="$t(`promotion.website.url`)"
                v-model="item.Url"
                hide-details="auto"
                :readonly="true"
                @blur="onWebUrlBlur"
              ></VTextField>
              <span v-if="isValidateWebUrl"  style="color:red;">{{ $t(`jquery.validator.required`) }}</span>
            </VCol>
          </VRow>
          <VBtn
            text
            color="blue"
            v-if="
              ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                (enableEdit && mode != 'view')
            "
            @click="addWebsite()"
          >
            + {{ $t(`add.one.more`) }}
          </VBtn>
          <VBtn
            text
            color="blue"
            v-if="!enableEdit && mode != 'view' && !$vuetify.breakpoint.lgAndUp"
            @click.stop="enableEdit = true"
          >
          </VBtn>
        </VCardText>
        <VDivider v-if="mode != 'view'"></VDivider>
        <VCardText v-show="mode != 'view'">
          <VRadio
            :value="0"
            on-icon="icon-radio-on"
            off-icon="icon-radio-off"
            :disabled="!enableEdit && $vuetify.breakpoint.mdAndDown"
            @click="checkOwnWebsiteMode(0)"
          >
            <template v-slot:label>
              <div>
                {{ $t(`i.dont.have.website`) }}
              </div>
            </template>
          </VRadio>
        </VCardText>
        <VCardText v-show="profileModel.OwnWebsite == 0">
          <VRow dense>
            <VCol cols="12" class="mb-5">
              <VTextarea
                class="is-text"
                :class="{
                  'field--sidebar': mode == 'edit',
                  'field--active':
                    ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                    (enableEdit && mode != 'view'),
                }"
                filled
                hide-detail
                no-resize
                rows="1"
                auto-grow
                :label="$t(`Describe.how.you.will.market.our.brand`)"
                v-model="profileModel.Describe"
                hide-details
                :readonly="
                  ($vuetify.breakpoint.lgAndUp && mode != 'view') ||
                  (enableEdit && mode != 'view')
                    ? false
                    : true
                "
                @blur="onDescribeBlur"  
              >
              </VTextarea>
              <span v-if="isValidateWebUrl"  style="color:red;">{{ $t(`jquery.validator.required`) }}</span>
            </VCol>
          </VRow>
          <VBtn
            text
            color="blue"
            v-if="!enableEdit && mode != 'view' && !$vuetify.breakpoint.lgAndUp"
            @click.stop="enableEdit = true"
          >
          </VBtn>
        </VCardText>
      </VRadioGroup>
    </div>
    <div v-if="mode != `view`">
      <VCardActions
        class="justify-end mr-2"
        v-if="$vuetify.breakpoint.lgAndUp || enableEdit"
      >
        <VBtn outlined color="gray" class="mr-1" @click.stop="cancelAction">
          {{ $t(`cancel`) }}
        </VBtn>
        <VBtn depressed color="primary" @click.stop="confirmAction">{{
          $t(`submit`)
        }}</VBtn>
      </VCardActions>
    </div>
  </VCard>
</template>
<script>
import { mapActions } from 'vuex';
import { VBtn, VRow, VCol, VCard, VCardText } from 'vuetify/lib';
import { getGuid } from '@/utils/contentUtils';
export default {
  name: 'Website',
  data: () => ({
    EditWebsiteList: [],
    WebSiteModel: [
      {
        Id: '',
        Url: '',
        Descr: '',
      },
    ],
    isValidateWebUrl: false
  }),
  props: {
    profileModel: {
      type: Object,
      default: () => ({}),
    },
    mode: { default: 'view' },
    enableEdit: { default: false },
  },
  components: {
    VBtn,
    VRow,
    VCol,
    VCard,
    VCardText,
  },
  created: function() {
    this.profileModel.WebsiteList.forEach((x) => this.WebSiteModel.push(x));
    this.WebSiteModel.splice(
      this.WebSiteModel.findIndex((item) => item.Url === ''),
      1
    );
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    ...mapActions('Account', ['updateAccountWebSite']),
    confirmAction: function(event) {
      let payload = {
        title: this.$t(`you.want.to.submit`),
        msg: this.$t(`clicking.submit.will.confirm.that`),
        buttons: [
          {
            text: this.$t(`not.yet`),
            color: 'blue--text',
            action: () => {
              this.closeDialog();
            },
          },
          {
            text: this.$t(`submit`),
            color: 'blue--text',
            action: () => {
              this.onUpdateWebSiteProfile();
              this.onCloseDetails();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    cancelAction: function(event) {
      let payload = {
        title: this.$t(`leave.this.page`),
        msg: this.$t(`If.you.leave.now`),
        buttons: [
          {
            text: this.$t(`stay.on.page`),
            color: 'blue--text',
            action: () => {
              this.closeDialog();
            },
          },
          {
            text: this.$t(`leave`),
            color: 'blue--text',
            action: () => {
              this.onCloseDetails();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
      });
    },
    onCloseDetails() {
      this.$emit('onCloseDetails');
      this.enableEdit = false;
    },
    editDetails() {
      this.$emit('openEditDetails');
    },
    deleteWebsite(removeItem) {
      this.WebSiteModel.splice(
        this.WebSiteModel.findIndex((item) => item.Id === removeItem),
        1
      );
    },
    addWebsite() {
      const addobj = {
        Id: getGuid(),
        Url: '',
        Descr: '',
      };
      this.WebSiteModel.push(addobj);
    },
    onUpdateWebSiteProfile() {
      this.profileModel.WebsiteList = this.WebSiteModel;
      this.updateAccountWebSite(this.WebSiteModel);
      this.$emit('onUpdateProfile');
    },
    checkOwnWebsiteMode(mode) {
      this.OwnWebsiteMode = mode;
      return this.OwnWebsiteMode;
    },
    onWebUrlBlur(webUrl) {      
       if( this.profileModel.OwnWebsite === 0 && webUrl === '')
       {
          this.isValidateWebUrl = true;
       }
       else
       {
          this.isValidateWebUrl = false;
       }
    },
    onDescribeBlur() {      
       if( this.profileModel.OwnWebsite === 1 && this.profileModel.Describe === '')
       {
          this.isValidateWebUrl = true;
       }
       else
       {
          this.isValidateWebUrl = false;
       }
    }    
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_website';
</style>
