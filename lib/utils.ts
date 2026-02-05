
export function cn(...inputs: any[]) {
  return inputs
    .flat()
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'object') {
        return Object.entries(item)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return item;
    })
    .join(' ');
}
