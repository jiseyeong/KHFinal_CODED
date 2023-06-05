//package kh.coded.config.oauth.deprecated;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import kh.coded.config.JwtProvider;
//import kh.coded.dto.MemberDTO;
//import kh.coded.services.MemberService;
//import kh.coded.services.RefreshTokenService;
//
//@Service
//public class TokenService {
//	@Autowired
//	private JwtProvider tokenProvider;
//	@Autowired
//	private RefreshTokenService refershTokenService;
//	@Autowired
//	private MemberService memberService;
//	
//	public String createNewAccessToken(String refreshToken) throws Exception {
//		if(!tokenProvider.validateToken(refreshToken)) {
//			throw new IllegalArgumentException("Unexpected token");
//		}
//		
//		int memberNo = refershTokenService.findByRefreshToken(refreshToken).getUserNo();
//		MemberDTO member = memberService.selectByUserNo(memberNo);
//		return tokenProvider.createToken(member);
//	}
//}
