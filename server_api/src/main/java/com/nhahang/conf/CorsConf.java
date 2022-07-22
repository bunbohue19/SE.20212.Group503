package com.nhahang.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConf {
	@Bean
	public WebMvcConfigurer cors() {
		return new WebMvcConfigurer() {
			@Override 
			public void addCorsMappings(CorsRegistry r)
			{
				r.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedHeaders("*")
				.allowedOrigins("*");
			}
		};
	}
}
