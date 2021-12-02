from ..image_processor import detect as objDetect # import image processing module
from ..robot_nlp import voice_bot as nlp # import nlp module

def main():
    #Initiate image controller
    interpreter = objDetect.Interpreter('yolov4-416.tflite')
    interpreter.allocate_tensors()
    _, input_height, input_width, _ = interpreter.get_input_details()[0]['shape']

    cap = objDetect.cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        img = objDetect.cv2.resize(objDetect.cv2.cvtColor(frame, objDetect.cv2.COLOR_BGR2RGB), (320,320))
        res = objDetect.detect_objects(interpreter, img, 0.8)
        print(res)






        # reset image caputured
        if objDetect.cv2.waitKey(10) & 0xFF ==ord('q'):
            cap.release()
            #objDetect.cv2.destroyAllWindows()


if __name__ == "__main__":
    main()