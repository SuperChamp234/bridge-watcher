import cv2
import np

cars_cascade = cv2.CascadeClassifier('cam-sample-code/haarcascade_car.xml') #trained model from idk there are many duplicates on the web. I'll train a fresh one for production but rn this will do
kernel = np.ones((4,4),np.uint8)

def detect_cars(frame):
    cars = cars_cascade.detectMultiScale(frame, 1.15, 4)
    car_num = 0
    for (x, y, w, h) in cars:
        cv2.rectangle(frame, (x, y), (x+w,y+h), color=(0, 255, 0), thickness=2)
        car_num+=1
    return frame,car_num

def detect_cars_alternate(frame1, frame2):
    # frame differencing
    grayA = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
    grayB = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
    diff_image = cv2.absdiff(grayB, grayA)
    # image thresholding
    ret, thresh = cv2.threshold(diff_image, 30, 255, cv2.THRESH_BINARY)
    
    # image dilation
    dilated = cv2.dilate(thresh,kernel,iterations = 1)
    
    # find contours
    contours, hierarchy = cv2.findContours(dilated.copy(), cv2.RETR_TREE,cv2.CHAIN_APPROX_NONE)
    
    # shortlist contours appearing in the detection zone
    valid_cntrs = []
    for cntr in contours:
        x,y,w,h = cv2.boundingRect(cntr)
        if (x <= 200) & (y >= 80) & (cv2.contourArea(cntr) >= 25):
            if (y >= 90) & (cv2.contourArea(cntr) < 40):
                break
            valid_cntrs.append(cntr)
    # add contours to original frames
    dmy = frame2.copy()
    frame = cv2.drawContours(dmy, valid_cntrs, -1, (127,200,0), 2)
    return frame, len(valid_cntrs)


def Simulator():
    CarVideo = cv2.VideoCapture('cam-sample-code/cars3.mp4')
    while CarVideo.isOpened():
        ret, frame = CarVideo.read()
        controlkey = cv2.waitKey(1)
        if ret:        
            cars_frame,car_num = detect_cars(frame)
            cv2.putText(frame, 'Status : Detecting ', (40,40), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255,0,0), 2)
            cv2.putText(frame, f'Total Cars : {car_num}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255,0,0), 2)
            cv2.imshow('frame', cars_frame)
        else:
            break
        if controlkey == ord('q'): #press esc to stop frame
            break

    CarVideo.release()
    cv2.destroyAllWindows()
def Simulator_alternative():
    CarVideo = cv2.VideoCapture('cam-sample-code/cars2.mp4')
    while CarVideo.isOpened():
        ret, frame1 = CarVideo.read()
        ret, frame2 = CarVideo.read()
        controlkey = cv2.waitKey(1)
        if ret:        
            cars_frame,car_num = detect_cars_alternate(frame1, frame2)
            cv2.putText(cars_frame, 'Status : Detecting ', (40,40), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255,0,0), 2)
            cv2.putText(cars_frame, f'Total Cars : {car_num}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255,0,0), 2)
            cv2.imshow('frame', cars_frame)
        else:
            break
        if controlkey == ord('q'): #press q to stop frame
            break

    CarVideo.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    Simulator()