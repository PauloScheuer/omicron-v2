export enum CardType{
    cdContentItem = 0,
    cdContentText = 1,
    cdPerson = 2
}

export type ContentType = {
    nameContent:string;
    textContent:string;
    levelContent:number;
    neededFieldsContent:number;
    indexContent:number;
    fields:FieldType[];
}

export type StepType = {
    textStep:string;
    evaluateStep?:boolean;
    notShowStep?:boolean;
    replaceStep?:boolean;
}

export type FieldType  = {
    nameField:string;
    value?:string;
    invisibleField?:boolean;
    steps?:StepType[]
}

export type CalculatorField = {
    [key: string]: (number | undefined);
}

export type CalculatorFieldEntry = [string, number | undefined];

export type UserType={
    name: string;
    email: string;
    level: number;
    id: number;
    token: string
}

export type Action={
    type: string,
    payload: UserType
}

export type ActionWithoutParam={
    type: string
}