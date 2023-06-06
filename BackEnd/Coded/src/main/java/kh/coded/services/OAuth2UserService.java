package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import kh.coded.dto.MemberDTO;
import kh.coded.dto.MemberDTO.Role;
import kh.coded.dto.MemberPrincipal;
import kh.coded.repositories.MemberDAO;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService{
	@Autowired
	private MemberDAO memberDAO;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		//간편 로그인 버튼 클릭 -> 해당 간편 로그인 창 -> 로그인 완료 -> 코드 리턴 -> 엑세스 토큰 요청
		// userRequest 정보 -> loadUser 함수 호출 -> API로부터 회원 프로필을 얻어옴.
		
		OAuth2User oAuth2User = super.loadUser(userRequest);
		String provider = userRequest.getClientRegistration().getRegistrationId(); // google 등이 나옴
		String providerID = oAuth2User.getAttribute("sub");
		String userCode = provider+"_"+providerID;
		
		//String eamil = oAuth2User.getAttribute("email");
		Role role = Role.USER;
		
		MemberDTO user = null;
		
		if(provider == "google") {
			
		}
		
		return new MemberPrincipal(user, oAuth2User.getAttributes());
	}
	
}
