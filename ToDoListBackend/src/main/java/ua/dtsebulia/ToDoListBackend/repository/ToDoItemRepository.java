package ua.dtsebulia.ToDoListBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.dtsebulia.ToDoListBackend.model.ToDoItem;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Integer> {
}
