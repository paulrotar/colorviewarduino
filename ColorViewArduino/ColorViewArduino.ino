#include <Wire.h>
#include "Adafruit_TCS34725.h"

// Analog outputs
#define redpin 3
#define greenpin 6
#define bluepin 5
int pushButton = 2;

// set to false if using a common cathode LED
#define commonAnode true

// Our RGB -> eye-recognized gamma color
byte gammatable[256];


Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);

void setup() {
  Serial.begin(9600);
// Checking connection between arduino and sensor
  if (tcs.begin()) {
    
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1); // halt!
  }
  
  //Three pins to drive an LED
  pinMode(redpin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  //Pin to control the button
  pinMode(pushButton, INPUT);
 
  //This helps convert RGB colors to what humans see
  for (int i=0; i<256; i++) {
    float x = i;
    x /= 255;
    x = pow(x, 2.5);
    x *= 255;
      
    if (commonAnode) {
      gammatable[i] = 255 - x;
    } else {
      gammatable[i] = x;      
    }
    //Serial.println(gammatable[i]);
  }
}


void loop() {
  uint16_t clear, red, green, blue;
  int buttonState = digitalRead(pushButton);
  tcs.setInterrupt(false);      // turn on LED

  delay(60);  // takes 50ms to read 
  
  tcs.getRawData(&red, &green, &blue, &clear);

  tcs.setInterrupt(true);  // turn off LED
  // When pressing the button, the sensor captures the color code and sends to RGB LED
  if( buttonState == HIGH ) {
    //Sending RGB values to LED
  digitalWrite(redpin, gammatable[(int)red]);
  digitalWrite(greenpin, gammatable[(int)green]);
  digitalWrite(bluepin, gammatable[(int)blue]); 

  // Figure out some basic hex code for visualization
  uint32_t sum = clear;
  float r, g, b;
  r = red; r /= sum;
  g = green; g /= sum;
  b = blue; b /= sum;
  r *= 256; g *= 256; b *= 256;
  Serial.print((int)r, HEX); Serial.print((int)g, HEX); Serial.print((int)b, HEX);
  Serial.println();

 }else{
      //Else do nothing. Waiting for the next scan while the RGB light is still on with our last color.
  }
}

