#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#include <WebSocketsClient_Generic.h>
#include <SocketIOclient_Generic.h>
#include <ArduinoJson.h>
#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

IPAddress serverIP(192, 168, 2, 7);
uint16_t serverPort = 7000;

const char* init_ssid = "Duc Co_2.4G";
const char* init_password = "nthd29091997";

const String baseURL = "http://192.168.2.7:7000/";
const String apiSendData = "data?statId=1";

const int delayTime = 3000;
unsigned long messageTimestamp = 0;

//SOCKET: EVENT NAME
const char* CHANGE_WIFI = "CHANGE_WIFI";
const char* GET_CROP = "GET_CROP";
const char* START_SOCKET = "START_SOCKET_FROM_BACKEND";

bool isRunningSocket = false;

String crop_id = "";

void setup() {
  Serial.begin(9600);

  while (!Serial)
    ;

  connectToWifi(init_ssid, init_password);

  socketIO.setReconnectInterval(10000);
  socketIO.begin(serverIP, serverPort);
  socketIO.onEvent(socketIOEvent);
  delay(200);
  sendDataSocket("START_TRACKING_ARDUINO", { "isConnect" }, { "true" });
}

void loop() {
  socketIO.loop();
  uint64_t now = millis();

  if (now - messageTimestamp > delayTime) {
    messageTimestamp = now;

    if (isRunningSocket == false) {
      Serial.println("Socket connection lost. Reconnecting...");
      sendDataSocket("START_TRACKING_ARDUINO", { "isConnect" }, { "true" });
    } else {
      if (WiFi.status() == WL_CONNECTED) {
        String data = Serial.readStringUntil('\n');

        // Remove any leading/trailing whitespace
        data.trim();

        WiFiClient wifiClient;
        HTTPClient http;
        http.begin(wifiClient, (baseURL + apiSendData).c_str());
        http.addHeader("Content-Type", "application/json");

        if (crop_id != "") {
          if (data.length() > 0) {
            //Call api
            int httpResponseCode = http.sendRequest("POST", "{\"statId\":\"1\",\"num_stat\":\"" + data + "\"}");
            if (httpResponseCode > 0) {
              sendDataSocket("RECEIVE_DATA_FROM_ARDUINO", { "Temp", "cropId" }, { data, crop_id });
              String response = http.getString();
              Serial.println("API Response: " + response);
            } else {
              Serial.print("Error in sending data to API. Error code: ");
              Serial.println(httpResponseCode);
            }
          }
        }

      } else {
        Serial.println("WiFi connection lost. Reconnecting...");
        WiFi.reconnect();
      }
    }
  }
}

void sendDataSocket(const char* eventName, const std::vector<String>& keys, const std::vector<String>& values) {
  if (eventName && keys.size() == values.size()) {
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    array.add(eventName);
    for (int i = 0; i < keys.size(); i++) {
      JsonObject param = array.createNestedObject();
      param[keys[i]] = values[i];
      delay(10);
    }

    String output;
    serializeJson(doc, output);
    // Send event
    socketIO.sendEVENT(output);
  }
}

void connectToWifi(const char* ssid, const char* password) {
  if (WiFi.getMode() & WIFI_AP) {
    WiFi.softAPdisconnect(true);
  }

  WiFiMulti.addAP(ssid, password);

  //WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi...");
    delay(100);
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: " + WiFi.localIP().toString());
  Serial.println("Server started");
}

void socketIOEvent(const socketIOmessageType_t& type, uint8_t* payload, const size_t& length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.println("[IOc] Disconnected");
      isRunningSocket = false;
      break;

    case sIOtype_CONNECT:
      Serial.print("[IOc] Connected to url: ");
      Serial.println(length);
      Serial.println((char*)payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");

      break;

    case sIOtype_EVENT:
      {
        char* jsonString = nullptr;
        char* eventString = nullptr;
        const char* delimiter = ",";

        Serial.println("[IOc] Get event: ");
        eventString = reinterpret_cast<char*>(payload);

        if (eventString[0] == '[' && eventString[length - 1] == ']') {
          eventString[length - 1] = '\0';
          eventString++;
        }

        // Convert eventString to an array separated by spaces
        char** eventArray = nullptr;
        int eventCount = 0;

        // Tokenize the eventString
        char* token = strtok(eventString, delimiter);
        while (token != nullptr) {
          // Remove quotation marks from each element
          if (token[0] == '"' && token[strlen(token) - 1] == '"') {
            token[strlen(token) - 1] = '\0';
            token++;
          }

          eventArray = (char**)realloc(eventArray, (eventCount + 1) * sizeof(char*));
          eventArray[eventCount] = token;
          eventCount++;
          token = strtok(nullptr, delimiter);
        }

        Serial.println(eventArray[1]);
        if (strcmp(eventArray[1], START_SOCKET) == 0) {
          if (!isRunningSocket) {
            isRunningSocket = true;
          }
        }

        if (strcmp(eventArray[1], CHANGE_WIFI) == 0) {
          const char* ssid = eventArray[2];
          const char* password = eventArray[3];
          delay(200);
          connectToWifi(ssid, password);
        }

        if (strcmp(eventArray[1], GET_CROP) == 0) {
          crop_id = eventArray[2];
        }

        if (!isRunningSocket) {
          isRunningSocket = true;
        }

        // Free the dynamically allocated memory
        free(eventArray);
        Serial.println(isRunningSocket);

        break;
      }

    case sIOtype_ACK:
      Serial.print("[IOc] Get ack: ");
      Serial.println(length);

      hexdump(payload, length);
      break;

    case sIOtype_ERROR:
      Serial.print("[IOc] Get error: ");
      Serial.println(length);

      hexdump(payload, length);
      break;

    case sIOtype_BINARY_EVENT:
      Serial.print("[IOc] Get binary: ");
      Serial.println(length);

      hexdump(payload, length);
      break;

    case sIOtype_BINARY_ACK:
      Serial.print("[IOc] Get binary ack: ");
      Serial.println(length);

      hexdump(payload, length);
      break;

    case sIOtype_PING:
      Serial.println("[IOc] Get PING");

      break;

    case sIOtype_PONG:
      Serial.println("[IOc] Get PONG");

      break;

    default:
      break;
  }
}
