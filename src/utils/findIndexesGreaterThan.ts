export default function findIndexesGreaterThan(array: number[], threshold: number): number[] {
  return array.reduce((acc: number[], val: number, index: number) => {
    if (val > threshold) {
      acc.push(index);
    }
    return acc;
  }, []);
}
