package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AddressCoordDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public List<String> selectDistinctAddress1(){
		return mybatis.selectList("AddressCoord.selectDistinctAddress1");
	}
	
	public List<String> selectScopedAddress2(String address1){
		return mybatis.selectList("AddressCoord.selectScopedAddress2", address1);
	}
}
