package com.onlinetest.OnlineTestPlatform.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subjects")
@Getter
@Setter
@Builder
public class Subject {
    @Column(name = "created_at")
    private final LocalDateTime createAt = LocalDateTime.now();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "subject is required")
    private String subject;

    @OneToMany(mappedBy = "subject",cascade = CascadeType.ALL)
    private List<Test> tests;

}
