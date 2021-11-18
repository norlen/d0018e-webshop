export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
