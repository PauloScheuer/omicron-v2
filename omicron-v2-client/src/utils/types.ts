export enum CardType{
    cdContentItem = 0,
    cdContentText = 1,
    cdPerson = 2
}

export type FieldType  = {
    name:string;
    initialValue?:number;
  }