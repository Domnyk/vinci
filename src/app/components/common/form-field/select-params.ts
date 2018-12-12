export interface SelectParams {
  isMultiple: boolean;
  options: Array<Option>;
  id: string;
}

interface Option {
  label: string;
  value: any;
}
