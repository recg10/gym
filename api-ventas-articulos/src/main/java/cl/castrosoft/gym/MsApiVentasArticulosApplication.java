package cl.castrosoft.gym;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.TimeZone;

@SpringBootApplication
public class MsApiVentasArticulosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsApiVentasArticulosApplication.class, args);
	}

	@PostConstruct
	public void init(){
		System.out.println(LocalDateTime.now());
		TimeZone.setDefault(TimeZone.getTimeZone("America/Santiago"));
		System.out.println(LocalDateTime.now());
	}


}
