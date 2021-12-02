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

export const cutoff = (s: string, maxlen: number): string => {
  if (s.length > maxlen) {
    s = s.slice(0, maxlen - 3);
    s = s.concat("...");
  }
  return s;
};

export const getStock = (amount: number): [number, string] => {
  let text = "";
  if (amount == 0) {
    text = "ej i lager";
  } else if (amount >= 100) {
    text = "100+";
  } else {
    text = amount.toString();
  }
  return [amount, text];
};

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
