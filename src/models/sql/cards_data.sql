DELETE FROM cards;

INSERT INTO cards 
(id, value_int, value_text_fr, value_text_en, value_symbol_fr, value_symbol_en, suit_text_fr, suit_text_en, suit_symbol, suit_color, type)
VALUES
    -- HEARTS
    ( 1,  1,     'as',   'ace',  'A',  'A', 'coeurs', 'hearts', '♥', 'red',    'ace')
  , ( 2,  2,   'deux',   'two',  '2',  '2', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 3,  3,  'trois', 'three',  '3',  '3', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 4,  4, 'quatre',  'four',  '4',  '4', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 5,  5,   'cinq',  'five',  '5',  '5', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 6,  6,    'six',   'six',  '6',  '6', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 7,  7,   'sept', 'seven',  '7',  '7', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 8,  8,   'huit', 'eight',  '8',  '8', 'coeurs', 'hearts', '♥', 'red', 'number')
  , ( 9,  9,   'neuf',  'nine',  '9',  '9', 'coeurs', 'hearts', '♥', 'red', 'number')
  , (10, 10,    'dix',   'ten', '10', '10', 'coeurs', 'hearts', '♥', 'red', 'number')
  , (11, 11,  'valet',  'jack',  'V',  'J', 'coeurs', 'hearts', '♥', 'red',   'face')
  , (12, 12,   'dame', 'queen',  'D',  'Q', 'coeurs', 'hearts', '♥', 'red',   'face')
  , (13, 13,    'roi',  'king',  'R',  'K', 'coeurs', 'hearts', '♥', 'red',   'face')

    -- DIAMONDS
  , (14,  1,     'as',   'ace',  'A',  'A', 'carreaux', 'diamonds', '♦', 'red',    'ace')
  , (15,  2,   'deux',   'two',  '2',  '2', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (16,  3,  'trois', 'three',  '3',  '3', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (17,  4, 'quatre',  'four',  '4',  '4', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (18,  5,   'cinq',  'five',  '5',  '5', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (19,  6,    'six',   'six',  '6',  '6', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (20,  7,   'sept', 'seven',  '7',  '7', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (21,  8,   'huit', 'eight',  '8',  '8', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (22,  9,   'neuf',  'nine',  '9',  '9', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (23, 10,    'dix',   'ten', '10', '10', 'carreaux', 'diamonds', '♦', 'red', 'number')
  , (24, 11,  'valet',  'jack',  'V',  'J', 'carreaux', 'diamonds', '♦', 'red',   'face')
  , (25, 12,   'dame', 'queen',  'D',  'Q', 'carreaux', 'diamonds', '♦', 'red',   'face')
  , (26, 13,    'roi',  'king',  'R',  'K', 'carreaux', 'diamonds', '♦', 'red',   'face')

    -- CLUBS
  , (27,  1,     'as',   'ace',  'A',  'A', 'trèfles', 'clubs', '♣', 'red',    'ace')
  , (28,  2,   'deux',   'two',  '2',  '2', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (29,  3,  'trois', 'three',  '3',  '3', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (30,  4, 'quatre',  'four',  '4',  '4', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (31,  5,   'cinq',  'five',  '5',  '5', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (32,  6,    'six',   'six',  '6',  '6', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (33,  7,   'sept', 'seven',  '7',  '7', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (34,  8,   'huit', 'eight',  '8',  '8', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (35,  9,   'neuf',  'nine',  '9',  '9', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (36, 10,    'dix',   'ten', '10', '10', 'trèfles', 'clubs', '♣', 'red', 'number')
  , (37, 11,  'valet',  'jack',  'V',  'J', 'trèfles', 'clubs', '♣', 'red',   'face')
  , (38, 12,   'dame', 'queen',  'D',  'Q', 'trèfles', 'clubs', '♣', 'red',   'face')
  , (39, 13,    'roi',  'king',  'R',  'K', 'trèfles', 'clubs', '♣', 'red',   'face')

    -- SPADES
  , (40,  1,     'as',   'ace',  'A',  'A', 'piques', 'spades', '♠', 'red',    'ace')
  , (41,  2,   'deux',   'two',  '2',  '2', 'piques', 'spades', '♠', 'red', 'number')
  , (42,  3,  'trois', 'three',  '3',  '3', 'piques', 'spades', '♠', 'red', 'number')
  , (43,  4, 'quatre',  'four',  '4',  '4', 'piques', 'spades', '♠', 'red', 'number')
  , (44,  5,   'cinq',  'five',  '5',  '5', 'piques', 'spades', '♠', 'red', 'number')
  , (45,  6,    'six',   'six',  '6',  '6', 'piques', 'spades', '♠', 'red', 'number')
  , (46,  7,   'sept', 'seven',  '7',  '7', 'piques', 'spades', '♠', 'red', 'number')
  , (47,  8,   'huit', 'eight',  '8',  '8', 'piques', 'spades', '♠', 'red', 'number')
  , (48,  9,   'neuf',  'nine',  '9',  '9', 'piques', 'spades', '♠', 'red', 'number')
  , (49, 10,    'dix',   'ten', '10', '10', 'piques', 'spades', '♠', 'red', 'number')
  , (50, 11,  'valet',  'jack',  'V',  'J', 'piques', 'spades', '♠', 'red',   'face')
  , (51, 12,   'dame', 'queen',  'D',  'Q', 'piques', 'spades', '♠', 'red',   'face')
  , (52, 13,    'roi',  'king',  'R',  'K', 'piques', 'spades', '♠', 'red',   'face')
	
    -- JOKERS
  , (53, NULL, 'joker', 'joker', NULL, NULL, NULL, NULL, '☆',   'red', 'joker')
  , (54, NULL, 'joker', 'joker', NULL, NULL, NULL, NULL, '★', 'black', 'joker')
;
