public class    Message {
    private String id;
    private String author;
    private String message;
    private Boolean deleted;
    private String date;
    private Boolean editDelete;
    private String methodRequest;

    public Message(String id, String author, String message, Boolean deleted, String date, Boolean editDelete, String methodRequest) {
        this.id = id;
        this.author = author;
        this.message = message;
        this.deleted = deleted;
        this.date = date;
        this.editDelete = editDelete;
        this.methodRequest = methodRequest;
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

    public Boolean getDeleted() {
        return this.deleted;
    }
    public void setDeleted(Boolean value) {
        this.deleted = value;
    }

    public String getDate() {
        return this.date;
    }
    public void setDate(String value) {
        this.date = value;
    }

    public Boolean getEditDelete() {
        return this.editDelete;
    }
    public void setEditDelete(Boolean value) {
        this.editDelete = value;
    }

    public String getMethodRequest() {
        return this.methodRequest;
    }
    public void setMethodRequest(String value) {
        this.methodRequest = value;
    }

    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"author\":\"" + this.author + "\",\"message\":" +  "\"" + this.message +
                "\",\"deleted\":" +  "\"" + this.deleted + "\",\"date\":" + "\"" + this.date +
                "\",\"editDelete\":" + "\"" + this.editDelete + "\",\"methodRequest\":" + "\"" + this.methodRequest + "\"" + "}";
    }
}

