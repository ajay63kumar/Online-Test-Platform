package com.onlinetest.OnlineTestPlatform.model;

import com.onlinetest.OnlineTestPlatform.enums.Status;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tests")
@Getter
@Setter
@Builder
public class Test {
    @Column(name = "created_at")
    private final LocalDateTime createAt = LocalDateTime.now();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private List<Question> questions;

//    @ManyToMany(mappedBy = "testsTaken" )
//    private Set<User> users = new HashSet<>();

@OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
private Set<UserTest> usersTaken = new HashSet<>();

    @Column(name = "duration_min", nullable = false)
    private Integer durationMin;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;


    public void setCreatedAt(LocalDateTime now) {
    }
}
