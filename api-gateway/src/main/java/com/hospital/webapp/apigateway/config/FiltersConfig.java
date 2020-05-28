package com.hospital.webapp.apigateway.config;

import com.hospital.webapp.apigateway.filters.pre.SimpleLogFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FiltersConfig {
    @Bean
    public SimpleLogFilter simpleLogFilter() {
        return new SimpleLogFilter();
    }
}
