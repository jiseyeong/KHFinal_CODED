//package kh.coded.security.oauth;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import kh.coded.dto.MemberDTO;
//import kh.coded.dto.MemberPrincipal;
//import kh.coded.repositories.MemberDAO;
//
//@Service
//public class OAuth2UserService extends DefaultOAuth2UserService{
//	@Autowired
//	private MemberDAO memberDAO;
//	
//	public OAuth2UserService() {
//		super();
//	}
//
//	@Override
//	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//		//간편 로그인 버튼 클릭 -> 해당 간편 로그인 창 -> 로그인 완료 -> 코드 리턴 -> 엑세스 토큰 요청
//		// userRequest 정보 -> loadUser 함수 호출 -> API로부터 회원 프로필을 얻어옴.
//
//		final OAuth2User oAuth2User = super.loadUser(userRequest);
//		
//		//테스트 동안에만. 디버깅용. 배포하기 전에 삭제할 것.
//		try {
//			System.out.println("OAuth2User attributes : " + new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
//		}catch(Exception e) {
//			e.printStackTrace();
//		}
//		
//		//로그인 필드를 가져온다.
//		String provider = userRequest.getClientRegistration().getRegistrationId(); // google 등이 나옴
//		String providerID = oAuth2User.getAttribute("sub");
//		//String userCode = provider+"_"+providerID;
//		//OAuth 로긘 진행 시 키가 되는 필드 값.
//		String userNameAttribute = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//		
//		//String eamil = oAuth2User.getAttribute("email");
//		//Role role = Role.USER;
//		
//		System.out.println("콜백 불림2");
//		
//		MemberDTO user = null;
//		
//		if(provider == "google") {
//			
//		}else if(provider == "kakao") {
//			String userCode = oAuth2User.getAttribute("id");
//			System.out.println("kakao loaded: " + userCode);
//			user = memberDAO.selectMemberByKakaoToken(userCode);
//			if(SecurityContextHolder.getContext().getAuthentication() != null) {
//				if(user != null) {
//					System.out.println("이미 로그인하고 등록까지 마친 유저입니다.");
//				}else {
//					//등록 메커니즘
//					user = memberDAO.selectMemberById(SecurityContextHolder.getContext().getAuthentication().getName());
//					memberDAO.updateKakaoToken(user.getUserNo(), userCode);
//				}
//			}
//		}
//		
//		return new MemberPrincipal(user, oAuth2User.getAttributes());
//	}
//}
