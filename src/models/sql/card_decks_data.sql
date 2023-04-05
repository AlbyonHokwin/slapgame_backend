DELETE FROM card_decks;

INSERT INTO card_decks
	(id, name_fr, name_en, description_fr, description_en)
VALUES
	(1, 'Jeu de 52 cartes', '52-Card deck', 'Jeu comprenant toutes les cartes à l''exception des jokers', 'Pack with every cards except joker cards'),
	(2, 'Jeu de 54 cartes', '54-Card deck', 'Jeu comprenant toutes les cartes dont les 2 jokers', 'Pack with every cards even the 2 joker cards'),
	(3, 'Jeu de 32 cartes', '32-Card deck', 'Jeu comprenant les cartes 7, 8, 9, 10, valet, dame, roi et as uniquement', 'Pack with 7, 8, 9, 10, jack, queen, king and ace cards only'),
	(4, 'Jeu de 34 cartes', '34-Card deck', 'Jeu comprenant les cartes 7, 8, 9, 10, valet, dame, roi, as et deux jokers uniquement', 'Pack with 7, 8, 9, 10, jack, queen, king, ace cards but also 2 joker cards')
;