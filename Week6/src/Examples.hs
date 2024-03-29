-- | Example questions using hoogle


module Examples where

import Prelude

-- $setup

-- | Calculate eulerProblem1
--
-- >>> eulerProblem1 1000
-- 233168
eulerProblem1 :: Int -> Int
eulerProblem1 0 = 0
eulerProblem1 n = 
	if (mod (n-1) 3) == 0 || (mod (n-1) 5) == 0
		then (n-1) + eulerProblem1 (n-1)
		else eulerProblem1 (n-1)

-- | Function to check if every element in a list is even.
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> allEvens [1,2,3,4,5]
-- False
-- >>> allEvens [2,4]
-- True
allEvens :: [Int] -> Bool
allEvens l = all even l

-- | Function to check if any element is odd
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> anyOdd [1,2,3,4,5]
-- True
-- >>> anyOdd [0,0,0,4]
-- False
anyOdd :: [Int] -> Bool
anyOdd l = not (all even l)

-- | Function to sum every element in two lists
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> sumTwoLists [1,2,3,4,5] [1,2,3,4,5]
-- [2,4,6,8,10]
sumTwoLists :: [Int] -> [Int] -> [Int]
sumTwoLists l1 l2 = zipWith (+) l1 l2

-- | Function to make a list of the first item of each pair in a list of pairs
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> firstItem [(2,1), (4,3), (6,5)]
-- [2,4,6]
firstItem :: [(a,b)] -> [a]
firstItem list = map (\(a,_)->a) list
