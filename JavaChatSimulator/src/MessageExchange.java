import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.List;

public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<Message> messages) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", messages);
        jsonObject.put("token", getToken(messages.size()));
        return jsonObject.toJSONString();
    }

    public String getClientSendMessageRequest(Message message) {
        //JSONObject jsonObject = new JSONObject();
        //jsonObject.put("message", message);
        //return jsonObject.toJSONString();
        return message.toString();
    }

    public Message getClientMessage(InputStream inputStream) throws ParseException {
        //return (String) getJSONObject(inputStreamToString(inputStream)).get("message");
        JSONObject json = getJSONObject(inputStreamToString(inputStream));
        return getMessageFromJSONObject(json);
    }

    public String getClientMessageToDeleteId(InputStream inputStream) throws ParseException {
        JSONObject json = getJSONObject(inputStreamToString(inputStream));
        String messageToDeleteId = new String((String)json.get("id"));
        return messageToDeleteId;
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public Message getMessageFromJSONObject(JSONObject json) {
        Boolean deleted = Boolean.valueOf((String) json.get("deleted"));
        Boolean editDelete = Boolean.valueOf((String) json.get("editDelete"));
        Message message = new Message((String)json.get("id"), (String)json.get("author"), (String)json.get("message"),
                deleted, (String)json.get("date"), editDelete);
        return message;
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[2048];
        int length = 0;
        try {
            while ((length = in.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new String(baos.toByteArray());
    }
}
