package chat.controller;

import chat.model.Message;
import chat.util.ServletUtil;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static chat.util.MessageExchange.*;


@WebServlet("/chat")
public class Server extends HttpServlet {
    private List<Message> history = new ArrayList<Message>();

    private static Logger logger = Logger.getLogger(Server.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //logger.info("doGet");
        String token = request.getParameter(TOKEN);
        //logger.info("Token " + token);

        if (token != null && !"".equals(token)) {
            int index = getIndex(token);
            //logger.info("Index " + index);
            String messages = getServerResponse(history.subList(index, history.size()), history.size());
            response.setContentType(ServletUtil.APPLICATION_JSON);
            PrintWriter out = response.getWriter();
            out.print(messages);
            out.flush();
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "'token' parameter needed");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //logger.info("doPost");
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMessage() + " " + message.getMethodRequest());
            message.setDate(getCurrentDate());
            history.add(message);
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //logger.info("doDelete");
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMessage() + " " + message.getMethodRequest());
            int deleteIndex = 0;
            for (int i = 0; i < history.size(); ++i) {
                if (history.get(i).getId().equals(message.getId())) {
                    deleteIndex = i;
                }
            }

            Message deleteMessage = history.get(deleteIndex);
            if (deleteMessage != null) {
                deleteMessage.setDeleted(true);
                history.set(deleteIndex, deleteMessage);
                history.add(message);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Task does not exist");
            }
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //logger.info("doPut");
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMessage() + " " + message.getMethodRequest());
            int editIndex = 0;
            for (int i = 0; i < history.size(); ++i) {
                if (history.get(i).getId().equals(message.getId())) {
                    editIndex = i;
                }
            }

            Message editMessage = history.get(editIndex);
            if (editMessage != null) {
                editMessage.setMessage(message.getMessage());
                editMessage.setDate("Message was edited on " + getCurrentDate());
                message.setDate("Message was edited on " + getCurrentDate());
                history.set(editIndex, editMessage);
                history.add(message);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Task does not exist");
            }
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @SuppressWarnings("unchecked")
    private String getServerResponse(List<Message> messages, int index) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", messages);
        jsonObject.put(TOKEN, getToken(index));
        return jsonObject.toJSONString();
    }

    private String getCurrentDate ()  {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        Date date = new Date();
        return (dateFormat.format(date));
    }
}