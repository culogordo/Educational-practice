package chat.util;

import chat.model.Message;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;

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

}
