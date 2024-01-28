export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    typ: KindergardenTyp; 
  }
  
  export enum KindergardenTyp {
    Privat = 'Privat',
    Oeffentlich = 'Oeffentlich',
  }
