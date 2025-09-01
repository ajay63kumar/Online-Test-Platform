package com.onlinetest.OnlineTestPlatform;

import com.onlinetest.OnlineTestPlatform.enums.UserRole;
import com.onlinetest.OnlineTestPlatform.model.User;

import com.onlinetest.OnlineTestPlatform.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class OnlineTestPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineTestPlatformApplication.class, args);
		System.out.println("-------------------------------------------");
		System.out.println("Test start now! You have only 40 minutes 🚀");
		System.out.println("-------------------------------------------");
	}

	@Bean
	public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
				User admin = User.builder()
						.name("admin")
						.email("admin@gmail.com")
						.password(passwordEncoder.encode("admin123"))
						.role(UserRole.ADMIN)
						.build();
				userRepository.save(admin);
				System.out.println("✅ Default Admin created: admin@system.com / admin123");
			}

			if (userRepository.findByRole(UserRole.TEACHER).isEmpty()) {
				User teacher = User.builder()
						.name("adam")
						.email("adam@gmail.com")
						.password(passwordEncoder.encode("adam123"))
						.role(UserRole.TEACHER)
						.build();
				userRepository.save(teacher);
				System.out.println("✅ Default Admin created: adam@system.com / adam123");
			}
		};
	}
}
