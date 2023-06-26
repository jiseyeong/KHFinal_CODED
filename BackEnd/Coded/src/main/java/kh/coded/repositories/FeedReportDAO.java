package kh.coded.repositories;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FeedReportDAO {

	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void FeedReport() {
		mybatis.update("");
	}
}