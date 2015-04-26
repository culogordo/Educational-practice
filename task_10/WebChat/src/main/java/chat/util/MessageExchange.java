package chat.util;

import chat.model.Message;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MessageExchange {
    public static final String TOKEN = "token";
    public static final String TN = "TN";
    public static final String EN = "EN";

    public MessageExchange() {
    }

    public static String getToken(int index) {
        Integer number = index * 8 + 11;
        return TN + number + EN;
    }

    public static int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<Message> messages, int index) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", messages);
        jsonObject.put("token", getToken(index));
        return jsonObject.toJSONString();
    }

    public Message getClientMessage(InputStream inputStream) throws ParseException {
        JSONObject json = getJSONObject(inputStreamToString(inputStream));
        return getMessageFromJSONObject(json);
    }

    public static JSONObject getJSONObject(String json) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public static String html2text(String html) {
        Double change = Math.random();
        html = html.replaceAll("\n", change.toString());
        html = (Jsoup.parse(html).text());
        html = html.replaceAll(change.toString(), "\n");
        if (Jsoup.parse(html).text().equals("")) {
            html = "<h3>This user trying to break application!</h3>";
        }
        return html;
    }

    public static Message getMessageFromJSONObject(JSONObject json) {
        Boolean deleted = (Boolean) json.get("deleted");
        Boolean editDelete = (Boolean) json.get("editDelete");
        Message message = new Message((String)json.get("id"), (String)json.get("author"), html2text((String)json.get("message")),
                deleted, (String)json.get("date"), editDelete, (String)json.get("methodRequest"));
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
