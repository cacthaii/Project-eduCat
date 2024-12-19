USE educat;

-- Temporarily disable foreign key checks
SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE answers AUTO_INCREMENT = 1;

-- Clear existing data (if any) to avoid conflicts
DELETE FROM answers;
DELETE FROM questions;
DELETE FROM modules;

-- Reset auto-increment values
ALTER TABLE answers AUTO_INCREMENT = 1;
ALTER TABLE questions AUTO_INCREMENT = 1;
ALTER TABLE modules AUTO_INCREMENT = 1;

INSERT INTO modules (module_name, description) VALUES
('Whole Numbers', 'Writing, ordering whole numbers as well as multiplication and division of whole numbers'),
('Decimals', 'Study place value and ordering decimals, adding, subtracting, multiplying and dividing decimals'),
('Sequences', 'Get Familiar with nth term, nth term of quadratic sequences, geometric sequences and special sequences'),
('Algebraic Expressions', 'Focuses on expressions, simplyfying expressions, expanding brackets, double brackets and triple brackets');

INSERT INTO questions (question_id, module_id, question_text, question_type, difficulty) VALUES
(1, 1, 'What is the value of 7 in the number 2,731,656?', 'multiple_choice', 'easy'),
(2, 1, 'What number is halfway between 250 and 850?', 'multiple_choice', 'easy'),
(3, 1, 'The product of 7 x 8 = 56 , which statement would be true for the product of 700 x 80?', 'multiple_choice', 'easy'),
(4, 1, 'Write the number two million, three hundred and two thousand, five hundred and one in figures.', 'multiple_choice', 'easy'),
(5, 1, 'Calculate 7 + 8 x 12', 'multiple_choice', 'medium'),
(6, 1, 'Calculate 5 + 3^2 - 20 / 2', 'single_choice', 'hard'),
(7, 2, 'Calculate 56.3 + 4.93', 'multiple_choice', 'easy'),
(8, 2, 'Calculate 1.2 x 0.4', 'multiple_choice', 'easy'),
(9, 2, 'Find the value of 10 / 0.2', 'multiple_choice', 'easy'),
(10, 2, 'Find the value of 55.77 / 11', 'multiple_choice', 'easy'),
(11, 2, 'Tom buys milk and chocolate. Milk costs £1.35 and the chocolate costs £1.79. Tom pays with a £5 note, how much change should he get back?', 'multiple_choice', 'medium'),
(12, 2, 'A family of two adults and four children want to go to a music festival together. Adult tickets are £23.25 each, and its £14.95 each for children. How much will it cost altogether for entry?', 'single_choice', 'hard'),
(13, 3, '4, 7, 10, 13, 16, 19... Which expression correctly encapsulates this sequence?', 'multiple_choice', 'easy'),
(14, 3, '2, 7, 12, 17, 22... What is the nth term of this sequence?', 'multiple_choice', 'easy'),
(15, 3, '22, 20, 18, 16, 14, 12... What is the nth term of this sequence?', 'multiple_choice', 'easy'),
(16, 3, '11, 15, 19, 23, 27, 31... Complete the missing value from the expression for the nth term of this sequence: 4n ___ ', 'multiple_choice', 'easy'),
(17, 3, '44, 37, 30.. If these are the first 3 terms in the sequence, what position would the first term below zero be?', 'multiple_choice', 'medium'),
(18, 3, 'The nth term of two different sequences are shown here: 2n - 1 and 10n - 3. Which number is in both sequences?', 'single_choice', 'hard'),
(19, 4, 'Write an algebraic expression for 6 more than the value of x', 'multiple_choice', 'easy'),
(20, 4, 'Simplify fully 15x - 2y - 6x - 5y', 'multiple_choice', 'easy'),
(21, 4, 'Which of the following is not correct?', 'multiple_choice', 'easy'),
(22, 4, 'If Jeff is 4 years older than Sam, where Jeff = J and Sam = S, which equation represents this accurately?', 'multiple_choice', 'easy'),
(23, 4, 'If 3x - 6 represents one side of an equilateral triangle, which of the following would not give the perimeter of the triangle?', 'multiple_choice', 'medium'),
(24, 4, 'Expand and simplify 6 + 5x(3x^2 + 3)', 'single_choice', 'hard');


INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(1, 'Seven million', FALSE),
(1, 'Seven hundred thousand', TRUE),
(1, 'Seventy thousand', FALSE),
(1, 'Seven thousand', FALSE),
(2, '550', TRUE),
(2, '450', FALSE),
(2, '750', FALSE),
(2, '650', FALSE),
(3, 'It is 100 times greater than 56', FALSE),
(3, 'It is 10000 more than 56', FALSE),
(3, 'It is 1000 times greater than 56', TRUE),
(3, 'It is 5600', FALSE),
(4, '2,302,150', FALSE),
(4, '2,203,510', FALSE),
(4, '2,320,501', FALSE),
(4, '2,302,501', TRUE),
(5, '103', TRUE),
(5, '27', FALSE),
(5, '92', FALSE),
(5, '180', FALSE),
(6, '4', TRUE),
(7, '10.56', FALSE),
(7, '60.23', FALSE),
(7, '61.23', TRUE),
(7, '1.055', FALSE),
(8, '4.8', FALSE),
(8, '0.48', TRUE),
(8, '0.048', FALSE),
(8, '0.0048', FALSE),
(9, '500', FALSE),
(9, '0.5', FALSE),
(9, '50', TRUE),
(9, '5', FALSE),
(10, '5.17', FALSE),
(10, '5.007', FALSE),
(10, '5.7', FALSE),
(10, '5.07', TRUE),
(11, '£2.86', FALSE),
(11, '£3.04', FALSE),
(11, '£1.86', TRUE),
(11, '£3.14', FALSE),
(12, '£106.30', TRUE),
(13, '3n + 1', TRUE),
(13, '3n + 4', FALSE),
(13, '4n + 2', FALSE),
(13, 'n + 3', FALSE),
(14, 'n + 5', FALSE),
(14, '5n + 4', FALSE),
(14, '5n - 3', TRUE),
(14, '5n + 2', FALSE),
(15, 'n - 2', FALSE),
(15, '22 - 2n', FALSE),
(15, '2n + 20', FALSE),
(15, '24 - 2n', TRUE),
(16, '+ 7', TRUE),
(16, '- 3', FALSE),
(16, '+ 5', FALSE),
(16, '+ 6', FALSE),
(17, '7th term', FALSE),
(17, '2nd term', FALSE),
(17, '8th term', TRUE),
(17, '-5th term', FALSE),
(18, '127', TRUE),
(19, '6 - x', FALSE),
(19, 'x - 6', FALSE),
(19, 'x + 6', TRUE),
(19, '6x', FALSE),
(20, '21x + 7y', FALSE),
(20, '9x - 7y', TRUE),
(20, '9x + 7y', FALSE),
(20, '-7y - 9x', FALSE),
(21, '11 + z -- z = 11', TRUE),
(21, '3 x b = 3b', FALSE),
(21, 'a x a x a x a = a^4', FALSE),
(21, '6y = 6 x y', FALSE),
(22, 'J = S + 4', TRUE),
(22, 'S = J + 4', FALSE),
(22, 'J = 4 - S', FALSE),
(22, 'J = S - 4', FALSE),
(23, '3(3x - 6)', FALSE),
(23, '9x - 18', FALSE),
(23, '9x + 12', TRUE),
(23, '3x - 6 + 3x - 6 + 3x - 6', FALSE),
(24, '15x^3 + 15x + 6', TRUE);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;