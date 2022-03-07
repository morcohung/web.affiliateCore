<template>
  <div class="filters">
    <VCard
      :outlined="isFiltered()"
      :color="isFiltered() ? '#f6f6f6' : 'transparent'"
      class="filter-box rounded-lg p mb-4 elevation-0 d-flex"
      :class="{
        'with-result': isFiltered(),
        mobile: $vuetify.breakpoint.mdAndDown,
        'expanded-filter': expandFilter,
      }"
    >
      <VCardText class="d-flex pa-0">
        <VSpacer :class="{ 'py-2 pl-2': $vuetify.breakpoint.lgAndUp }">
          <VChip
            v-for="(filterItem, $index) in filterItems"
            v-if="filterItem.length > 0"
            :key="$index"
            class="ma-2"
            close
            outlined
            @click:close="removeItems(filterItem)"
          >
            {{ ConvertToDisplayName(filterItem) }}
          </VChip>
          <div class="px-2 pb-2 text-right mr-n14 d-block d-md-none">
            <VBtn
              v-if="isFiltered()"
              text
              class="mt-2 color-blue"
              @click="clearFilter()"
            >
              Clear All
            </VBtn>
          </div>
        </VSpacer>
        <div
          :cols="isFiltered() ? '4' : '12'"
          class="text-center pa-5 d-none d-md-block"
        >
          <VBtn outlined @click.stop="showFilter()">
            <span class="betfont icon-settings mr-4"></span><span>Filter</span>
          </VBtn>
          <br />
          <VBtn
            v-if="isFiltered()"
            text
            class="mt-2 color-blue"
            @click="clearFilter()"
          >
            Clear All
          </VBtn>
        </div>
        <div v-if="isFiltered()" class="text-center pa-3 d-block d-md-none">
          <VBtn
            icon
            small
            class="btn-caret"
            @click.stop="expandFilter = !expandFilter"
          >
            <span
              class="betfont "
              :class="expandFilter ? 'icon-caretup' : 'icon-caretdown'"
            ></span>
          </VBtn>
        </div>
      </VCardText>
    </VCard>
    <VOverlay v-if="isFilterVisible">
      <div></div>
    </VOverlay>
    <VDialog
      v-model="isFilterVisible"
      :content-class="
        $vuetify.breakpoint.mdAndUp ? 'desktop-drawer' : 'mobile-drawer'
      "
      transition="slide-x-reverse-transition"
      @click:outside="applyFilters"
      persistent
      fullscreen
    >
      <VSheet class="rounded-0 pb-12">
        <VAppBar height="auto" flat absolute>
          <VBtn
            icon
            class="ml-n3"
            @click.stop="
              menu == 'top' ? closeFilters : (headingTitle = 'Filters'),
                (menu = 'top')
            "
          >
            <span class="betfont icon-stick-arrow-left"></span>
          </VBtn>
          <VSpacer class="font-weight-bold">
            <div :class="headingSubTitle.length > 0 ? 'text-xxs' : 'text-md'">
              {{ headingTitle }}
            </div>
            <div>{{ headingSubTitle }}</div>
          </VSpacer>
        </VAppBar>

        <VBottomNavigation absolute height="auto">
          <VCard flat>
            <VCardText>
              <VBtn
                class="rounded mr-4 text-uppercase"
                outlined
                @click.stop="clearFilter"
                >{{ $t(`clear.all`) }}</VBtn
              >
              <VBtn
                color="primary"
                class="rounded text-uppercase"
                @click.stop="applyFilters"
                ><span class="color-white">{{ $t(`apply`) }}</span></VBtn
              >
            </VCardText>
          </VCard>
        </VBottomNavigation>
        <div class="v-app-bar"></div>
        <VDivider></VDivider>
        <VItemGroup class="radio-list">
          <template v-if="menu == 'top'">
            <VListItem
              @click="
                {
                  (menu = 'sort'), (headingTitle = 'Sort');
                }
              "
            >
              <div>
                <div class="text--primary">Sort By</div>
                <div class="text-xs text--secondary mt-1">
                  Alphabetical (A-Z)
                </div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
            <VListItem
              @click="
                {
                  (menu = 'memberStatus'), (headingTitle = 'Member Status');
                }
              "
            >
              <div>
                <div class="text--primary">Member Status</div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
            <VListItem
              @click="
                {
                  (menu = 'depositStatus'), (headingTitle = 'Deposit Status');
                }
              "
            >
              <div>
                <div class="text--primary">Deposit Status</div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
            <VListItem
              @click="
                {
                  (menu = 'registrationDate'),
                    (headingTitle = 'Registration Date');
                }
              "
            >
              <div>
                <div class="text--primary">Registration Date</div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
            <VListItem
              @click="
                {
                  (menu = 'memberCountry'), (headingTitle = 'Member Country');
                }
              "
            >
              <div>
                <div class="text--primary">Member Country</div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
            <VListItem
              @click="
                {
                  (menu = 'memberCurrency'), (headingTitle = 'Member Currency');
                }
              "
            >
              <div>
                <div class="text--primary">Member Currency</div>
              </div>
              <VSpacer></VSpacer>
              <span class="betfont icon-caretright text-xs mr-2"></span>
            </VListItem>
            <VDivider class="my-2"></VDivider>
          </template>
          <template v-if="menu == 'sort'">
            <VRadioGroup v-model="filterItems.sortType">
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Alphabetical (A-Z)"
                  :value="'AtoZ'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  :label="'Member status'"
                  color="#ff9200"
                  label="Alphabetical (Z-A)"
                  :value="'ZtoA'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
            </VRadioGroup>
          </template>
          <template v-if="menu == 'memberStatus'">
            <VRadioGroup v-model="filterItems.memberStatus">
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Interest"
                  :value="'Interest'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  :label="'Member status'"
                  color="#ff9200"
                  label="Completed"
                  :value="'Completed'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
            </VRadioGroup>
          </template>
          <template v-if="menu == 'depositStatus'">
            <VRadioGroup v-model="filterItems.depositStatus">
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Deposited"
                  :value="'Deposited'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  :label="'Member status'"
                  color="#ff9200"
                  label="Non-deposited"
                  :value="'Non-deposited'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
            </VRadioGroup>
          </template>
          <template v-if="menu == 'registrationDate'">
            <VRadioGroup
              v-model="filterItems.registrationDateExpress"
              @change="cancelDatepicker"
            >
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Today"
                  :value="'Today'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Yesterday"
                  :value="'Yesterday'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Last 7 days"
                  :value="'Last 7 days'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
              <VListItem>
                <VRadio
                  on-icon="icon-radio-on"
                  off-icon="icon-radio-off"
                  color="#ff9200"
                  label="Last 30 days"
                  :value="'Last 30 days'"
                >
                </VRadio>
              </VListItem>
              <VDivider class="my-2"></VDivider>
            </VRadioGroup>

            <VCard
              @click.stop="showDatePicker = !showDatePicker"
              class="mx-4 mb-2 rounded-lg"
            >
              <VCardText class="d-flex align-center">
                <VSpacer>
                  <h3>Date Range</h3>
                  <div
                    v-if="filterItems.registrationDate.length > 0"
                    class="text-xs"
                  >
                    {{
                      ConvertToCustomDateFormat(filterItems.registrationDate[0])
                    }}
                    -
                    {{
                      ConvertToCustomDateFormat(filterItems.registrationDate[1])
                    }}
                  </div>
                </VSpacer>
                <span class="betfont icon-calendar  orange--text"></span>
              </VCardText>
            </VCard>
            <VCard
              class="mb-12 mx-4 elevation-5 rounded-lg"
              v-if="showDatePicker"
            >
              <!-- <VToolbar flat color="#ff9200" class="white--text">
                <span>XX Selected</span>
                <VSpacer></VSpacer>
                <span class="opacity-80">2020</span>
              </VToolbar> -->
              <VDatePicker
                range
                color="#ff9200"
                v-model="filterItems.registrationDate"
                next-icon="mdi-chevron-right text-xs"
                prev-icon="mdi-chevron-left text-xs"
                scrollable
                @change="datepickerChange"
                @input="datepickerChange"
              >
                <VSpacer></VSpacer>
                <VBtn text color="blue" @click="cancelDatepicker">
                  Cancel
                </VBtn>
                <VBtn text color="blue" @click="closeDatepicker">
                  OK
                </VBtn>
              </VDatePicker>
            </VCard>
          </template>
          <template v-if="menu == 'memberCountry'">
            <VRadioGroup v-model="filterItems.memberCountry">
              <div
                v-for="(country, $index) in allCountries.CountryList"
                :key="$index"
              >
                <VListItem>
                  <VRadio
                    on-icon="icon-radio-on"
                    off-icon="icon-radio-off"
                    color="#ff9200"
                    :value="country.CountryCode"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center">
                        <VAvatar
                          class="mr-4"
                          width="1.5rem"
                          height="1.5rem"
                          min-width="1.5rem"
                        >
                          <div
                            class="glyphicon flag-icon"
                            :class="
                              'flag-icon-' + country.CountryCode.toLowerCase()
                            "
                          ></div>
                        </VAvatar>

                        {{ country.CountryDisplayName }}
                      </div>
                    </template>
                  </VRadio>
                </VListItem>
                <VDivider class="my-2"></VDivider>
              </div>
            </VRadioGroup>
          </template>
          <template v-if="menu == 'memberCurrency'">
            <VRadioGroup v-model="filterItems.memberCurrency">
              <div
                v-for="(currency, $index) in allCurrencies.CurrencyList"
                :key="$index"
              >
                <VListItem>
                  <VRadio
                    on-icon="icon-radio-on"
                    off-icon="icon-radio-off"
                    color="#ff9200"
                    :label="currency.CurrencyCode"
                    :value="currency.CurrencyCode"
                  >
                  </VRadio>
                </VListItem>
                <VDivider class="my-2"></VDivider>
              </div>
            </VRadioGroup>
          </template>
        </VItemGroup>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  props: {
    value: Object,
    isFilterVisible: { default: false },

    items: {
      type: Array,
      default: [],
    },
    allCountries: {
      type: Object,
      default: {},
    },
    allCurrencies: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      expandFilter: false,
      menu: 'top',
      date: [],
      showDatePicker: false,
      filterItems: this.value,
      //filterItems: [],
      headingTitle: 'Filters',
      headingSubTitle: '',
    };
  },
  components: {},
  watch: {
    value(newValue) {
      this.filterItems = newValue;
    },
  },
  methods: {
    applyFilters() {
      this.$emit('applyFilters');
      this.$emit('closeFilters');
    },
    closeFilters() {
      this.$emit('closeFilters');
      this.$emit('input', this.filterItems);
      //this.$emit('getFilterData');
    },
    showFilter() {
      this.$emit('showFilter');
    },
    clearFilter() {
      this.filterItems = {
        sortType: '',
        memberStatus: '',
        depositStatus: '',
        registrationDateExpress: '',
        registrationDate: [],
        memberCurrency: '',
        memberCountry: '',
      };

      this.$emit('input', this.filterItems);
      this.applyFilters();
      //this.$emit('getFilterData');
    },
    removeItems(item) {
      switch (item) {
        case 'AtoZ':
        case 'ZtoA':
          this.filterItems.sortType = '';
          break;
        case 'Interest':
        case 'Completed':
          this.filterItems.memberStatus = '';
          break;
        case 'Deposited':
        case 'Non-deposited':
          this.filterItems.depositStatus = '';
          break;
        case 'Today':
        case 'Yesterday':
        case 'Last 7 days':
        case 'Last 30 days':
          this.filterItems.registrationDateExpress = '';
          break;
        default:
          if (Array.isArray(item)) {
            this.filterItems.registrationDate = [];
          } else {
            if (
              this.allCurrencies.CurrencyList.findIndex(
                (e) => e.CurrencyCode == item
              ) != -1
            ) {
              this.filterItems.memberCurrency = '';
            } else if (
              this.allCountries.CountryList.findIndex(
                (e) => e.CountryCode == item
              ) != -1
            ) {
              this.filterItems.memberCountry = '';
            }
          }
          break;
      }

      this.$emit('input', this.filterItems);
      this.applyFilters();
      //this.$emit('getFilterData');
    },
    isFiltered() {
      for (var prop in this.filterItems) {
        if (this.filterItems[prop].length > 0) {
          return true;
        }
      }
      return false;
    },
    showFilterItem(filterItem) {
      return filterItem.length > 0;
    },
    ConvertToDisplayName(item) {
      var displayName = '';
      switch (item) {
        case 'AtoZ':
          displayName = 'Alphabetical A-Z';
          break;
        case 'ZtoA':
          displayName = 'Alphabetical Z-A';
          break;
        case 'Interest':
        case 'Completed':
        case 'Deposited':
        case 'Non-deposited':
          displayName = item;
          break;
        case 'Today':
        case 'Yesterday':
        case 'Last 7 days':
        case 'Last 30 days':
          displayName = 'Registered: ' + item;
          break;
        default:
          if (Array.isArray(item)) {
            displayName =
              'Registered: ' +
              this.ConvertToCustomDateFormat(item[0]) +
              '~' +
              this.ConvertToCustomDateFormat(item[1]);
          } else {
            if (
              this.allCurrencies.CurrencyList.findIndex(
                (e) => e.CurrencyCode == item
              ) != -1
            ) {
              displayName = item;
            } else if (
              this.allCountries.CountryList.findIndex(
                (e) => e.CountryCode == item
              ) != -1
            ) {
              displayName = this.allCountries.CountryList.find(
                (e) => e.CountryCode == item
              ).CountryDisplayName;
            }
          }
          break;
      }
      return displayName;
    },
    ConvertToCustomDateFormat(dateString) {
      var date = moment(dateString, 'yyyy-MM-DD');
      var customFormat = moment(date).format('DD/MM/yyyy');
      return customFormat;
    },
    cancelDatepicker() {
      this.closeDatepicker();
      this.filterItems.registrationDate = [];
    },
    datepickerChange() {
      this.filterItems.registrationDateExpress = '';
    },
    closeDatepicker() {
      this.showDatePicker = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_filters';
@import '../../assets/scss/03_organisms/_flags-all';
@import '../../assets/scss/04_templates/_filter-referrals';
</style>
