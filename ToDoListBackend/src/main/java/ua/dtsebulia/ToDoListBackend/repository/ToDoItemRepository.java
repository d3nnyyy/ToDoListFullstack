package ua.dtsebulia.ToDoListBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.dtsebulia.ToDoListBackend.model.ToDoItem;

import java.time.LocalDate;
import java.util.List;
public interface ToDoItemRepository extends JpaRepository<ToDoItem, Integer> {
    List<ToDoItem> findItemsByDeadline(LocalDate today);
    List<ToDoItem> findItemsByDoneAndCompletedDate(boolean b, LocalDate today);
}
