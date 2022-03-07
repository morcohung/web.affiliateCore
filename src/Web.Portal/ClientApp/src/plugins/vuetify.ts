import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#232323',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#e63e36',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        anchor: '#ff9200',
      },
    },
  },
  breakpoint: {
    thresholds: {
      xs: 375,
      sm: 600,
      md: 937,
      lg: 1241,
    },
    scrollBarWidth: 0,
  },
});
