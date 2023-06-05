package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.RefreshTokenDTO;

@Repository
public class RefreshTokenDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public RefreshTokenDTO findByRefreshToken(String refreshToken) {
		return null;
	}
	
	public RefreshTokenDTO findByUserNo(int userNo) {
		return null;
	}
	
	public int save(RefreshTokenDTO dto) {
		return 0;
	}
	
}
