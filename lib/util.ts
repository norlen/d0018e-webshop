export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const status = ["Hanterar", "Packar", "På väg", "Levererad"];

export const getOrderStatusInt = (str: string) => {
  switch (str) {
    case "Hanterar":
      return 0;
    case "Packar":
      return 1;
    case "På väg":
      return 2;
    case "Levererad":
      return 3;
  }
  return -1;
};

export const getOrderStatusName = (status: number) => {
  switch (status) {
    case 0:
      return "Hanterar";
    case 1:
      return "Packar";
    case 2:
      return "På väg";
    case 3:
      return "Levererad";
  }
};

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
