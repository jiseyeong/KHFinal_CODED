package kh.coded;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CodedApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodedApplication.class, args);
	}

}
