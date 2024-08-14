package com.ssafy.back_end.oauth.domain;

import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
@Table(name = "oauth_member",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "oauth_id_unique",
                        columnNames = {
                                "oauth_server_id",
                                "oauth_server"
                        }
                ),
        }
)
public class OauthMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private OauthId oauthId;

    private String nickname;

    @Setter
    @Getter
    private String email;

    private boolean isSign;

    @Setter
    @Getter
    private Integer userId;

    // Getters and Setters
    public Long id() {
        return id;
    }

    public OauthId oauthId() {
        return oauthId;
    }

    public String nickname() {
        return nickname;
    }

    public String email() {
        return email;
    }

    public boolean isSign() {
        return isSign;
    }

    public void setSign(boolean sign) {
        this.isSign = sign;
    }

    public int userId() {
        return userId;
    }

    // Getter 및 Setter
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
