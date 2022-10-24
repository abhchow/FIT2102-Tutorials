-- | Basic game of rock, paper, scissors.
module RockPaperScissors where

-- $setup
-- >>> import Prelude(fst, snd)
-- >>> import Control.Applicative
-- >>> rps = [Rock, Paper, Scissors]
-- >>> combinations = liftA2 (,) rps rps
-- >>> insight f = map (liftA2 f fst snd)

-- | Types for the game choices: rock, paper or scissors.
data RockPaperScissors = Rock | Paper | Scissors

-- | Result of a game: either one player won, or it's a draw.
data Result = Player1 | Player2 | Draw
  deriving(Eq, Show)

type Plays = [RockPaperScissors] -- This type alias is used to make our inputs more meaningful!

-- | A hand should print as:
--
--  * Rock: \"R\"
--  * Paper: \"P\"
--  * Scissors: \"S\"
--
-- >>> map show rps
-- ["R","P","S"]
instance Show RockPaperScissors where
  show Rock = "R"
  show Paper = "P"
  show Scissors = "S"

-- | Equality between members.
--
-- >>> insight (==) combinations
-- [True,False,False,False,True,False,False,False,True]
instance Eq RockPaperScissors where
  Rock == Rock = True
  Rock == _ = False
  Paper == Paper = True
  Paper == _ = False
  Scissors == Scissors = True
  Scissors == _ = False
  -- a == b = show a == show b

-- | Ordering to determine winning moves.
--
-- >>> insight compare combinations
-- [EQ,LT,GT,GT,EQ,LT,LT,GT,EQ]
instance Ord RockPaperScissors where
  compare Rock x = case x of
    Rock -> EQ
    Paper -> LT
    Scissors -> GT
  compare Paper x = case x of
    Rock -> GT
    Paper -> EQ
    Scissors -> LT
  compare Scissors x = case x of
    Rock -> LT
    Paper -> GT
    Scissors -> EQ


mapWin :: Ordering -> Result
mapWin x =
  case x of 
    LT -> Player2
    EQ -> Draw
    GT -> Player1



-- | Tell which player won.
--
-- >>> insight whoWon combinations
-- [Draw,Player2,Player1,Player1,Draw,Player2,Player2,Player1,Draw]
whoWon :: RockPaperScissors -> RockPaperScissors -> Result
whoWon a b = mapWin (compare a b)


-- | Counts number of times a Result occurred in a series of Plays.
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Player1
-- 2
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Player2
-- 1
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Draw
-- 1
countResult :: Plays -> Plays -> Result -> Int
countResult p1 p2 r = length (filter (== r) (zipWith whoWon p1 p2))

-- | Calculates result of a series of Plays
--
-- Hint: use countResult!
--
-- >>> competition [Rock, Rock, Rock] [Paper, Paper, Paper]
-- Player2

-- >>> competition [Scissors, Scissors, Scissors] [Paper, Paper, Paper]
-- Player1

-- >>> competition [Scissors, Scissors, Rock] [Paper, Scissors, Paper]
-- Draw

-- >>> competition [Rock, Rock, Rock, Rock, Paper, Paper] [Scissors, Scissors, Scissors, Scissors, Scissors, Scissors]
-- Player1

-- >>> competition [Scissors, Scissors, Scissors, Scissors, Scissors, Scissors] [Rock, Rock, Rock, Rock, Paper, Paper]
-- Player2
competition :: Plays -> Plays -> Result
competition p1 p2 = mapWin $ compare (resCount Player1) $ resCount Player2 
  where resCount = countResult p1 p2
