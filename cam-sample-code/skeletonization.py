import cv2
import matplotlib.pyplot as plt
from PIL import Image
from skimage.morphology import skeletonize
from skimage.color import rgb2gray
import numpy as np

#load image and conver to binary
img = cv2.imread('cam-sample-code/test.jpg')
mask = np.zeros(img.shape[:2],np.uint8)
bgdModel = np.zeros((1,65),np.float64)
fgdModel = np.zeros((1,65),np.float64)
rect = (50,50,450,290)
cv2.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv2.GC_INIT_WITH_RECT)
mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
img = img*mask2[:,:,np.newaxis]


ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
bw_img=rgb2gray(bw_img)

#skeletonize image
skel = skeletonize(bw_img)

fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(8, 4))

ax = axes.ravel()

ax[0].imshow(img)
ax[0].axis('off')
ax[0].set_title('original', fontsize=20)

ax[1].imshow(skel, cmap=plt.cm.gray)
ax[1].axis('off')
ax[1].set_title('skeleton', fontsize=20)

fig.tight_layout()
plt.show()