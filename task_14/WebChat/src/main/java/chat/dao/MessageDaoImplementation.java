package chat.dao;

import chat.db.ConnectionManager;
import chat.model.Message;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MessageDaoImplementation implements MessageDao {

    private static Logger logger = Logger.getLogger(MessageDaoImplementation.class.getName());

    @Override
    public void add (Message message) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = ConnectionManager.getConnection();

            preparedStatement = connection.prepareStatement("INSERT INTO users (id, name) SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS (SELECT name FROM users WHERE name = ?) LIMIT 1;");
            Random rand = new Random();
            preparedStatement.setInt(1, rand.nextInt(999999999));
            preparedStatement.setString(2, message.getAuthor());
            preparedStatement.setString(3, message.getAuthor());
            preparedStatement.executeUpdate();

            preparedStatement = connection.prepareStatement("INSERT INTO messages (id, message, date, author_id, deleted) VALUES (?, ?, ?, (SELECT id FROM users WHERE name = ?), ?);");
            preparedStatement.setString(1, message.getId());
            preparedStatement.setString(2, message.getMessage());
            preparedStatement.setString(3, message.getDate());
            preparedStatement.setString(4, message.getAuthor());
            preparedStatement.setBoolean(5, message.getDeleted());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
        }
    }

    @Override
    public void update (Message message, Boolean edited) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = ConnectionManager.getConnection();
            preparedStatement = connection.prepareStatement("Update messages SET message = ?, date = ?, deleted = ?, edited = ? WHERE id = ?");
            preparedStatement.setString(1, message.getMessage());
            preparedStatement.setString(2, message.getDate());
            preparedStatement.setBoolean(3, message.getDeleted());
            preparedStatement.setBoolean(4, edited);
            preparedStatement.setString(5, message.getId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
        }
    }

    @Override
    public void delete (Message message) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = ConnectionManager.getConnection();
            preparedStatement = connection.prepareStatement("Update messages SET deleted = ? WHERE id = ?");
            preparedStatement.setBoolean(1, message.getDeleted());
            preparedStatement.setString(2, message.getId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
        }
    }

    @Override
    public List<Message> selectAll() {
        List<Message> messages = new ArrayList<Message>();
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            connection = ConnectionManager.getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery("SELECT messages.id, messages.message, messages.date, users.name, messages.deleted, messages.edited\n" +
                    "FROM messages INNER JOIN users ON messages.author_id=users.id;");
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String author = resultSet.getString("name");
                String message = resultSet.getString("message");
                Boolean deleted = resultSet.getBoolean("deleted");
                String date = resultSet.getString("date");
                date = date.substring(0, date.length()-2);
                if (resultSet.getBoolean("edited") == true) {
                    date = "Message was edited on " + date;
                }
                messages.add(new Message(id, author, message, deleted, date, "POST"));
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
            if (statement != null) {
                try {
                    statement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }
        }
        return messages;
    }
}
