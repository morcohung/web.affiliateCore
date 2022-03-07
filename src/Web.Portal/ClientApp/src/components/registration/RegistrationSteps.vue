<template>
  <div>
    <SelectMenu
      :onOpenSelect="onOpenSelect"
      :optionsPayload="optionsPayload"
      :selectType="selectType"
      @onCloseSelect="closeSelect"
    ></SelectMenu>
    <ValidationObserver v-slot="v" ref="form">
      <VDialog
        class="registration-drawer"
        right
        fixed
        persistent
        width="24.75rem"
        :value="showSignUpDialog"
        content-class="registration-dialog ma-0"
        transition="slide-x-reverse-transition"
        :fullscreen="$vuetify.breakpoint.smAndDown"
      >
        <VCard tile height="100%">
          <VBtn icon @click="cancelAction">
            <span class="betfont icon-close"></span>
          </VBtn>
          <VContainer class="pa-0" fluid>
            <VRow>
              <VCol cols="12" class="d-flex justify-center">
                <div
                  class="brand-logo no-resize"
                  :class="`${$route.params.lang}`"
                ></div>
              </VCol>

              <VCol cols="12" class="py-0">
                <VStepper v-model="e1" class="elevation-0">
                  <VStepperItems>
                    <VStepperContent step="1">
                      <h2 class="mb-3">
                        {{ $t(`sign.up`) }}
                      </h2>
                      <ValidationProvider
                        name="username"
                        :rules="{
                          usernameAlphaNum: true,
                          usernameMinMax: { min: 5, max: 15 },
                          validUserName: true,
                        }"
                        v-slot="{ invalid, errors }"
                      >
                        <VTextField
                          :label="$t(`username`)"
                          hide-details="auto"
                          filled
                          maxlength="15"
                          minlength="5"
                          v-model="profileModel.Username"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="usernamereq"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          v-model="profileModel.Username"
                          class="d-none"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="newPassword"
                        :rules="{
                          passwordAlphaNum: true,
                          passwordMinMax: { min: 6, max: 15 },
                        }"
                        v-slot="{ invalid, errors }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`password`)"
                          hide-details="auto"
                          filled
                          :type="showPass ? 'text' : 'password'"
                          :append-icon="
                            showPass
                              ? 'icon-show-password'
                              : 'icon-hide-password'
                          "
                          maxlength="15"
                          minlength="6"
                          v-model="profileModel.Password"
                          @click:append="showPass = !showPass"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="newPasswordreq"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          v-model="profileModel.Password"
                          class="d-none"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="ConfirmPassword"
                        rules="validatePassword"
                        v-slot="{ invalid, errors }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`confirm.new.password`)"
                          hide-details="auto"
                          filled
                          :type="showPass2 ? 'text' : 'password'"
                          :append-icon="
                            showPass2
                              ? 'icon-show-password'
                              : 'icon-hide-password'
                          "
                          v-model="profileModel.ConfirmPassword"
                          @click:append="showPass2 = !showPass2"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="ConfirmPasswordreq"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          v-model="profileModel.ConfirmPassword"
                          class="d-none"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                    </VStepperContent>
                    <VStepperContent class="pb-1" step="2">
                      <h2 class="mb-3">{{ $t(`general.account.info`) }}</h2>
                      <ValidationProvider
                        name="firstname"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          :label="$t(`first.name`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.FirstName"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="lastname"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`last.name`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.LastName"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <div @click.stop="selectPayload('lang')">
                        <VTextField
                          :label="$t(`preferred.language`)"
                          hide-details="auto"
                          readonly
                          append-icon="icon-arrowhead-down"
                          filled
                          :value="getLanguageText(profileModel.Language)"
                        />
                        <ValidationProvider
                          name="language"
                          rules="required"
                          v-slot="{ invalid }"
                        >
                          <VTextField
                            v-model="profileModel.Language"
                            class="d-none"
                          />
                          <span v-if="invalid" class="red--text text-sm">{{
                            $t(`jquery.validator.required`)
                          }}</span>
                        </ValidationProvider>
                      </div>
                      <ValidationProvider
                        name="AffiliateCode"
                        :rules="{
                          validAffiliateCode: true,
                        }"
                        v-slot="{ invalid, errors }"
                      >
                        <VTextField
                          v-if="ownAffiliateId === ''"
                          class="mt-4 mb-4"
                          :label="$t(`affiliate.id.optional`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.AffiliateCode"
                        />
                        <VTextField
                          v-if="ownAffiliateId != ''"
                          class="mt-4 mb-4"
                          :label="$t(`affiliate.id.optional`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.AffiliateCode"
                          readonly
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </VStepperContent>
                    <VStepperContent step="3">
                      <h2 class="mb-3">{{ $t(`location.info`) }}</h2>
                      <ValidationProvider
                        name="Address"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextarea
                          :label="$t(`address`)"
                          hide-details="auto"
                          rows="2"
                          filled
                          no-resize
                          auto-grow
                          v-model="profileModel.Address"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="city"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`city.province`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.City"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="city"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`postal.code.zip`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.Postal"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <div class="d-flex">
                        <div
                          class="mr-1"
                          style="width:50%"
                          @click="selectPayload('Country')"
                        >
                          <VTextField
                            class="mt-4"
                            :label="$t(`country`)"
                            hide-details="auto"
                            append-icon="icon-arrowhead-down"
                            filled
                            :value="getCountryTextByCode(profileModel.Country)"
                          />
                          <ValidationProvider
                            name="Country"
                            rules="required"
                            v-slot="{ invalid }"
                          >
                            <VTextField
                              v-model="profileModel.Country"
                              class="d-none"
                            />
                            <span v-if="invalid" class="red--text text-sm">{{
                              $t(`jquery.validator.required`)
                            }}</span>
                          </ValidationProvider>
                        </div>
                        <div
                          class="ml-1"
                          style="width:50%"
                          @click.stop="selectPayload('Currency')"
                        >
                          <VTextField
                            class="mt-4"
                            :label="$t(`currency`)"
                            hide-details="auto"
                            readonly
                            append-icon="icon-arrowhead-down"
                            filled
                            :value="getCurrencyText(profileModel.Currency)"
                          />
                          <ValidationProvider
                            name="currency"
                            rules="required"
                            v-slot="{ invalid }"
                          >
                            <VTextField
                              v-model="profileModel.Currency"
                              class="d-none"
                            />
                            <span v-if="invalid" class="red--text text-sm">{{
                              $t(`jquery.validator.required`)
                            }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </VStepperContent>
                    <VStepperContent step="4">
                      <h2 class="mb-3">{{ $t(`contact.info`) }}</h2>
                      <div class="d-flex">
                        <div
                          class="mr-1"
                          style="width:46%"
                          @click="selectPayload('DialCode')"
                        >
                          <VTextField
                            :label="$t(`area.code`)"
                            hide-details="auto"
                            append-icon="icon-arrowhead-down"
                            readonly
                            filled
                            :value="
                              getDialCodeTextByCode(profileModel.DialCode)
                            "
                          />
                          <ValidationProvider
                            name="DialCode"
                            rules="required"
                            v-slot="{ invalid }"
                          >
                            <VTextField
                              v-model="profileModel.DialCode"
                              class="d-none"
                            />
                            <span v-if="invalid" style="color:red;">{{
                              $t(`jquery.validator.required`)
                            }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="ml-1" style="width:54%">
                          <ValidationProvider
                            name="ContactNo"
                            rules="numericOnly"
                            v-slot="{ invalid, errors }"
                          >
                            <VTextField
                              type="numeric"
                              inputmode="numeric"
                              :label="$t(`contact.number`)"
                              hide-details="auto"
                              filled
                              v-model="profileModel.ContactNo"
                            />
                            <span v-if="invalid" class="red--text text-sm">{{
                              errors[0]
                            }}</span>
                          </ValidationProvider>
                          <ValidationProvider
                            name="ContactNoreq"
                            rules="required"
                            v-slot="{ invalid }"
                          >
                            <VTextField
                              v-model="profileModel.ContactNo"
                              class="d-none"
                            />
                            <span v-if="invalid" class="red--text text-sm">{{
                              $t(`jquery.validator.required`)
                            }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                      <ValidationProvider
                        name="email"
                        rules="validEmail|email"
                        v-slot="{ invalid, errors }"
                      >
                        <VTextField
                          class="mt-4"
                          :label="$t(`email`)"
                          hide-details="auto"
                          filled
                          v-model="profileModel.Email"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        name="emailreq"
                        rules="required"
                        v-slot="{ invalid }"
                      >
                        <VTextField
                          v-model="profileModel.Email"
                          class="d-none"
                        />
                        <span v-if="invalid" class="red--text text-sm">{{
                          $t(`jquery.validator.required`)
                        }}</span>
                      </ValidationProvider>
                      <h3 class="text-xs text--secondary mt-4 mb-2">
                        {{ $t(`other.communication.channel`) }}
                      </h3>
                      <div class="d-flex">
                        <div
                          class="mr-1"
                          style="width:40%"
                          @click="selectPayload('ChatTool')"
                        >
                          <VTextField
                            class="mb-4"
                            :label="$t(`channel`)"
                            hide-details="auto"
                            append-icon="icon-arrowhead-down"
                            filled
                            :value="
                              getChatToolTextByCode(profileModel.ChatTool)
                            "
                          />
                        </div>
                        <div class="ml-1" style="width:60%">
                          <VTextField
                            class="mb-4"
                            :label="$t(`chat.tool.address`)"
                            hide-details="auto"
                            filled
                            v-model="profileModel.ChatAddress"
                          />
                        </div>
                      </div>
                    </VStepperContent>
                    <VStepperContent step="5">
                      <h2 class="mb-3">{{ $t(`website.info`) }}</h2>
                      <VCard color="#fbfbfb" flat>
                        <VExpansionPanels
                          color="transparent"
                          flat
                          v-model="profileModel.OwnWebsite"
                        >
                          <VExpansionPanel class="ma-0 pa-0 elevation-0">
                            <VExpansionPanelHeader color="transparent">
                              <VSpacer>{{ $t(`i.have.website`) }}</VSpacer>
                              <span
                                class="betfont text-right text-md"
                                :class="
                                  profileModel.OwnWebsite === 0
                                    ? 'icon-radio-on color-orange'
                                    : 'icon-radio-off'
                                "
                              ></span>
                            </VExpansionPanelHeader>
                            <VExpansionPanelContent>
                              <VTextField
                                :label="$t(`website.url`)"
                                hide-details="auto"
                                filled
                                v-model="profileModel.WebUrl"
                                @blur="onWebUrlBlur"
                              />
                              <span
                                v-if="isValidateWebUrl"
                                style="color:red;"
                                >{{ $t(`jquery.validator.required`) }}</span
                              >
                            </VExpansionPanelContent>
                          </VExpansionPanel>
                          <VDivider />
                          <VExpansionPanel class="ma-0 pa-0 elevation-0">
                            <VExpansionPanelHeader color="transparent">
                              <VSpacer>{{ $t(`i.dont.have.website`) }}</VSpacer>
                              <span
                                class="betfont text-right text-md"
                                :class="
                                  profileModel.OwnWebsite === 1
                                    ? 'icon-radio-on color-orange'
                                    : 'icon-radio-off'
                                "
                              ></span>
                            </VExpansionPanelHeader>
                            <VExpansionPanelContent
                              class="elevation-0"
                              color="transparent"
                            >
                              <VTextarea
                                class="wrapped-label"
                                :label="
                                  $t(`Describe.how.you.will.market.our.brand`)
                                "
                                hide-details="auto"
                                rows="2"
                                filled
                                no-resize
                                auto-grow
                                @blur="onDescribeBlur"
                                v-model="profileModel.Describe"
                              />
                              <span
                                v-if="isValidateWebUrl"
                                class="red--text text-sm"
                                >{{ $t(`jquery.validator.required`) }}</span
                              >
                            </VExpansionPanelContent>
                          </VExpansionPanel>
                        </VExpansionPanels>
                      </VCard>
                    </VStepperContent>
                    <VStepperContent step="6">
                      <h2 class="mb-3">{{ $t(`terms`) }}</h2>
                      <VCard
                        color="#f1f1f1"
                        class="rounded-lg px-3 py-1 align-start"
                        flat
                      >
                        <VCheckbox
                          v-model="checkbox"
                          class="mt-3 align-start"
                          on-icon="icon-checked color-orange"
                          off-icon="icon-unchecked "
                        >
                          <template v-slot:label>
                            <div>
                              {{ $t(`i.have.read.and.accepted.the`) }}
                              <router-link
                                :to="
                                  `/${$route.params.lang}/termsandconditions`
                                "
                                class="text-decoration-none blue--text"
                                @click.native="setShowSignUpDialog(false)"
                                >{{ $t(`term.and.condition`) }}</router-link
                              >
                            </div>
                          </template>
                        </VCheckbox>
                      </VCard>
                      <VCard color="#fbfbfb" class="mt-3 pa-3" flat>
                        <div class="text-center text-sm mb-3">
                          {{ $t(`pls.type.captcha`) }}
                        </div>
                        <div class="d-flex justify-center mb-4">
                          <VCard flat outlined>
                            <VImg width="154" height="40" :src="imgSrc"></VImg>
                          </VCard>
                          <VBtn
                            depressed
                            outlined
                            class="faint-outline px-0 ml-3"
                            min-width="2.5rem"
                            height="2.5rem"
                            @click="refresh"
                            ><span class="betfont icon-refresh-2"></span
                          ></VBtn>
                        </div>
                        <ValidationProvider
                          name="Captcha"
                          rules="validCaptcha|required"
                          v-slot="{ invalid, errors }"
                        >
                          <VTextField
                            :label="$t(`captcha.code`)"
                            hide-details="auto"
                            filled
                            maxlength="4"
                            v-model="profileModel.Captcha"
                          />
                          <span
                            v-if="
                              invalid && errors[0] != 'Captcha is not valid.'
                            "
                            class="red--text text-sm"
                            >{{ errors[0] }}</span
                          >
                          <span
                            v-if="
                              invalid && errors[0] === 'Captcha is not valid.'
                            "
                            class="red--text text-sm"
                            >{{ $t(`jquery.validator.required`) }}</span
                          >
                        </ValidationProvider>
                      </VCard>
                    </VStepperContent>
                  </VStepperItems>
                  <div class="d-flex align-center px-6">
                    <VBtn
                      rounded
                      depressed
                      color="primary"
                      min-width="2.32rem"
                      width="1rem"
                      class="px-0"
                      @click="e1 > 1 ? (e1 = e1 - 1) : null"
                      :disabled="e1 == 1"
                    >
                      <span class="betfont icon-stick-arrow-left"></span>
                    </VBtn>
                    <VSpacer>
                      <VStepperHeader v-if="e1 != 6" class="mx-9 elevation-0">
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 0"
                          step=""
                        >
                        </VStepperStep>
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 1"
                          step=""
                        >
                        </VStepperStep>
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 2"
                          step=""
                        >
                        </VStepperStep>
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 3"
                          step=""
                        >
                        </VStepperStep>
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 4"
                          step=""
                        >
                        </VStepperStep>
                        <VStepperStep
                          class="justify-center"
                          :complete="e1 > 5"
                          step=""
                        >
                        </VStepperStep>
                      </VStepperHeader>
                    </VSpacer>

                    <VBtn
                      rounded
                      depressed
                      color="primary"
                      min-width="2.32rem"
                      width="1rem"
                      class="px-0"
                      @click="
                        e1 < 6
                          ? (e1 = e1 + 1) && e1 == 2
                            ? getCountryCode()
                            : null
                          : null
                      "
                      v-if="e1 != 6"
                    >
                      <span class="betfont icon-stick-arrow-right"></span>
                    </VBtn>
                    <VBtn
                      v-if="e1 === 6"
                      depressed
                      color="primary"
                      v-show="checkbox === true && isValidateWebUrl === false"
                      :disabled="v.invalid"
                      @click.stop="confirmAction"
                      >{{ $t(`submit`) }}</VBtn
                    >
                  </div>
                </VStepper>
              </VCol>
            </VRow>
          </VContainer>
        </VCard>
      </VDialog>
    </ValidationObserver>
  </div>
</template>
<script>
import SelectMenu from '@/components/common/SelectMenu';
import { VBtn, VRow, VCol, VCard, VCardText, VCardSubtitle } from 'vuetify/lib';
import { mapGetters, mapState, mapActions } from 'vuex';
import { required, email, alpha_num, numeric } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import minMax from '@/rules/minMax';
export default {
  data: () => ({
    e1: 1,
    showPass: false,
    showPass2: false,
    panel: [],
    checkbox: false,
    selectType: '',
    optionsPayload: [],
    panel: [],
    isValidateWebUrl: false,
    imgPath: '/Captcha.ashx',
    versionNumber: new Date().getTime(),
    PlatformId: 1,
    onOpenSelect: false,
    profileModel: {
      Username: '',
      Password: '',
      ConfirmPassword: '',
      FirstName: '',
      LastName: '',
      Country: '',
      Language: '',
      Currency: '',
      City: '',
      Address: '',
      Postal: '',
      DialCode: '',
      ContactNo: '',
      Email: '',
      ChatTool: '',
      ChatAddress: '',
      OwnWebsite: 0,
      WebUrl: '',
      Describe: '',
      Captcha: '',
      AffiliateCode: '',
      ProfileList: [
        {
          FieldName: '',
          FieldValue: '',
          Description: '',
        },
      ],
    },
    ownAffiliateId: '',
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
    SelectMenu,
  },
  mounted() {
    extend('required', { ...required });
    extend('validatePassword', (value) => {
      if (value === this.profileModel.Password) {
        return true;
      }
      return this.$t(`confirm.password.not.validate`);
    });
    extend('validUserName', (value) => {
      if (value.length >= 5 && value.length <= 15) {
        return this.CheckUserName(value).then(() => {
          if (this.AvailableUserName.data.Status === 1) {
            return true;
          } else {
            return this.$t(`register.help.invalidUserName`);
          }
        });
      }
    });
    extend('validAffiliateCode', (value) => {
      if (value.length > 0) {
        return this.CheckAffiliateExist(value).then(() => {
          if (this.AffiliateExist.data.Status === 0) {
            return true;
          } else {
            return this.AffiliateExist.data.Message;
          }
        });
      }
    });
    extend('validEmail', (value) => {
      return this.CheckEmail(value).then(() => {
        console.log(`validEmail: ${this.AvailableEmail.data.Status}`);
        if (this.AvailableEmail.data.Status === 0) {
          return true;
        } else {
          return this.$t(`not.available`);
        }
      });
    });
    extend('usernameMinMax', {
      ...minMax,
      message: this.$t('helpJoinUsUserIdRequire'),
    });
    extend('passwordMinMax', {
      ...minMax,
      message: this.$t('helpJoinUsPassword'),
    });
    extend('email', {
      ...email,
      message: this.$t(`jquery.validator.email`),
    });
    extend('passwordAlphaNum', {
      ...alpha_num,
      message: this.$t('helpJoinUsPassword'),
    });
    extend('usernameAlphaNum', {
      ...alpha_num,
      message: this.$t('helpJoinUsUserIdRequire'),
    });
    extend('numericOnly', {
      ...numeric,
      message: this.$t('numeric.characters.only'),
    });
    extend('validateWebUrlLink', {
      validate(value) {
        var pattern = new RegExp(
          '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
          'i'
        );
        return pattern.test(value);
      },
      message: 'Please enter a valid link.',
    });
    extend('minmax', {
      validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
      },
      params: ['min', 'max'],
    });
    extend('validCaptcha', (value) => {
      return this.CheckCaptcha(value).then(() => {
        if (this.AvailableCaptcha.data.Status === 0) {
          return true;
        } else {
          return this.$t(`error.verify.captcha`);
        }
      });
    });
  },
  created: function() {
    this.getLanguage(1);
    this.getDialCode(this.profileModel.Country);
    this.getCurrencys(this.profileModel.Country);
    this.getChatTools('zh-cn');
    this.fetchCountries();
    if (this.$route.query.ref != undefined) {
      Promise.all([this.fetchAffiliateCode(this.$route.query.ref)]).then(() => {
        if (this.OwnAffiliateIdResponse != '') {
          this.ownAffiliateId = this.OwnAffiliateIdResponse;
          this.profileModel.AffiliateCode = this.OwnAffiliateIdResponse;
        }
      });
    }
  },
  computed: {
    ...mapState('Auth', ['AuthModel']),
    ...mapState('Account', ['OwnAffiliateIdResponse']),
    ...mapGetters({
      langCode: 'langCode',
    }),
    ...mapState('Register', [
      'AvailableUserName',
      'AvailableEmail',
      'RegisterResponse',
      'AvailableCaptcha',
      'AffiliateExist',
    ]),
    ...mapState('Common', [
      'Languages',
      'ChatTools',
      'DialCodes',
      'Currencys',
      'CurrentCountryCode',
    ]),
    ...mapGetters('Common', [
      'getChatToolOptions',
      'getChatToolTextByCode',
      'getDialCodeOptions',
      'getDialCodeTextByCode',
    ]),
    ...mapState('Web', ['Countries', 'showSignUpDialog']),
    ...mapGetters('Web', ['getCountryOptions', 'getCountryTextByCode']),
    imgSrc() {
      return `${this.imgPath}?v=${this.versionNumber}`;
    },
  },
  methods: {
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    ...mapActions('Register', [
      'registerAccount',
      'CheckUserName',
      'CheckEmail',
      'CheckCaptcha',
      'CheckAffiliateExist',
    ]),
    ...mapActions('Common', [
      'getLanguage',
      'getChatTools',
      'getDialCode',
      'getCurrencys',
      'getCountryByIP',
    ]),
    ...mapActions('Web', [
      'fetchCountries',
      'setShowLoginDialog',
      'setShowSignUpDialog',
    ]),
    ...mapActions('Account', ['fetchAffiliateCode']),
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
              this.onRegister();
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
              this.onCloseRegistration();
            },
          },
        ],
      };
      this.openDialog({
        payload,
        setting: {
          maxWidth: '18.5rem',
          closeOnClickOutside: true,
          overlayZIndex: 203,
          contentClass: 'shadow-overlay',
        },
      });
    },
    onCloseRegistration: function(event) {
      this.profileModel.Username = '';
      this.profileModel.Password = '';
      this.profileModel.ConfirmPassword = '';
      this.profileModel.FirstName = '';
      this.profileModel.LastName = '';
      this.profileModel.Country = '';
      this.profileModel.Language = '';
      this.profileModel.Currency = '';
      this.profileModel.City = '';
      this.profileModel.Address = '';
      this.profileModel.Postal = '';
      this.profileModel.DialCode = '';
      this.profileModel.ContactNo = '';
      this.profileModel.Email = '';
      this.profileModel.ChatTool = '';
      this.profileModel.ChatAddress = '';
      this.profileModel.OwnWebsite = 0;
      this.profileModel.WebUrl = '';
      this.profileModel.Describe = '';
      this.profileModel.Captcha = '';
      this.profileModel.AffiliateCode = '';
      this.e1 = 1;
      this.setShowSignUpDialog(false);
    },
    selectPayload(selectType) {
      switch (selectType) {
        case 'lang':
          this.optionsPayload = Object.values(this.Languages).map((item) => {
            return {
              key: item.Code,
              text: item.Descr,
            };
          });
          break;
        case 'Currency':
          this.optionsPayload = Object.values(this.Currencys.Currencies).map(
            (item) => {
              return {
                key: item,
                text: item,
              };
            }
          );
          break;
        case 'DialCode':
          this.optionsPayload = this.getDialCodeOptions;
          break;
        case 'ChatTool':
          this.optionsPayload = this.getChatToolOptions;
          break;
        case 'Country':
          this.optionsPayload = this.getCountryOptions;
          break;
      }
      this.openSelect(this.optionsPayload, selectType);
    },
    getLanguageText(code) {
      let _item = this.Languages.find((item) => item.Code == code);
      if (_item === undefined) return '————';
      return _item?.Descr;
    },
    getCurrencyText(code) {
      let _item = this.Currencys.Currencies.find((item) => item == code);
      if (_item === undefined) return '————';
      return _item;
    },
    async onRegister() {
      if (
        this.checkOs().isAndroid ||
        this.checkOs().isPhone ||
        this.checkOs().isTablet
      ) {
        this.PlatformId = 2;
      } else if (this.checkOs().isPc) {
        this.PlatformId = 1;
      }
      var blackbox = window.GetIovationBlackBox(1);
      const data = {
        Username: this.profileModel.Username,
        Password: this.profileModel.Password,
        FirstName: this.profileModel.FirstName,
        LastName: this.profileModel.LastName,
        Country: this.profileModel.Country,
        Language: this.profileModel.Language,
        Currency: this.profileModel.Currency,
        City: this.profileModel.City,
        Address: this.profileModel.Address,
        Postal: this.profileModel.Postal,
        DialCode: this.profileModel.DialCode,
        ContactNo: this.profileModel.ContactNo,
        Email: this.profileModel.Email,
        ChatTool: this.profileModel.ChatTool,
        ChatAddress: this.profileModel.ChatAddress,
        OwnWebsite: this.profileModel.OwnWebsite === 0 ? 1 : 0,
        WebUrl: this.profileModel.WebUrl,
        Describe: this.profileModel.Describe,
        AffiliateCode: this.profileModel.AffiliateCode,
        Captcha: this.profileModel.Captcha,
        RegistrationPlatformId: this.PlatformId,
        IovationBlackbox: blackbox,
      };
      const response = await this.registerAccount(data);
      if (this.RegisterResponse.data.Status === 0) {
        this.onCloseRegistration();
        this.$router.push({ path: `/${this.langCode}/successpage` });
      } else {
        var _response = this.RegisterResponse.data;
        let payload = {
          title: '',
          msg: _response.Message,
        };
        this.openDialog({
          payload,
          setting: { maxWidth: '18.5rem', closeOnClickOutside: true },
        });
      }
    },
    onWebUrlBlur() {
      if (
        this.profileModel.OwnWebsite === 0 &&
        this.profileModel.WebUrl === ''
      ) {
        this.isValidateWebUrl = true;
      } else {
        this.isValidateWebUrl = false;
      }
    },
    onDescribeBlur() {
      if (
        this.profileModel.OwnWebsite === 1 &&
        this.profileModel.Describe === ''
      ) {
        this.isValidateWebUrl = true;
      } else {
        this.isValidateWebUrl = false;
      }
    },
    refresh() {
      this.versionNumber = new Date().getTime();
    },
    checkOs() {
      var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
          /(?:iPad|PlayBook)/.test(ua) ||
          (isAndroid && !/(?:Mobile)/.test(ua)) ||
          (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
      };
    },
    openSelect(optionsPayload, selectType) {
      this.optionsPayload = optionsPayload;
      this.selectType = selectType;
      this.onOpenSelect = true;
      this.setShowSignUpDialog(false);
    },
    closeSelect(selectedKey, selectType) {
      switch (selectType) {
        case 'lang':
          if (selectType != undefined) {
            this.getChatTools(selectedKey);
          }
          this.profileModel.Language = selectedKey;
          break;
        case 'Country':
          this.getCurrencys(selectedKey).then(()=>{
            this.getDialCodeByCountry(selectedKey);
          }).then(()=>{
            this.profileModel.Country = selectedKey;
          });
          break;
        case 'Currency':
          this.profileModel.Currency = selectedKey;
          break;
        case 'ChatTool':
          this.profileModel.ChatTool = selectedKey;
          break;
        case 'DialCode':
          this.profileModel.DialCode = selectedKey;
          break;
      }

      this.onOpenSelect = false;
      this.setShowSignUpDialog(true);
    },
    getDialCodeByCountry(code) {
      let _item = this.DialCodes.find((item) => item.CountryCode == code);
      if (_item != undefined) {
        this.profileModel.DialCode = _item.Code;
      }
    },
    getCountryCode() {
      if (this.profileModel.Country == '') {
        Promise.all([this.getCountryByIP()]).then(() => {
          this.profileModel.Country = this.CurrentCountryCode;
          this.getCurrencys(this.profileModel.Country);
          this.getDialCodeByCountry(this.profileModel.Country);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_registration-drawer';

@include icon(('icon-stick-arrow-left', 'icon-stick-arrow-right'));
</style>
