DELETE FROM combinations;

INSERT INTO combinations
	(id, name_fr, name_en, description_fr, description_en)
VALUES
	(1, 'double', 'double', 'Deux cartes de même valeur', 'Two cards of equal rank'),
	(2, 'sandwich', 'sandwich', 'Double avec une seule carte de valeur différente intercalée entre les deux', 'Double with one card of a different rank between the two'),
	(3, 'big mac', 'big mac', 'Double avec deux carte de valeurs différentes intercalées entre les deux', 'Double with two cards of a different rank between the two'),
	(4, '7 magique', 'magic 7', 'Un 7', 'A 7'),
	(5, '10 magique', 'magic 10', 'Un 10', 'A 10'),
	(6, 'Somme de 10', 'Sum of 10', 'La somme de deux cartes consécutives vaut 10', 'The sum of two consecutive cards is 10'),
	(7, 'Sandwich de 10', 'Sandwich of 10', '2 cartes dont la somme vaut 10, avec une carte quelconque intercalée', '2 cards whose sum is 10, with any card interposed')
;