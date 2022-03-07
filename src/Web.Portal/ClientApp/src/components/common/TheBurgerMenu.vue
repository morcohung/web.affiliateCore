<template>
  <div class="the-burger-menu">
    <!-- <VOverlay v-if="isBurgerMenuVisible" ></VOverlay> -->
    <SelectMenu
      :onOpenSelect="onOpenSelect"
      @onCloseSelect="closeSelect"
      :optionsPayload="optionsPayload"
      :selectType="selectType"
    ></SelectMenu>
    <LoginDrawer    
      :showLoginDrawer="showLoginDrawer"
      :setlangCode="langCode"     
      @onCloselogin="onCloselogin"
      @onPostLogin="onPostLogin"
      @onRegistration="onRegistration"
    /> 
    <RegistrationSteps   
      :showRegistrationDrawer="showRegistrationDrawer"    
      :setlangCode="langCode"
      :profileModel="profileModel"
      @openSelect ="openSelect"
      @onCloseRegistration="onCloseRegistration"
    />    
    <VOverlay v-if="isBurgerMenuVisible"> </VOverlay>
    <VDialog
      v-model="isBurgerMenuVisible"
      :content-class="
        $vuetify.breakpoint.mdAndUp
          ? 'desktop-burger-menu'
          : 'mobile-burger-menu'
      "
      @click:outside="closeBurgerMenu"
      fullscreen
      dark
      transition="slide-x-reverse-transition"
      persistent
    >
      <VSheet>
        <VToolbar
          class="side-app-bar"
          absolute
          color="#111111"
          height="auto"
          width="100%"
          flat
        >
          <VSpacer></VSpacer>
          <VBtn icon @click.stop="closeBurgerMenu">
            <span class="betfont icon-close opacity-80"></span>
          </VBtn>
        </VToolbar>
        <div class="side-app-bar"></div>
        <VDivider class="opacity-30"></VDivider>

        <VCard
          v-if="!isLogin"
          tile
          color="#111111"
          class="login-card elevation-0"
        >
          <VCardText class="px-12 py-8">
            <div class="mb-4 text-xl white--text">{{$t(`get.started`)}}</div>
            <VBtn
              large
              light
              block
              class="text-uppercase mb-10"
              @click="onlogin()"
            >
              <strong>{{ $t(`login`) }}</strong>
            </VBtn>
            <div>
              <!-- Not yet a member? <VRouter class="color-blue">Sign up</VRouter> -->
              <span>{{$t(`not.yet.a.membe`)}}?</span
              ><a href="#" class="blue--text text-decoration-none" @click="onRegistration()">{{$t(`sign.up`)}}</a>
            </div>
          </VCardText>
        </VCard>
        <VCard
          v-if="isLogin"
          tile
          color="pitch-black"
          class="logged-in-card elevation-0"
        >
          <VCardText class="px-0 py-8">
            <VListItem class="px-3 mx-0">
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont icon-avatar text-lg"></span>
              </VAvatar>
              <span
                >{{ AccountBalance.LastName }}
                {{ AccountBalance.FirstName }}</span
              >
            </VListItem>
            <VListItem class="px-8">
              <VListItemContent>
                <VListItemSubtitle>{{$t(`balance`)}}</VListItemSubtitle>
                <VListItemTitle class="d-flex align-center">
                  <div v-if="showBlance">
                    {{ AccountBalance.Currency }} {{ AccountBalance.Balance | formatNumber  }}
                  </div>
                  <div v-if="!showBlance">
                    {{ AccountBalance.Currency }}
                    <span class="px-2">&#8212;&#8212;.&#8212;&#8212;</span>
                  </div>
                  <VSpacer></VSpacer>
                  <VBtn
                    icon
                    x-small
                    size="1rem"
                    @click="showBlance = !showBlance"
                  >
                    <span
                      class="text-md betfont "
                      :class="
                        showBlance ? 'icon-hide-password' : 'icon-show-password'
                      "
                    ></span
                  ></VBtn>
                </VListItemTitle>
              </VListItemContent>
            </VListItem>
          </VCardText>
        </VCard>
        <VDivider class="opacity-30"></VDivider>
        <VCard
          v-if="isLogin"
          tile
          color="pitch-black"
          class="logged-in-menu elevation-0"
        >
          <VCardText class="px-0 py-0">
            <VListItemGroup>
              <VListItem
                class="px-2 text-md"
                v-for="loggedMenuItem in loggedMenuItems"
                :key="loggedMenuItem.key"
                @click="onRedirect(loggedMenuItem.link)"
              >
                <VAvatar size="3rem" class="mr-2">
                  <span
                    class="betfont opacity-80"
                    :class="loggedMenuItem.icon"
                  ></span>
                </VAvatar>
                {{ $t(loggedMenuItem.title) }}
              </VListItem>
            </VListItemGroup>
          </VCardText>
        </VCard>
        <VList class="pt-0">
          <VListItemGroup v-if="isLogin === false">
            <VListItem
              class="pl-2"
              v-for="item in beforeMenuItems"
              :key="item.key"
              @click="onRedirect(item.link)"
            >
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont opacity-80" :class="item.icon"></span>            
              </VAvatar>
              <span class="text-sm" v-if="item.link != 'menulang'">{{
                $t(item.title)
              }}</span>
              <span class="text-sm" v-if="item.link === 'menulang'">{{
                item.title
              }}</span>
              <VSpacer />
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont text-xs" :class="item.bkicon"></span>
              </VAvatar>      
            </VListItem>            
              <VSpacer></VSpacer>         
            <VDivider class="opacity-30"></VDivider>
            <VListItem class="pl-2" v-if="isLogin">
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont icon-logout opacity-80"></span>
              </VAvatar>
              <span @click="onlogout()">{{ $t(`logout`) }}</span>
            </VListItem>
          </VListItemGroup>
          <VListItemGroup v-if="isLogin === true">
            <VListItem
              class="pl-2"
              v-for="item in menuItems"
              :key="item.key"
              @click="onRedirect(item.link)"
            >
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont opacity-80" :class="item.icon"></span>            
              </VAvatar>
              <span class="text-sm" v-if="item.link != 'menulang'">{{
                $t(item.title)
              }}</span>
              <span class="text-sm" v-if="item.link === 'menulang'">{{
                item.title
              }}</span>
              <VSpacer />
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont text-xs" :class="item.bkicon"></span>
              </VAvatar>
              <VAvatar
                v-if="item.title == 'announcement'"
                color="red"
                size="21px"
                class="d-flex"
                ><span class="text-xxs" style="line-height:1em">{{Announcement.AnnouncementList.length}}</span>
                </VAvatar>                 
            </VListItem>            
              <VSpacer></VSpacer>         
            <VDivider class="opacity-30"></VDivider>
            <VListItem class="pl-2" v-if="isLogin">
              <VAvatar size="3rem" class="mr-2">
                <span class="betfont icon-logout opacity-80"></span>
              </VAvatar>
              <span @click="onlogout()">{{ $t(`logout`) }}</span>
            </VListItem>
          </VListItemGroup>          
        </VList>
      </VSheet>
    </VDialog>
  </div>
</template>
<script>
import SelectMenu from '@/components/common/SelectMenu';
import { mapGetters, mapState, mapActions } from 'vuex';
import LoginDrawer from '@/components/common/LoginDrawer';
import RegistrationSteps from '@/components/registration/RegistrationSteps.vue';
import AnnouncementPage from '@/pages/menu/AnnouncementPage.vue'
import { formatNumber } from '@/utils/numberFormat';
import {
  VBtn,
  VCard,
  VCardText,
  VDivider,
  VListItem,
  VAvatar,
} from 'vuetify/lib';
export default { 
  filters: { formatNumber },  
  inject: ['reload'],
  data() {
    return {
      isLogin: false,
      dialog: false,
      showBlance: true,
      selectType: '',
      beforeMenuItems: [
        { title: 'about.us', link: `aboutus`, icon: 'icon-aboutus', bkicon: '' },
        { title: 'term.and.condition', link: `termsandconditions`, icon: 'icon-tandc', bkicon: '' },
        { title: 'faq', link: `faq`, icon: 'icon-help-o', bkicon: '' },   
        { title: 'contact.us', link: `contactus`, icon: 'icon-support-o', bkicon: '' },
        { title: '', link: `menulang`, icon: 'flags ', bkicon: 'icon-caretrightthin' },
        { title: 'goto.188', link: `goto188`, icon: 'icon-brandlogo', bkicon: '' }
      ],      
      menuItems: [
        { title: 'about.us', link: `aboutus`, icon: 'icon-aboutus', bkicon: '' },
        { title: 'term.and.condition', link: `termsandconditions`, icon: 'icon-tandc', bkicon: '' },
        { title: 'faq', link: `faq`, icon: 'icon-help-o', bkicon: '' },    
        { title: 'announcement', link: `announcement`, icon: 'icon-announcement', bkicon: '' },        
        { title: 'contact.us', link: `contactus`, icon: 'icon-support-o', bkicon: '' },
        { title: '', link: `menulang`, icon: 'flags ', bkicon: 'icon-caretrightthin' },
        { title: 'goto.188', link: `goto188`, icon: 'icon-brandlogo', bkicon: '' }
      ],
      loggedMenuItems: [
        { title: 'home', link: ``, icon: 'icon-home' },
        { title: 'my.account', link: `myAccount`, icon: 'icon-avatar' },
        { title: 'creative', link: `creatives`, icon: 'icon-creatives' },
        { title: 'report', link: `reports`, icon: 'icon-tandc' },
        { title: 'payment', link: `payments`, icon: 'icon-payout' },
      ],
      showLoginDrawer: false,     
      showRegistrationDrawer: false,
      errormsg: '',
      selectType: 'menulang',
      onOpenSelect: false,
      selectedKey: '',
      optionsPayload: [],
      changelangPayload: [
        { key: 'en-gb', text: 'English', icon: 'flags en-gb' },
        { key: 'id-id', text: 'Bahasa Indibesia', icon: 'flags id-id' },
        { key: 'ja-jp', text: '日本語', icon: 'flags ja-jp' },
        { key: 'km-kh', text: 'ភាសាខ្មែរ', icon: 'flags km-kh' },
        { key: 'ko-kr', text: '한국어', icon: 'flags ko-kr' },
        { key: 'th-th', text: 'ไทย', icon: 'flags th-th' },
        { key: 'vi-vn', text: 'Tiếng Việt', icon: 'flags vi-vn' },
        { key: 'zh-cn', text: '中文(简体)', icon: 'flags zh-cn' },
      ],
      tolowerlang: '',
      redirectUrl: '',
      profileModel: {
        Username: '',
        Password:'',  
        ConfirmPassword:'',    
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
        ProfileList:[{
            FieldName:'',
            FieldValue:'',
            Description:''
        }]         
      }
    }
  },
  components: {
    VBtn,
    VCard,
    VCardText,
    VDivider,
    VListItem,
    VAvatar,
    LoginDrawer,
    SelectMenu,
    RegistrationSteps,
    AnnouncementPage
  },
  props: {
    isBurgerMenuVisible: { default: false },
    isShowLogin: { default: false },
    isShowRegistration: { default: false },
  },
  created: function() {    
    this.changeLangSelect(this.langCode);
    this.fetchAnnouncementList();   
    if (this.isShowLogin === true)
    {    
      this.onlogin();
    }    
    if (this.isShowRegistration === true)
    {    
      this.onRegistration();
    }       
    Promise.all([this.checkSession()]).then(() => {
      if (this.SessionModel.Status === 1) {
        this.fetchAffiliateCommissionBalance();      
        this.isLogin = true;      
      } 
    });
    if (
      this.checkOs().isAndroid ||
      this.checkOs().isPhone ||
      this.checkOs().isTablet
    ) {
      this.fetch188MemberSiteUrl(true);    
    } else if (this.checkOs().isPc) {
      this.fetch188MemberSiteUrl(false);    
    }      
  },
  computed: {
    ...mapGetters({
      langCode: 'langCode',
    }),
    ...mapGetters('Auth', ['SessionStatus']),
    ...mapState('Account', ['AccountBalance']),
    ...mapState('Auth', ['AuthModel', 'SessionModel', 'MemberSiteUrl']),
    ...mapState('Announcement', ['Announcement']),
    ...mapState('Web', ['showLoginDialog', 'showSignUpDialog'])
  },
  watch: {
    showLoginDialog(newValue, oldValue) {
      this.showLoginDrawer = newValue;
      if(newValue === true)
        this.onlogin();
      else
        this.onCloselogin();
    },
    showSignUpDialog(newValue, oldValue) {
      this.showRegistrationDrawer = newValue;
      if(newValue === true)
        this.onRegistration();
      else
        this.onCloseRegistration();
    }
  },
  methods: {
    ...mapActions({
      setLang: 'setLang',
    }),
    ...mapActions('Account', ['fetchAffiliateCommissionBalance']),
    ...mapActions('Auth', ['logout', 'checkSession', 'fetch188MemberSiteUrl']),
    ...mapActions('Common', ['setCurrentLang']),
    ...mapActions('Announcement', ['fetchAnnouncementList']),     
    ...mapActions({
      openDialog: 'DialogQueue/queue',
      closeDialog: 'DialogQueue/close',
    }),
    ...mapActions('Web', ['setShowLoginDialog','setShowSignUpDialog']),
    closeBurgerMenu() {
      this.$emit('closeBurgerMenu');
    },
    onCloseRegistration() { 
      this.setShowSignUpDialog(false);  
    },  
    onlogin(){
      this.setShowLoginDialog(true);
      this.setShowSignUpDialog(false);
      this.$emit('closeBurgerMenu');
    },
    onRegistration(){    
      this.setShowSignUpDialog(true);
      this.setShowLoginDialog(false);
      this.$emit("closeBurgerMenu");
    }, 
    onlogout() {
      Promise.all([this.logout()]).then(() => {
        if (this.SessionStatus === 1) {
          this.isLogin = false;
          this.setShowLoginDialog(true);
          this.$emit('closeBurgerMenu');
          this.reload();
          let path = [`/${this.langCode}/`];
          if (!path.includes(this.$route.path))
            this.$router.push({ path: `/${this.langCode}/` });
          this.reload();
        }
      });
    },
    onPostLogin() {
      if (this.SessionStatus === 1) {
        this.tolowerlang = this.AuthModel.Params.CultureCode.toLowerCase();
        this.setShowLoginDialog(false);
        this.isLogin = true;
        if (this.tolowerlang === 'en') {
          this.tolowerlang = 'en-gb';
        }
        this.reload();
        if (this.langCode != this.tolowerlang) {
          this.changeLangSelect(this.tolowerlang);
          this.$router.push({ path: `/${this.tolowerlang}/` });
        }
         const path = location.pathname.split('/')[2];
        if( path ==='Login' || path === 'Register')
        {
          this.$router.push({ path: `/${this.tolowerlang}/` });
        }
      } 
    },
    cancelAction: function(event) {
      let payload = {
        title: '',
        msg: this.errormsg,
      };
      this.openDialog({
        payload,
        setting: { maxWidth: '18.5rem' },
      });
    },
    onCloselogin() {
      this.setShowLoginDialog(false);
    },
    onRedirect(path) {     
      const languageCode = location.pathname.split('/')[1];
      let checkpath = [`/${languageCode}/${path}`];
      if (!checkpath.includes(this.$route.path)) {        
        switch (path) {
          case 'home':
            this.$router.push({ path: `/${languageCode}/` });
            break;
          case 'goto188':    
            console.log(this.MemberSiteUrl.Message);
            // window.open(this.redirectUrl, '_blank');
            break;
          case 'menulang':
            this.openSelect(this.changelangPayload,'menulang');
            break;
          default:
            this.$router.push({ path: `/${languageCode}/${path}` });
        }
      }
      this.$emit('closeBurgerMenu');
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
    changeLangSelect(langValue) {
      this.menuItems[5].title = this.changelangPayload.find(
        (x) => x.key === langValue
      )?.text;     
      this.menuItems[5].icon = 'flags ' + langValue;   

      this.beforeMenuItems[4].title = this.changelangPayload.find(
        (x) => x.key === langValue
      )?.text;     
      this.beforeMenuItems[4].icon = 'flags ' + langValue;         
    },
    openSelect(optionsPayload,selectType) {        
      this.optionsPayload = optionsPayload;
      this.selectType = selectType;     
      this.onOpenSelect = true;
      this.setShowSignUpDialog(false);
      this.$emit('closeBurgerMenu');
    },
    closeSelect(selectedKey,selectType) {   
      if(selectedKey === undefined && selectType === 'menulang')
      {      
            const currentlang = location.pathname.split('/')[1];    
            if(currentlang != this.langCode)     
            {
              this.$router.push({ path: `/${this.langCode}/` });
            }   
            this.reload();
      }
      else
      {
         switch (selectType)
          {
            case 'lang':
              this.profileModel.Language = selectedKey;            
              break;
            case 'Country':  
              this.profileModel.Country = selectedKey;           
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
        if (selectedKey === undefined && selectType != 'menulang') {
          this.onOpenSelect = false;
          this.setShowSignUpDialog(true);
        } 
        else 
        {
          switch (selectType)
          { 
            case 'menulang':  
              const path = location.pathname.split('/')[2];           
              this.changeLangSelect(selectedKey);
              this.setLang(selectedKey);
              this.setCurrentLang(selectedKey);
              this.$router.push({ path: `/${selectedKey}/${path}` });
              this.reload();
              break;                                               
          } 
          if (selectType != 'menulang')
          {
            this.setShowSignUpDialog(true);
          }
          this.onOpenSelect = false;         
        }        
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/04_templates/_the-burger-menu';
.v-dialog__content {
  &::v-deep {
    .desktop-burger-menu {
      max-width: rem(336);
      left: auto;
      right: 0;
      > .v-sheet {
        height: 100%;
        overflow-y: auto;
      }
    }
    .mobile-burger-menu {
      max-width: rem(336);
      left: auto;
      right: 0;
      > .v-sheet {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
