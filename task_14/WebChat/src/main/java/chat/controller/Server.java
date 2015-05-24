package chat.controller;

import chat.History.XMLHistory;
import chat.dao.MessageDao;
import chat.dao.MessageDaoImplementation;
import chat.model.Message;
import chat.util.ServletUtil;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.xml.sax.SAXException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static chat.util.MessageExchange.*;


@WebServlet("/chat")
public class Server extends HttpServlet {

    private static Logger logger = Logger.getLogger(Server.class);
    private MessageDao messageDao;

    @Override
    public void init() throws ServletException {
        try {
            this.messageDao = new MessageDaoImplementation();
            List<Message> history = messageDao.selectAll();
            XMLHistory.createStorage();

            for (int i = 0; i < history.size(); ++i) {
                XMLHistory.addData(history.get(i));
                logger.info(history.get(i).getAuthor() + " " + history.get(i).getMethodRequest());
            }
        } catch (ParserConfigurationException e) {
            logger.error(e);
        } catch (TransformerException e) {
            logger.error(e);
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("doGet");
        String token = request.getParameter(TOKEN);

        if (token != null && !"".equals(token)) {
            int index = getIndex(token);
            String messages = null;
            try {
                if (index == XMLHistory.getStorageSize()) {
                    response.setStatus(304);
                } else {
                    messages = getServerResponse(XMLHistory.getMessages(index), XMLHistory.getStorageSize());
                }
            } catch (SAXException e) {
                e.printStackTrace();
            } catch (ParserConfigurationException e) {
                e.printStackTrace();
            }
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
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMethodRequest());
            message.setDate(getCurrentDate());
            XMLHistory.addData(message);
            response.setStatus(HttpServletResponse.SC_OK);
            messageDao.add(message);
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (ParserConfigurationException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (SAXException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (TransformerException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMethodRequest());

            if (message != null) {
                XMLHistory.updateData(message);
                XMLHistory.addData(message);
                response.setStatus(HttpServletResponse.SC_OK);
                messageDao.delete(message);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Task does not exist");
            }
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (ParserConfigurationException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (SAXException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (TransformerException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (XPathExpressionException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = ServletUtil.getMessageBody(request);
        try {
            JSONObject json = getJSONObject(data);
            Message message = getMessageFromJSONObject(json);
            logger.info(message.getAuthor() + " " + message.getMethodRequest());

            if (message != null) {
                message.setDate(getCurrentDate());
                messageDao.update(message, true);
                message.setDate("Message was edited on " + message.getDate());
                XMLHistory.updateData(message);
                XMLHistory.addData(message);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Message does not exist");
            }
        } catch (ParseException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (ParserConfigurationException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (SAXException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (TransformerException e) {
            logger.error(e);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (XPathExpressionException e) {
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
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        return (dateFormat.format(date));
    }
}