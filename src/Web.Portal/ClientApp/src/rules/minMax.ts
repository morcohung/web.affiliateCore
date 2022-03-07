export default {
    validate: (value, { min, max }) => value.length >= min && value.length <= max,
    params: ['min', 'max']
  };
  