export  function formatNumber(number: number) {
    let numberString;
    numberString = (Math.floor(number*100)/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numberString;
  }
  