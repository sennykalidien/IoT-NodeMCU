#include <ESP8266WiFi.h>

  // replace with your channel’s thingspeak API key,
String apiKey = "QAAJBUFFNSKXB349";
const char* ssid = "";
const char* password = "";
const char* server = "iot.dolstra.me";

int ButtonPin = D1; // select the input pin for the potentiometer
int ledPin = D0; // select the pin for the LED
int buttonValue = 0;

WiFiClient client;

void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);

  WiFi.begin(ssid, password);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
}

void loop()
{
  buttonValue = digitalRead(ButtonPin);
  digitalWrite(ledPin, HIGH);
  
  if (client.connect(server, 80)) {
    String postStr = "&matthias=";
    postStr += String(buttonValue);
    postStr += "\r\n\r\n";

    client.print("POST /update HTTP/1.1\n");
    client.print("Host: iot.dolstra.me\n");
    client.print("Connection: close\n");
    client.print("Content-Type: application/x-www-form-urlencoded\n");
    client.print("Content-Length: ");
    client.print(postStr.length());
    client.print("\n\n");
    client.print(postStr);

    Serial.print(buttonValue, DEC);
    Serial.println(" send to iot.dolstra.me");
  }

  client.stop();

  Serial.println("Waiting…");
  // thingspeak needs minimum 15 sec delay between updates
  delay(2000);
}
