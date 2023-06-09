package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AddressCoordDAO {
	
	@Autowired
	private SqlSessionTemplate mybatis;
}
