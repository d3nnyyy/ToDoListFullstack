package ua.dtsebulia.ToDoListBackend.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Integer id) {
        super("ToDoItem with id " + id + " not found");
    }
}
