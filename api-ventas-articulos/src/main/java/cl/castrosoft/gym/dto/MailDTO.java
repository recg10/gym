package cl.castrosoft.gym.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailDTO {
    String to;
    String subject;
    String body;
}
