from os import walk
from typing import Optional

from src.Utils.lists_utils import human_sort


def get_files_from_path(path: str, to_sort: Optional[bool] = True) -> list[str]:
    """
    It takes a path and returns a list of files in that path

    Args:
      path (str): The path to the directory you want to get the files from.
      to_sort (Optional[bool]): If True, the files will be sorted in a human-friendly way. Defaults to True

    Returns:
      A list of files in the path
    """
    f = next(walk(path), (None, None, []))[2]
    if to_sort:
        human_sort(f)
    return [f'{path}/{file}' for file in f]


def get_files_by_extension(directory_path: str, extension: str, to_sort: Optional[bool] = True) -> list[str]:
    """
    > This function returns a list of files in a directory that have a specific extension.

    Args:
      directory_path (str): The path to the directory you want to get the files from.
      extension (str): The extension of the files you want to get.
      to_sort (Optional[bool]): If True, the files will be sorted by their name. Defaults to True

    Returns:
      A list of strings.
    """
    files: list[str] = get_files_from_path(directory_path, to_sort)
    return list(filter(lambda elem: elem.split(".")[-1] == extension, files))
