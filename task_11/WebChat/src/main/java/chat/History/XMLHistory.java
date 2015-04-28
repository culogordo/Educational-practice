package chat.History;

import chat.model.Message;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class XMLHistory {
	private static final String STORAGE_LOCATION = System.getProperty("user.home") +  File.separator + "history.xml"; // history.xml will be located in the home directory
	private static final String MESSAGES = "messages";
    private static final String MESSAGENODE = "messageNode";

    private static final String ID = "id";
    private static final String MESSAGE = "message";
    private static final String AUTHOR = "author";
    private static final String DATE = "date";
    private static final String DELETED = "deleted";
    private static final String EDITDELETE = "editDelete";
    private static final String METHODREQUEST = "methodRequest";


	private XMLHistory() {
	}

	public static synchronized void createStorage() throws ParserConfigurationException, TransformerException {
		DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

		Document doc = docBuilder.newDocument();
		Element rootElement = doc.createElement(MESSAGES);
		doc.appendChild(rootElement);

		Transformer transformer = getTransformer();

		DOMSource source = new DOMSource(doc);
		StreamResult result = new StreamResult(new File(STORAGE_LOCATION));
		transformer.transform(source, result);
	}

	public static synchronized void addData(Message message) throws ParserConfigurationException, SAXException, IOException, TransformerException {
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		Document document = documentBuilder.parse(STORAGE_LOCATION);
		document.getDocumentElement().normalize();
		
		Element root = document.getDocumentElement(); // Root <tasks> element

		Element messageElement = document.createElement(MESSAGENODE);
		root.appendChild(messageElement);

        messageElement.setAttribute(ID, message.getId());

		//Element id = document.createElement(ID);
        //id.appendChild(document.createTextNode(message.getId()));
        //messageElement.appendChild(id);

		Element messageText = document.createElement(MESSAGE);
        messageText.appendChild(document.createTextNode(message.getMessage()));
        messageElement.appendChild(messageText);

        Element author = document.createElement(AUTHOR);
        author.appendChild(document.createTextNode(message.getAuthor()));
        messageElement.appendChild(author);

        Element date = document.createElement(DATE);
        date.appendChild(document.createTextNode(message.getDate()));
        messageElement.appendChild(date);

        Element deleted = document.createElement(DELETED);
        deleted.appendChild(document.createTextNode(Boolean.toString(message.getDeleted())));
        messageElement.appendChild(deleted);

        Element editDelete = document.createElement(EDITDELETE);
        editDelete.appendChild(document.createTextNode(Boolean.toString(message.getEditDelete())));
        messageElement.appendChild(editDelete);

        Element methodRequest = document.createElement(METHODREQUEST);
        methodRequest.appendChild(document.createTextNode(message.getMethodRequest()));
        messageElement.appendChild(methodRequest);

		DOMSource source = new DOMSource(document);

		Transformer transformer = getTransformer();

		StreamResult result = new StreamResult(STORAGE_LOCATION);
		transformer.transform(source, result);
	}

	public static synchronized void updateData(Message message) throws ParserConfigurationException, SAXException, IOException, TransformerException, XPathExpressionException {
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		Document document = documentBuilder.parse(STORAGE_LOCATION);
		document.getDocumentElement().normalize();
		Node taskToUpdate = getNodeById(document, message.getId());

		if (taskToUpdate != null) {

			NodeList childNodes = taskToUpdate.getChildNodes();

			for (int i = 0; i < childNodes.getLength(); i++) {

				Node node = childNodes.item(i);

				if (MESSAGE.equals(node.getNodeName())) {
					node.setTextContent(message.getMessage());
				}

                if (AUTHOR.equals(node.getNodeName())) {
                    node.setTextContent(message.getAuthor());
                }

                if (DATE.equals(node.getNodeName())) {
                    node.setTextContent(message.getDate());
                }

                if (DELETED.equals(node.getNodeName())) {
                    node.setTextContent(Boolean.toString(message.getDeleted()));
                }

                if (EDITDELETE.equals(node.getNodeName())) {
                    node.setTextContent(Boolean.toString(message.getEditDelete()));
                }

                if (METHODREQUEST.equals(node.getNodeName())) {
                    node.setTextContent(message.getMethodRequest());
                }
			}

			Transformer transformer = getTransformer();

			DOMSource source = new DOMSource(document);
			StreamResult result = new StreamResult(new File(STORAGE_LOCATION));
			transformer.transform(source, result);
		} else {
			throw new NullPointerException();
		}
	}

	public static synchronized boolean doesStorageExist() {
		File file = new File(STORAGE_LOCATION);
		return file.exists();
	}

	public static synchronized List<Message> getMessages() throws SAXException, IOException, ParserConfigurationException {
		List<Message> messages = new ArrayList<Message>();
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		Document document = documentBuilder.parse(STORAGE_LOCATION);
		document.getDocumentElement().normalize();
		Element root = document.getDocumentElement(); // Root <messagess> element
		NodeList messageList = root.getElementsByTagName(MESSAGENODE);
		for (int i = 0; i < messageList.getLength(); i++) {
			Element messageElement = (Element) messageList.item(i);
			String id = messageElement.getAttribute(ID);
			String messageText = messageElement.getElementsByTagName(MESSAGE).item(0).getTextContent();
            String author = messageElement.getElementsByTagName(AUTHOR).item(0).getTextContent();
            String date = messageElement.getElementsByTagName(DATE).item(0).getTextContent();
			boolean deleted = Boolean.valueOf(messageElement.getElementsByTagName(DELETED).item(0).getTextContent());
            boolean editDelete = Boolean.valueOf(messageElement.getElementsByTagName(EDITDELETE).item(0).getTextContent());
            String methodRequest = messageElement.getElementsByTagName(METHODREQUEST).item(0).getTextContent();
            messages.add(new Message(id, author, messageText, deleted, date, editDelete, methodRequest));
		}
		return messages;
	}

	public static synchronized int getStorageSize() throws SAXException, IOException, ParserConfigurationException {
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		Document document = documentBuilder.parse(STORAGE_LOCATION);
		document.getDocumentElement().normalize();
		Element root = document.getDocumentElement(); // Root <messages> element
		return root.getElementsByTagName(MESSAGENODE).getLength();
	}

	private static Node getNodeById(Document doc, String id) throws XPathExpressionException {
		XPath xpath = XPathFactory.newInstance().newXPath();
		XPathExpression expr = xpath.compile("//" + MESSAGENODE + "[@id='" + id + "']");
		return (Node) expr.evaluate(doc, XPathConstants.NODE);
	}

	private static Transformer getTransformer() throws TransformerConfigurationException {
		TransformerFactory transformerFactory = TransformerFactory.newInstance();
		Transformer transformer = transformerFactory.newTransformer();
		// Formatting XML properly
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		return transformer;
	}

}
