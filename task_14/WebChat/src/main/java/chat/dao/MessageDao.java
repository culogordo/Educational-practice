package chat.dao;

import chat.model.Message;
import java.util.List;

public interface MessageDao {
    void add(Message task);

    void update(Message message, Boolean edited);

    List<Message> selectAll();

}
