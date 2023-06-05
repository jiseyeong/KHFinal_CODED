package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.RefreshTokenDTO;
import kh.coded.repositories.RefreshTokenDAO;

@Service
public class RefreshTokenService {
	@Autowired
	private RefreshTokenDAO refDAO;
	
	public RefreshTokenDTO findByRefreshToken(String refreshToken) {
		return refDAO.findByRefreshToken(refreshToken);
	}
	
	public int save(RefreshTokenDTO dto) {
		return refDAO.save(dto);
	}
	
	public RefreshTokenDTO findByUserNo(int userNo) {
		return refDAO.findByUserNo(userNo);
	}
}
