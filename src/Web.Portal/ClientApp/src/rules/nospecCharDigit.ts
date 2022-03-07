export default {
    validate: (value, args) => {
      const pattern = new RegExp('^(?=.*$)(?!.*[.~,_:!@#$%^&*\\[\\]()-+\'";`><=\\/?|{|}0-9|])');
      return pattern.test(value);
    }
  };
  