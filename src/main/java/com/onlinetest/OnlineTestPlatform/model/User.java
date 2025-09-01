package com.onlinetest.OnlineTestPlatform.model;

import com.onlinetest.OnlineTestPlatform.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Getter
@Setter
@Builder
public class User {
    @Column(name = "created_at")
    private final LocalDateTime createAt = LocalDateTime.now();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
   private String name;
    @Column(unique = true)
    @NotBlank(message = "Email is required")
     private String email;
    @NotBlank(message = "Password is required")
    private String password;
//    @NotBlank(message = "PhoneNumber is required")
//    @Column(name = "phone_number")
//    private String phoneNumber;
@Enumerated(EnumType.STRING)
@Column(name = "role", nullable = false, length = 20)
private UserRole role;

//    @Enumerated(EnumType.STRING)
//    private UserRole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserTest> testsTaken = new HashSet<>();



    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", createAt=" + createAt +
                '}';
    }
}
