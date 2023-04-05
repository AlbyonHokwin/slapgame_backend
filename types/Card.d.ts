declare namespace Card {
  type Color = 'red' | 'black';

  type Text<T extends Lang = 'en'> =
    T extends 'fr' ? 'as' | 'un' | 'deux' | 'trois' | 'quatre' | 'cinq' | 'six' | 'sept' | 'huit' | 'neuf' | 'dix' | 'valet' | 'dame' | 'roi' | 'joker' :
    'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king' | 'joker';

  type Symbol<T extends Lang = 'en'> =
    T extends 'fr' ? 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'V' | 'D' | 'R' :
    'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

  type Suit<T extends Lang = 'en'> =
    T extends 'fr' ? 'carreaux' | 'coeurs' | 'piques' | 'trèfles' :
    'diamonds' | 'hearts' | 'spades' | 'clubs';

  type SuitSymbol = '♦' | '♥' | '♠' | '♣' | '☆' | '★';

  type Type = 'number' | 'face' | 'ace' | 'joker';
}

export type Lang = 'fr' | 'en';

export interface Card {
  id: number;
  value: number;
  textEn: Card.Text<'en'>;
  textFr: Card.Text<'fr'>;
  symbol: Card.Symbol | null;
  suitEn: Card.Suit<'en'> | null;
  suitFr: Card.Suit<'fr'> | null;
  suitSymbol: Card.SuitSymbol;
  color: Card.Color;
  type: Card.Type;
}