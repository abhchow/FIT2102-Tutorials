{-# LANGUAGE NoImplicitPrelude #-}
{-# OPTIONS_GHC -Wno-unrecognised-pragmas #-}

{-# HLINT ignore "Use or" #-}
{-# HLINT ignore "Use and" #-}
{-# HLINT ignore "Use concat" #-}

-- Complete the following table when you submit this file:

-- Surname     | Firstname | email | Contribution% | Any issues?
-- =============================================================
-- Person 1... | Timothy | tong0006@student.monash.edu | 100% |
-- Person 2... |         |                             | 0%   |
-- Person 3... |         |                             | 0%   |
-- Person 4... |         |                             | 0%   |

-- | The goal of this module is to rewrite "standard" Haskell functions using
-- only /folds/.
module Folds where

import Base hiding ((++))

-- | Rewrite 'all' using 'foldr'.
-- | Must write point-free and without lambda functions.
-- >>> all [True, True, True]
-- True
--
-- >>> all [False, True, True]
-- False
all :: [Bool] -> Bool
all = foldr (&&) True

-- | Rewrite 'any' using 'foldr'.
-- | Must write point-free and without lambda functions.
-- >>> any [False, False, False]
-- False
--
-- >>> any [False, True, False]
-- True
any :: [Bool] -> Bool
any = foldr (||) False

-- | Rewrite 'sum' using 'foldr'.
-- | Must write point-free and without lambda functions.
-- >>> sum [1, 2, 3]
-- 6
--
-- >>> sum [1..10]
-- 55
--
-- prop> \x -> foldl (-) (sum x) x == 0
sum :: Num a => [a] -> a
sum = foldr (+) 0

-- | Rewrite 'product' using 'foldr'.
-- | Must write point-free and without lambda functions.
-- >>> product [1, 2, 3]
-- 6
--
-- >>> product [1..10]
-- 3628800
product :: Num a => [a] -> a
product = foldr (*) 1

-- | Rewrite 'length' using 'foldr'.
-- | Must write point-free and without lambda functions.
-- >>> length [1, 2, 3]
-- 3
--
-- >>> length []
-- 0
--
-- prop> sum (map (const 1) x) == length x
length :: [a] -> Int
length = foldr (\_ y -> y + 1) 0

-- | Rewrite /append/ '(++)' using 'foldr'.
-- | Must write this in point-free notation and without lambda functions
--
-- /Hint/: This is the same as cons-ing the elements of the first list to the second
-- /Hint/: The 'flip' function might come in handy
--
-- >>> [1] ++ [2] ++ [3]
-- [1,2,3]
--
-- >>> "abc" ++ "d"
-- "abcd"
--
-- prop> (x ++ []) == x
--
-- Associativity of append.
-- prop> (x ++ y) ++ z == x ++ (y ++ z)
(++) :: [a] -> [a] -> [a]
(++) = flip $ foldr (:)

-- | Flatten a (once) nested list.
-- | Must write point-free and without lambda functions.
-- >>> flatten [[1], [2], [3]]
-- [1,2,3]
--
-- >>> flatten [[1, 2], [3], []]
-- [1,2,3]
--
-- prop> sum (map length x) == length (flatten x)
flatten :: [[a]] -> [a]
flatten = foldr (++) []
