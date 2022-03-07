export default {
    validate: (value, args) => {
      const pattern = new RegExp('[^a-zA-Z0-9-\\s]');
      return !pattern.test(value);
    }
  };
  