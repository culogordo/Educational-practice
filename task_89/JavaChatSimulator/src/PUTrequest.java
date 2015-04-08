public class PUTrequest {
    private String id;
    private String message;
    //private String date;

    public PUTrequest(String id, String message) {
        this.id = id;
        this.message = message;
    }

    public PUTrequest () {

    }

    public String getId() {
        return this.id;
    }

    public void setId(String value) {
        this.id = value;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String value) {
        this.message = value;
    }

    public String toString() {
        return "{\"id\":\"" + this.id + "\",\"message\":" +  "\"" + this.message + "\"" +"}";
    }
}
