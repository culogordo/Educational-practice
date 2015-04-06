public class Message {
    private String id;
    private String author;
    private String message;
    private Boolean deleted;
    private String date;
    private Boolean editDelete;

    public Message(String id, String author, String message, Boolean deleted, String date, Boolean editDelete) {
        this.id = id;
        this.author = author;
        this.message = message;
        this.deleted = deleted;
        this.date = date;
        this.editDelete = editDelete;
    }

    public Message() {

    }

    public String getId() {
        return this.id;
    }

    public void setId(String value) {
        this.id = value;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String value) {
        this.author = value;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String value) {
        this.message = value;
    }

    public boolean getDeleted() {
        return this.deleted;
    }
    public void setDeleted(boolean value) {
        this.deleted = value;
    }

    public String getDate() {
        return this.date;
    }
    public void setDate(String value) {
        this.id = date;
    }

    public boolean getEditDelete() {
        return this.editDelete;
    }
    public void setEditDelete(boolean value) {
        this.editDelete = value;
    }

    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"author\":\"" + this.author + "\",\"message\":" +  "\"" + this.message +
                "\",\"deleted\":" +  "\"" + this.deleted + "\",\"date\":" + "\"" + this.date + "\",\"editDelete\":" + "\"" + this.editDelete + "\"" +"}";
    }
}

