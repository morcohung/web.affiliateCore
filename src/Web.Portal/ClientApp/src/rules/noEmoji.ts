export default {
    validate: (value, args) => {
      const pattern = new RegExp(
        '(\u00a9|\u00ae|[\u2000-\u3000]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])'
      );
      return !pattern.test(value);
    }
  };
  