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

    @PostMapping
    public ToDoItem createToDoItem(@RequestBody ToDoItem newToDoItem) {
        return repository.save(newToDoItem);
    }

    @PutMapping("{id}")
    public ToDoItem updateToDoItem(@PathVariable Integer id, @RequestBody ToDoItem updatedToDoItem) {
        return repository.findById(id)
                .map(toDoItem -> {
                    toDoItem.setTitle(updatedToDoItem.getTitle());
                    toDoItem.setDescription(updatedToDoItem.getDescription());
                    toDoItem.setDeadline(updatedToDoItem.getDeadline());
                    toDoItem.setPriority(updatedToDoItem.getPriority());
                    return repository.save(toDoItem);
                }).orElseThrow(
                        () -> new ItemNotFoundException(id)
                );
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
