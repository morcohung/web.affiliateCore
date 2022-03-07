
export default function date(value: number) {
    const target = new Date(value);   
    const date = target.toLocaleDateString('en-gb', { year: 'numeric', month: 'numeric', day: 'numeric' }); 
    return `${date}`;
  }
  