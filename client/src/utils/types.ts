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

export enum ParamOrderType{
    date = 0,
    likes = 1
}
  
export enum KindOrderType{
    asc = 0,
    desc = 1
}

export type QuestionType={
    title:string,
    text:string,
    user:string,
    when:Date,
    id:number,
    likes:number,
    hasLiked:boolean,
    hasCreated:boolean
}

export type AnswerType={
    text:string,
    user:string,
    when:Date,
    id:number,
    likes:number,
    hasLiked:boolean,
    hasCreated: boolean
}

export enum ModalType{
    mteQuestion = 0,
    mteAnswer = 1,
    mtaCreate = 2,
    mtaEdit = 3
}

export type EditingPubliType={
    id:number,
    title:string,
    text:string;
  } | null