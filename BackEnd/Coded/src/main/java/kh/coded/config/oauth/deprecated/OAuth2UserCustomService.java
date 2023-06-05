//package kh.coded.config.oauth.deprecated;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import kh.coded.dto.MemberDTO;
//import kh.coded.repositories.MemberDAO;
//
//@Service
//public class OAuth2UserCustomService extends DefaultOAuth2UserService {
//	@Autowired
//	private MemberDAO memberDAO;
//	
////	@Override
////	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
////		OAuth2User user = super.loadUser(userRequest);
////		this.saveOrUpdate(user);
////		return user;
////	}
////	
////	//유저가 있으면 업데이트, 없으면 유저 생성
////	private MemberDTO saveOrUpdate(OAuth2User oAuth2User) {
////		Map<String, Object> attributes = oAuth2User.getAttributes();
////		int userNo = (int) attributes.get("userNo");
////		String userName = (String) attributes.get("userName");
////		String bio = (String) attributes.get("bio");
////		MemberDTO user = memberDAO.select
////				.;
////	}
//}
