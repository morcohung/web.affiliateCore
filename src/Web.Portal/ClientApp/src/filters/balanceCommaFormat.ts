export default function  priceCommaFormat(price){
    let numberString;
    numberString = (Math.floor(price*100)/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numberString;
}
  