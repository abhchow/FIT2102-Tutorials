-- | Implementation of integer valued binary trees.
module BinTree where


-- | A 'BinTree' is a type of tree which is either a 'Leaf' with no values, or
-- a 'Label' with a value and two sub-trees.
data BinTree = Leaf | Label Int BinTree BinTree
  deriving (Show)

-- $setup
tree = Label 16 (Label 23 Leaf (Label 73 Leaf Leaf)) (Label 42 Leaf Leaf)
one = Label 1 Leaf Leaf

-- | Find the depth of a tree (number of levels)
--
-- >>> depth Leaf
-- 0
--
-- >>> depth (Label 1 Leaf Leaf)
-- 1
--
-- >>> depth tree
-- 3
depth :: BinTree -> Int
depth Leaf = 0
depth (Label _ bt1 bt2) = 1 + max (depth bt1)(depth bt2)


-- | Find the number of nodes in a tree.
--
-- >>> size Leaf
-- 0
--
-- >>> size one
-- 1
--
-- >>> size tree
-- 4
size :: BinTree -> Int
size Leaf = 0
size (Label _ bt1 bt2) = 1 + size bt1 + size bt2

-- | Sum the elements of a numeric tree.
--
-- >>> sumTree Leaf
-- 0
--
-- >>> sumTree one
-- 1
--
-- >>> sumTree tree
-- 154
--
-- prop> sumTree (Label v Leaf Leaf) == v
sumTree :: BinTree -> Int
sumTree Leaf = 0
sumTree (Label x bt1 bt2) = x + sumTree bt1 + sumTree bt2

-- | Find the minimum element in a tree.
--
-- E.g., minTree @(your pattern here)@ = error "Tree is empty"
--
-- >>> minTree one
-- 1
--
-- >>> minTree tree
-- 16
--
minTree :: BinTree -> Int
minTree Leaf = error "Tree is empty"
minTree (Label x Leaf Leaf) = x
minTree (Label x bt1 Leaf)  = min x (minTree bt1)
minTree (Label x Leaf bt2)  = min x (minTree bt2)
minTree (Label x bt1 bt2)   = min x (min (minTree bt1) (minTree bt2))

-- | Map a function over a tree.
--
-- >>> mapTree (+1) Leaf
-- Leaf
--
-- >>> mapTree (*1) one
-- Label 1 Leaf Leaf
--
-- >>> mapTree ((flip mod) 2) tree
-- Label 0 (Label 1 Leaf (Label 1 Leaf Leaf)) (Label 0 Leaf Leaf)
mapTree :: (Int -> Int) -> BinTree -> BinTree
mapTree f Leaf = Leaf
mapTree f (Label x Leaf Leaf) = Label (f x) Leaf Leaf
mapTree f (Label x bt1 Leaf)  = Label (f x) (mapTree f bt1) Leaf
mapTree f (Label x Leaf bt2)  = Label (f x) Leaf (mapTree f bt2)
mapTree f (Label x bt1 bt2)   = Label (f x) (mapTree f bt1) (mapTree f bt2)
