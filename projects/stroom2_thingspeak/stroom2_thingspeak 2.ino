
#include <ESP8266WiFi.h>


// replace with your channel’s thingspeak API key,
String apiKey = "QAAJBUFFNSKXB349";

const char* ssid = "E-space_nomap";
const char* password = "Joshua1999Home!@";
//const char* ssid = "Lisa";
//const char* password = "sayLISA1993";
const char* server = "api.thingspeak.com";

int sensorPin = A0; // select the input pin for the potentiometer
int ButtonPin = D0; // select the input pin for the potentiometer
int ledPin = 13; // select the pin for the LED
int sensorValue = 0; // variable to store the value coming from the sensor
int buttonValue = 0;

WiFiClient client;
//AltSoftSerial altSerial;
void setup () 
{
  pinMode (ledPin, OUTPUT);
  Serial.begin (9600);
  WiFi.begin(ssid, password);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
}

void loop() {

   sensorValue = analogRead (sensorPin);
   buttonValue = digitalRead(ButtonPin);

if (client.connect(server,80)) { // "184.106.153.149" or api.thingspeak.com
  String postStr = apiKey;
  postStr +="&field1=";
  postStr += String(sensorValue);
  postStr +="&field2=";
  postStr += String(buttonValue);
  postStr += "\r\n\r\n";

client.print("POST /update HTTP/1.1\n");
client.print("Host: api.thingspeak.com\n");
client.print("Connection: close\n");
client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
client.print("Content-Type: application/x-www-form-urlencoded\n");
client.print("Content-Length: ");
client.print(postStr.length());
client.print("\n\n");
client.print(postStr);

Serial.print("Temperature: ");
Serial.print(postStr);
Serial.println("% send to Thingspeak");

}
  client.stop();

  Serial.println("Waiting…");
  // thingspeak needs minimum 15 sec delay between updates
  delay(20000);
}
