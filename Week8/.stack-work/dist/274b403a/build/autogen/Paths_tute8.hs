{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
module Paths_tute8 (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\bin"
libdir     = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\lib\\x86_64-windows-ghc-8.10.3\\tute8-0.1.0.0-FyKuFQnEvFXFvrUkzWJhR1"
dynlibdir  = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\lib\\x86_64-windows-ghc-8.10.3"
datadir    = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\share\\x86_64-windows-ghc-8.10.3\\tute8-0.1.0.0"
libexecdir = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\libexec\\x86_64-windows-ghc-8.10.3\\tute8-0.1.0.0"
sysconfdir = "C:\\Users\\abhch\\Documents\\Uni\\Year 5 S2 (2022)\\FIT2102\\FIT2102-Tutorials\\Week8\\.stack-work\\install\\065f7544\\etc"

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "tute8_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "tute8_libdir") (\_ -> return libdir)
getDynLibDir = catchIO (getEnv "tute8_dynlibdir") (\_ -> return dynlibdir)
getDataDir = catchIO (getEnv "tute8_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "tute8_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "tute8_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "\\" ++ name)
