#include <EIoTCloudRestApi.h>
#include <EIoTCloudRestApiConfig.h>

int sensorPin = A0; // select the input pin for the potentiometer
int buttonPin = D0; // select the input pin for the potentiometer
int ledPin = 13; // select the pin for the LED
int sensorValue = 0; // variable to store the value coming from the sensor
int buttonValue = 0;

EIoTCloudRestApi eiotcloud;

//setuop the node
void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  eiotcloud.begin();
}

void loop()
{
  //read the sensor value
  sensorValue = analogRead(sensorPin);
  buttonValue = analogRead(buttonPin);
  digitalWrite(ledPin, HIGH); //turn the led on
  delay(sensorValue); //delay the led
  digitalWrite(ledPin, LOW); //turn the led off
  delay(sensorValue);

  Serial.println(sensorValue, DEC);

  //send the sensor value to the eito cloud
  eiotcloud.sendParameter(EIOT_CLOUD_INSTANCE_PARAM_ID, sensorValue);
  eiotcloud.sendParameter(EIOT_CLOUD_INSTANCE_PARAM_IDD, buttonValue);
}
