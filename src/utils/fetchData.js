import axios from 'axios';

export const fetchData = async (totalNums) => {
  const url = `http://www.random.org/integers/?num=${totalNums}&min=0&max=7&col=1&base=10&format=plain&rnd=new`;

  const fetchedNums = await axios.get(url);
  const nums = fetchedNums.data.match(/[0-9]/gi);

  return nums;
}