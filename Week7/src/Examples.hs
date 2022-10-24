module Examples where

import           Prelude
import           Data.List
import           Data.Ord
import           Data.Function

-- $setup

-- | Sorting a list by length.
--
-- >>> sortList [[1,2,3], [1,2]]
-- [[1,2],[1,2,3]]
sortList :: [[a]] -> [[a]]
sortList = sortOn length

-- | Finding the largest list.
--
-- >>> longestList [[1,2,3], [1,2]]
-- [1,2,3]
longestList :: [[a]] -> [a]
longestList l = last $ sortOn length l

-- | Finding the sumProduct of two lists.
--
-- >>> sumProduct [1,2,3] [1,2,4]
-- 17
sumProduct :: [Int] -> [Int] -> Int
sumProduct l1 l2 = sum $ zipWith (*) l1 l2 

-- | Group consecutive elements which are equal after applying function
--
-- >>> groupEqual id [1,1,1,1,2,2,2,2,2,3,4]
-- [[1,1,1,1],[2,2,2,2,2],[3],[4]]
-- >>> groupEqual (`mod` 5) [5,5,5,5,10,10,10,15,15,15]
-- [[5,5,5,5,10,10,10,15,15,15]]
identity :: a -> a
identity a = a

groupEqual :: Eq b => (a -> b) -> [a] -> [[a]]
groupEqual = groupBy . on (==)
-- groupEqual f l = (groupBy . on (==)) f l

-- type signature for on:
-- (b -> b -> c) -> (a -> b) -> a -> a -> c
-- on takes two inputs of type a, and applys the function f :: (a -> b) on them
-- then combines (compares in this case) them using g :: (b -> b -> c)

-- | Apply function to every element in a nested list
--
-- >>> nestedMap (+1) [[1,2,3], [4,5,6], [7,8,9]]
-- [[2,3,4],[5,6,7],[8,9,10]]
nestedMap :: (a -> b) -> [[a]] -> [[b]]
nestedMap f = map $ map f
-- nestedMap f (x:xs) = map f x : nestedMap f xs
    -- for each nested list, map f over it
    -- ie, map (map f) over the outer list
