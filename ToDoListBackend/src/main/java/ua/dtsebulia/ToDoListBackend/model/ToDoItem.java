package ua.dtsebulia.ToDoListBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ToDoItem {

    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String description;
    private LocalDate deadline;
    private LocalDate completedDate;
    @Min(1)
    @Max(4)
    private Integer priority;
    private Boolean done = false;
}
