package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.MoviesDTO;
import kh.coded.services.MoviesService;

@RestController
@RequestMapping("/test/")
public class TestController {
	
	@Autowired
	private MoviesService moviesService;
	
	@GetMapping
	public List<MoviesDTO> getList() {
		for(MoviesDTO dto : moviesService.selectAll()) {
			System.out.println(dto.getId() +" : "+ dto.getTitle() +" : "+ dto.getGenre());
		}
		return moviesService.selectAll();
	}
	
	@GetMapping("/{id}")
	public MoviesDTO selctByID(@PathVariable int id) {
		return moviesService.selectByID(id);
	}
	
	@PostMapping
	public int insert(@RequestBody MoviesDTO dto) {
		int result = moviesService.insert(dto);
		System.out.println(result);
		return result;
	}
}
