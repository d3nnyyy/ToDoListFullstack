package ua.dtsebulia.ToDoListBackend.controller;

import org.springframework.web.bind.annotation.*;
import ua.dtsebulia.ToDoListBackend.exception.ItemNotFoundException;
import ua.dtsebulia.ToDoListBackend.model.ToDoItem;
import ua.dtsebulia.ToDoListBackend.repository.ToDoItemRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:3000")
public class ToDoItemController {

    private final ToDoItemRepository repository;

    public ToDoItemController(ToDoItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ToDoItem> getAllToDoItems() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public ToDoItem getToDoItemById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new ItemNotFoundException(id)
        );
    }

    @GetMapping("/today")
    public List<ToDoItem> getToDoItemsWithDeadlineToday() {
        LocalDate today = LocalDate.now();
        return repository.findItemsByDeadline(today);
    }

    @GetMapping("/done-today")
    public List<ToDoItem> getToDoItemsDoneToday() {
        LocalDate today = LocalDate.now();
        return repository.findItemsByDoneAndCompletedDate(true, today);
    }

    @PostMapping
    public ToDoItem createToDoItem(@RequestBody ToDoItem newToDoItem) {
        return repository.save(newToDoItem);
    }

    @PutMapping("{id}")
    public ToDoItem updateToDoItem(@PathVariable Integer id, @RequestBody ToDoItem updatedToDoItem) {
        return repository.findById(id)
                .map(toDoItem -> {
                    if (updatedToDoItem.getTitle() != null) {
                        toDoItem.setTitle(updatedToDoItem.getTitle());
                    }
                    if (updatedToDoItem.getDescription() != null) {
                        toDoItem.setDescription(updatedToDoItem.getDescription());
                    }
                    if (updatedToDoItem.getDeadline() != null) {
                        toDoItem.setDeadline(updatedToDoItem.getDeadline());
                    }
                    if (updatedToDoItem.getPriority() != null) {
                        toDoItem.setPriority(updatedToDoItem.getPriority());
                    }
                    if (updatedToDoItem.getDone() != null) {
                        toDoItem.setDone(updatedToDoItem.getDone());
                    }
                    if (updatedToDoItem.getCompletedDate() != null) {
                        toDoItem.setCompletedDate(updatedToDoItem.getCompletedDate());
                    }
                    return repository.save(toDoItem);
                }).orElseThrow(() -> new ItemNotFoundException(id));
    }


    @DeleteMapping("{id}")
    public String deleteToDoItem(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            throw new ItemNotFoundException(id);
        }
        repository.deleteById(id);
        return String.format("Item with id %s has been deleted", id);
    }
}
