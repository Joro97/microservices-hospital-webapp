package com.baeldung.config;

import com.baeldung.model.Authority;
import com.baeldung.model.User;
import com.baeldung.repository.AuthorityRepository;
import com.baeldung.service.HospitalUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    /*@Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public void globalUserDetails(final AuthenticationManagerBuilder auth) throws Exception {
        // @formatter:off
	auth.inMemoryAuthentication()
	  .withUser("john").password(passwordEncoder.encode("123")).roles("USER").and()
	  .withUser("tom").password(passwordEncoder.encode("111")).roles("ADMIN").and()
	  .withUser("user1").password(passwordEncoder.encode("pass")).roles("USER").and()
	  .withUser("admin").password(passwordEncoder.encode("nimda")).roles("ADMIN");
    }// @formatter:on

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
		http.authorizeRequests().antMatchers("/login").permitAll()
		.antMatchers("/oauth/token/revokeById/**").permitAll()
		.antMatchers("/tokens/**").permitAll()
		.anyRequest().authenticated()
		.and().formLogin().permitAll()
		.and().csrf().disable();
		// @formatter:on
    }*/

    private final DataSource dataSource;
    private final PasswordEncoder passwordEncoder;
    private final HospitalUserDetailsService userDetailsService;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public WebSecurityConfig(DataSource dataSource, PasswordEncoder passwordEncoder, HospitalUserDetailsService userDetailsService, AuthorityRepository authorityRepository) {
        this.dataSource = dataSource;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.authorityRepository = authorityRepository;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .authenticationProvider(authenticationProvider())
                .jdbcAuthentication()
                .dataSource(dataSource);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        List<String> roleNames = Arrays.asList("ADMIN", "DOCTOR", "USER");
        roleNames.forEach(r -> {
            if (this.authorityRepository.findByRoleName(r) == null) {
                this.authorityRepository.save(new Authority(r));
            }
        });

       final List<String> adminsNames = Arrays.asList("john");
       this.seedEntities(adminsNames, new HashSet<>(Arrays.asList(new Authority("ADMIN"))));

        final List<String> doctorsNames = Arrays.asList(
                "Gregory House", "Eric Foreman", "James Wilson",
                "Allison Cameron", "Lisa Cuddy", "Remy Hadley", "Robert Chase", "Chris Taub");
        this.seedEntities(doctorsNames, new HashSet<>(Arrays.asList(new Authority("DOCTOR"))));

        final List<String> normalUsersNames = Arrays.asList("user");
        this.seedEntities(normalUsersNames, new HashSet<>(Arrays.asList(new Authority("USER"))));

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    private void seedEntities(List<String> names, Set<Authority> authorities) {
        names.forEach(name -> {
            User user = new User(name, "123");
            if (this.userDetailsService.loadUserByUsername(name) == null) { ;
                user.setAuthorities(authorities);
                user.setEnabled(true);
                this.userDetailsService.registerUser(user);
            }
        });
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
        http.authorizeRequests().antMatchers("/login").permitAll()
                .antMatchers("/register/user").permitAll()
                .antMatchers("/oauth/token/revokeById/**").permitAll()
                .antMatchers("/tokens/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin().permitAll()
                .and().csrf().disable();
        // @formatter:on
    }
}
