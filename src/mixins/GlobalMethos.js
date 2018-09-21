const GlobalMethods = {
  methods: {
    regNum(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '');
    }
  }
};

export default GlobalMethods;
