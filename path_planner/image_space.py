import numpy as np
import sys


class ImageSpace:

    def __new__(cls):
        img = np.random.randint(2, size=(100, 100), dtype=int)
        return img


