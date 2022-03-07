<template>
  <div>
    <TheBurgerMenu    
       v-if="!fullTableView"
      @closeBurgerMenu="showBurgerMenu(false)"
      :isBurgerMenuVisible="isBurgerMenuVisible" 
      :isShowLogin="true"
      :isShowRegistration="false"
    />  
  <VSheet class="bg--gray">
    <VContainer>     
    <StaticContentPage/>
    </VContainer>
  </VSheet>    
  </div>
</template>
<script>
import TheBurgerMenu from '@/components/common/TheBurgerMenu';
import StaticContentPage from '@/pages/menu/StaticContentPage';
export default {
  name: 'Auth',
  data: () => ({ 
    fullTableView: false,
    isBurgerMenuVisible: true,
  }),
  components: {
    TheBurgerMenu,
    StaticContentPage
  }, 
  methods: {  
    showBurgerMenu(state) {
      this.isBurgerMenuVisible = state;
    },    
  },
};
</script>
