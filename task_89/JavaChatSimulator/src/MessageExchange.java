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

    public String getServerResponse(List<Message> messages, int index, List<String> idDeleted, List<PUTrequest> editMessages) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", messages);
        jsonObject.put("token", getToken(index));
        jsonObject.put("deletedMessages", idDeleted);
        jsonObject.put("editMessages", editMessages);

        //System.out.println(getToken(messages.size()));
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
        //System.out.println(json);
        return getMessageFromJSONObject(json);
    }

    public String getClientMessageToDeleteId(InputStream inputStream) throws ParseException {
        JSONObject json = getJSONObject(inputStreamToString(inputStream));
        String messageToDeleteId = new String((String)json.get("id"));
        return messageToDeleteId;
    }

    public PUTrequest getClientMessageToEdit(InputStream inputStream) throws ParseException {
        JSONObject json = getJSONObject(inputStreamToString(inputStream));
        PUTrequest putRequest = new PUTrequest((String)json.get("id"), (String)json.get("message"));
        return putRequest;
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public Message getMessageFromJSONObject(JSONObject json) {
        System.out.println("sd");

        Boolean deleted = (Boolean) json.get("deleted");
        Boolean editDelete = (Boolean) json.get("editDelete");
        //Boolean deleted = Boolean.valueOf((String) json.get("deleted"));
        //System.out.println(deleted);
        //Boolean editDelete = Boolean.valueOf((String) json.get("editDelete"));
        Message message = new Message((String)json.get("id"), (String)json.get("author"), (String)json.get("message"),
                deleted, (String)json.get("date"), editDelete);
        System.out.println(message);
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
