<template>
  <component
    :is="$vuetify.breakpoint.lgAndUp ? 'VContainer' : 'div'"
    class="announcements"   
  >
    <VToolbar flat color="transparent">
      <h1 class="text-xxxl px-5">{{$t(`announcement`)}}</h1>
    </VToolbar>

    <VCard
      flat
      :outlined="$vuetify.breakpoint.lgAndUp"
      :color="$vuetify.breakpoint.lgAndUp ? undefined : 'transparent'"
      class="rounded-lg"
    >
      <VList color="transparent">
        <template>
        <div v-for="(announcement, $index) in Announcement.AnnouncementList" :key="$index">          
          <VListItem
            class="item px-8"
            :class="$vuetify.breakpoint.lgAndUp ? 'desktop' : 'mobile'"
            @click.stop="moreDetails(true,announcement)"
          >
            <div class="item--content">
              <VRow dense class="align-center">
                <VCol class="excerpt d-block d-md-flex align-center">
                  <h2
                    class="category text-md d-block d-md-inline-block  flex-md-shrink-0"
                  >
                    {{announcement.Type}}
                  </h2>
                  <p class="excerpt--text d-block d-md-inline-block mb-0">
                    {{announcement.Text.substring(0,20)}}                                  
                  </p>
                   <div v-show="announcement.Text.length >= 20">
                    .... 
                  </div>  
                </VCol>
                <VCol class="flex-grow-0 flex-shrink-0">
                  <time class="text-xxs">{{announcement.EffectiveDate | date}}</time>
                </VCol>
              </VRow>
            </div>
          </VListItem>
          <VDivider></VDivider>
        </div>
        </template>
      </VList>
    </VCard>
    <SideDrawerDetail
      :showMoreDetails="showMoreDetails"
      :headingSubTitle="headingSubTitle"
      :headingTitle="headingTitle"
      @moreDetails="moreDetails"
    >
      <template slot="sideDrawerContent">
        <div class="pa-8">
          <h2 class="text-md">{{detailModel.Type}}</h2>
          <h3 class="text-xxs mb-4">{{detailModel.EffectiveDate | date}}</h3>
          <p class="text-md">
            {{detailModel.Text}} 
          </p>
        </div>
      </template>
    </SideDrawerDetail>
  </component>
</template>
<script>
import { mapState,mapActions } from "vuex";
import { VContainer } from 'vuetify/lib';
import SideDrawerDetail from '@/components/reports/SideDrawerDetail';
import date from '@/filters/date';
export default {
  filters: { date }, 
  data: () => ({
    showMoreDetails: false,
    sideDrawerContent: '',
    headingSubTitle: '',
    headingTitle: '',
    detailModel:[{  
        Text:'',
        EffectiveDate:'',       
        Type:'' 
    }]    
  }),
  components: {
    VContainer,
    SideDrawerDetail,
  },
  created:function(){
    this.fetchAnnouncementList();    
  },
  computed: {    
    ...mapState('Announcement', ['Announcement'])  
  },    
  methods: {
    ...mapActions('Announcement', ['fetchAnnouncementList']),  
    moreDetails: function(event,announcementModel) {
      if (event === true)
      {
        this.detailModel.Text = announcementModel.Text;
        this.detailModel.EffectiveDate = announcementModel.EffectiveDate;
        this.detailModel.Type = announcementModel.Type;       
      }
       this.showMoreDetails = event;
    },
    myFunction() {		
		  this.substr = this.str.substr(0, 20);		
    }    
  },
};
</script>
<style lang="scss" scoped>
.v-list {
  &::v-deep {
    .item {
      &.mobile {
        height: rem(95);
      }
      &.desktop {
        height: rem(72);
      }
    }
    .item--content {
      max-width: 100%;
      width: 100%;
      .category {
        width: rem(120);
        white-space: nowrap;
      }
      .excerpt {
        min-width: 0;
        .excerpt--text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      time {
        white-space: nowrap;
      }
    }
  }
}
</style>
