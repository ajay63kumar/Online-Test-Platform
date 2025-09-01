//package com.onlinetest.OnlineTestPlatform.security;
//
//import com.onlinetest.OnlineTestPlatform.exceptions.NotFoundException;
//import com.onlinetest.OnlineTestPlatform.model.User;
//import com.onlinetest.OnlineTestPlatform.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//    @Autowired
//    private UserRepository userRepository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(username).orElseThrow(() -> new NotFoundException("User not found"));
//        return AuthUser.builder()
//                .user(user)
//                .build();
//    }
//}
package com.onlinetest.OnlineTestPlatform.security;

import com.onlinetest.OnlineTestPlatform.model.User;
import com.onlinetest.OnlineTestPlatform.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return AuthUser.builder().user(user).build();
    }
}
