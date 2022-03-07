import { Module } from 'vuex';
import { RegisterState } from './typings';
import { RootState } from '@/store/typings';
import actions from './actions';
import mutations from './mutations';
const state: RegisterState = {
 RegisterProfile:{
   Username: '',
   Password:'',
   FirstName: '',
   LastName: '',
   Language: '',  
   Currency: '',
   Email: '',
   DialCode: 0,
   ContactNo: '',
   ChatTool: '',
   ChatAddress: '',
   Address: '',
   City: '',
   Country: '',
   Postal: '',//PostalCodeZip
   OwnWebsite: 0,
   Describe: '',
   WebUrl: '',
   AffiliateCode: '',
   Captcha: '',
   RegistrationPlatformId: 1,
   //Extras
   ProfileList:[{
       FieldName: '',
       FieldValue: '',
       Description: ''
   }],
  },
  AvailableUserName: {   
    data:{    
      Status: 0,
      Message:''
    }
  },
  AvailableEmail: {   
    data:{    
      Status: 0,
      Message:''
    }
  }, 
  RegisterResponse: {   
    data:{    
      Status: 0,
      Message:''
    }
  },  
  AvailableCaptcha: {   
    data:{    
      Status: 0,
      Message:''
    }
  },    
    
};
const Register: Module<RegisterState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
export default Register;