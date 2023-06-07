package kh.coded;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CodedApplicationTests {

	@LocalServerPort
	private int port;
	@Autowired
	private TestRestTemplate restTemplate;
//	@Autowired
//	private MoviesDAO moviesDAO;
	
//	@DisplayName("저장 REST 테스트")
//	@Transactional
//	//@Rollback(true) //동작 안함
//	@Test
//	public void insertRestMovies() {
//		//given
//		String title = "테스트 영화 제목";
//		String genre = "Java";
//		MoviesDTO dto = new MoviesDTO(0, title, genre);
//		
//		String url = "http://localhost:"+port+"/test/";
//		
//		//when
//		ResponseEntity<Integer> response = restTemplate.postForEntity(url, dto, Integer.class);
////		ResponseEntity<List<MoviesDTO>> responseList = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MoviesDTO>> (){
////		});
////		List<MoviesDTO> list = responseList.getBody();
//		ResponseEntity<MoviesDTO> responseOne = restTemplate.getForEntity(url +"/"+ response.getBody(), MoviesDTO.class);
//		
//		//then
//		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//		assertThat(response.getBody()).isGreaterThan(0);
//		
//		assertThat(responseOne.getStatusCode()).isEqualTo(HttpStatus.OK);
//		assertThat(responseOne.getBody()).isNotNull();
//		
////		assertThat(list.get(response.getBody()).getTitle()).isEqualTo(title);
////		assertThat(list.get(response.getBody())).getGenre()).isEqualTo(genre);
//		
//		assertThat(responseOne.getBody().getTitle()).isEqualTo(title);
//		assertThat(responseOne.getBody().getGenre()).isEqualTo(genre);
//		
//	}
	
	//그냥 DAO 테스트는 rollback 먹힘. Controller 테스트로는 안 먹힘.
//	@DisplayName("저장 테스트")
//	@Transactional
//	@Rollback(true) //동작 안함
//	@Test
//	public void insertMoives() {
//		//given
//		String title = "테스트으 영화 제목";
//		String genre = "Java2";
//		MoviesDTO dto = new MoviesDTO(0, title, genre);
//		
//		//when
//		int id = moviesDAO.insert(dto);
//		MoviesDTO result = moviesDAO.selectByID(id);
//		
//		//then
//		assertThat(result.getTitle()).isEqualTo(title);
//		assertThat(result.getGenre()).isEqualTo(genre);
//	}
//	
//	@Test
//	void contextLoads() {
//	}

}
