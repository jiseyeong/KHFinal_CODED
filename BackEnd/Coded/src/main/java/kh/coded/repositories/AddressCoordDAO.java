package kh.coded.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.AddressCoordDTO;

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
	
	public List<AddressCoordDTO> selectAll(){
		return mybatis.selectList("AddressCoord.selectAll");
	}
	
	public AddressCoordDTO selectByAddresses(String address1, String address2) {
		Map<String, String> data = new HashMap<>();
		data.put("address1", address1);
		data.put("address2", address2);
		return mybatis.selectOne("AddressCoord.selectByAddresses", data);
	}
}
