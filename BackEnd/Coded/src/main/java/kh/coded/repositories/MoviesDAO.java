package kh.coded.repositories;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kh.coded.dto.MoviesDTO;

@Repository
public class MoviesDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public List<MoviesDTO> selectAll(){
		return mybatis.selectList("Movies.selectAll");
	}
}
