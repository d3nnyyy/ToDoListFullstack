package ua.dtsebulia.ToDoListBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ToDoItem {

    @Id
    @GeneratedValue
    private Integer id;
    @NotNull
    private String title;
    private String description;
    @FutureOrPresent
    private Date deadline;
    @Min(1)
    @Max(4)
    private Integer priority;
}
