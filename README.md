# RobotDeliverySystem
Capstone project

## Running Object detection on raspberry pi

**Step 1** Clone the current repository to raspberry pi from terminal 
```
 git clone https://github.com/SantiagoCely/RobotDeliverySystem.git 
```

**Step 2** Install all dependencies from terminal 
```
  pip3 install opencv-python
  sudo apt-get install libcblas-dev
  sudo apt-get install libhdf5-dev
  sudo apt-get install libhdf5-serial-dev 
  sudo apt-get install libatlas-base-dev
  sudo apt-get install libjasper-dev 
  sudo apt-get install libqtgui4
  sudo apt-get install libqt4-testv
  echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
  sudo apt-get update ; sudo apt-get install python3-tflite-runtime 
  ```
  
  **Step 3** Run 
  
  ```
  python3 detect.py 
  ```
  


