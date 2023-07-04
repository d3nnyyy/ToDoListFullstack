package ua.dtsebulia.ToDoListBackend.controller;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ua.dtsebulia.ToDoListBackend.repository.ToDoItemRepository;

import java.time.LocalDate;

@Component
public class TaskCleanupScheduler {

    private final ToDoItemRepository repository;

    public TaskCleanupScheduler(ToDoItemRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    @Transactional
    public void performInitialCleanup() {
        LocalDate oneDayAgo = LocalDate.now().minusDays(1);
        repository.deleteByDoneAndCompletedDateBefore(true, oneDayAgo);
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteCompletedTasksOlderThanOneDay() {
        LocalDate oneDayAgo = LocalDate.now().minusDays(1);
        repository.deleteByDoneAndCompletedDateBefore(true, oneDayAgo);
    }
}

