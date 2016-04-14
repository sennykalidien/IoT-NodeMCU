#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

const char* ssid     = "SennyK";
const char* password = "27031990!";

const char* host     = "iot.dolstra.me"; // Your domain
String path          = "/api/status/matthias";
const int httpPort   = 80;

//sensores
const int ledPin     = D0;
const int ButtonPin  = D1;
const int soundPin   = D2;
const int lightPin   = A0;

int buttonValue      = 0;
int soundValue       = 0;
int lightValue       = 0;

WiFiClient client;

void setup() {
  //set pins
  pinMode(ButtonPin, INPUT);
  pinMode(soundPin, INPUT);
  pinMode(lightPin, INPUT);

  pinMode(ledPin, OUTPUT);
  pinMode(ledPin, HIGH);

  //set serial
  Serial.begin(9600);

  //set wifi
  delay(10);
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  int wifi_ctr = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  //show when wifi is connected
  Serial.println("WiFi connected");
  Serial.println("IP address: " + WiFi.localIP());
}

void loop() {
  buttonValue = digitalRead(ButtonPin);
  soundValue = digitalRead(soundPin);
  lightValue = analogRead(lightPin);


  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  getNetworkData();

  delay(2000);

  sendNetworkData();

}


void getNetworkData() {
  client.print(String("GET ") + path + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: keep-alive\r\n\r\n");

  delay(500); // wait for server to respond

  // read response
  String section = "header";
  while (client.available()) {
    String line = client.readStringUntil('\r');
    // Serial.print(line);
    // we’ll parse the HTML body here
    if (section == "header") { // headers..
      //Serial.print(".");
      if (line == "\n") { // skips the empty space at the beginning
        section = "json";
      }
    }
    else if (section == "json") { // print the good stuff
      section = "ignore";
      String result = line.substring(1);

      // Parse JSON
      int size = result.length() + 1;
      char json[size];
      result.toCharArray(json, size);
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& json_parsed = jsonBuffer.parseObject(json);
      if (!json_parsed.success())
      {
        Serial.println("parseObject() failed");
        return;
      }

      // Make the decision to turn off or on the LED
      if (strcmp(json_parsed["light"], "true") == 0) {
        digitalWrite(ledPin, HIGH);
        //Serial.println("LED ON");
      }
      else {
        digitalWrite(ledPin, LOW);
        // Serial.println("led off");
      }
    }
  }
  //Serial.print("closing connection. ");
}


void sendNetworkData() {

  if (client.connect(host, httpPort)) {
    String postStr = "matthiasValue1=";
    postStr += String(soundValue);
    postStr += "&matthiasValue2=";
    postStr += String(lightValue);
    postStr += "&senny=";

    if (buttonValue == 1) {
      postStr += "true";
    } else {
      postStr += "false";
    }

    Serial.println(soundValue);
    Serial.println(lightValue);

    client.println("POST /api HTTP/1.1");
    client.println("Host: " + String(host));
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println("Connection: close");
    client.print("Content-Length: ");
    client.println(postStr.length());
    client.println();
    client.print(postStr);
    client.println();
    Serial.println("Data send");

  }
}

